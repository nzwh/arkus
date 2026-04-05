import type { Dirent } from 'fs';
import SuperClient from '../extensions/super-client.ts';
import type { Command } from '../extensions/types/command.types.ts';

import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';


//- @const: supported file extensions for commands
const SUPPORTED_EXTENSIONS = ['.js', '.ts'] as const;

//- @const: cache the directories to avoid repeated path operations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsDir = path.join(__dirname, '..', 'commands');


//- @func: process an individual command file
//  @param [dir: string] - the directory of the command file
//  @param [file: Dirent] - the directory entry for the command file
//  @param [client: SuperClient] - the bot client to register the command with
//  @returns: [Promise<void>] - resolves when done, handles errors internally
const ProcessFile = async (
    dir: string, file: Dirent, client: SuperClient
): Promise<void> => {

    const filePath = path.join(dir, file.name);
    const command_name = path.parse(file.name).name;

    if (client.commands.has(command_name))
        return console.info(`   [🚧] The command "${command_name}" has already been loaded.`);

    try {
        const commandModule = await import(pathToFileURL(filePath).href);
        const command = commandModule.default as Command;

        if (!command || typeof command !== 'object')
            return console.warn(`   [⚠️] Invalid command structure in "${command_name}"`);
        if (!command.include)
            return console.info(`   [🚧] The command "${command_name}" will not be loaded.`);
        client.commands.set(command_name, command);

        if (command.alias && Array.isArray(command.alias)) {
            for (const alias of command.alias) 
                (client.aliases.has(alias))
                    ? console.info(`   [🚧] The alias "${alias}" of "${command_name}" has already been loaded.`)
                    : client.aliases.set(alias, command_name);
        }
    } catch (error) {
        console.error(`   [❌] Failed to load command "${command_name}":`, error);
    }

    return Promise.resolve();
};

//- @func: recursively load command files from a directory
//  @param [dir: string] - the directory to process
//  @param [suffix: string] - the file extension to filter by
//  @param [client: SuperClient] - the bot client to register commands with
//  @returns: [Promise<void>] - resolves when done, handles errors internally
const ProcessFolders = async (
    dir: string, suffix: string, client: SuperClient
): Promise<void> => {

    let entries;
    try {
        entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (error) {
        return console.error(`   [❌] Failed to read directory ${dir}:`, error);
    }

    const directories = entries.filter(entry => entry.isDirectory());
    const files = entries.filter(entry => entry.isFile() && entry.name.endsWith(suffix));

    for (const directory of directories) {
        const name = directory.name.charAt(0).toUpperCase() + directory.name.slice(1);
        const subDir = path.join(dir, directory.name);
        
        try {
            const subDirEntries = await fs.readdir(subDir);
            const hasCommands = subDirEntries.some(f => 
                SUPPORTED_EXTENSIONS.some(ext => f.endsWith(ext))
            );

            if (!hasCommands) {
                console.info(` [📂] No commands in the ${name} folder to load.`);
            } else {
                console.info(` [📂] Loading files from the ${name} folder...`);
                client.categories.push(name);
                await ProcessFolders(subDir, suffix, client);
            }
        } catch (error) {
            console.error(`   [❌] Failed to process directory ${subDir}:`, error);
        }
    }

    const filePromises = files.map(file => ProcessFile(dir, file, client));
    await Promise.allSettled(filePromises);

    return Promise.resolve();
};

//- @func: main function to load all commands
//  @param [client: SuperClient] - the bot client to register commands with
//  @returns: [Promise<void>] - resolves when done, handles errors internally
export const LoadCommands = async (
    client: SuperClient
): Promise<void> => {

    console.info(` [🔄] Starting to load commands from: ${commandsDir}\n`);
    const startTime = performance.now();
    
    try {
        await ProcessFolders(commandsDir, '.ts', client);
        const endTime = performance.now();
        console.info(`\n [✅] Commands loaded successfully in ${Math.round(endTime - startTime)}ms`);
    } catch (error) {
        console.error('   [❌] Failed to load commands:', error);
        throw error;
    }
};