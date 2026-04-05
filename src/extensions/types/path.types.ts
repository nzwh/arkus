//- @func: extracts file name and category from a module URL
//  @param: [metaUrl: string] - the URL of the module
//  @returns: [name: string, category: string] - the extracted file name and category
export const GetFileInfo = (
    metaUrl: string
) => {

    const url = new URL(metaUrl);
    const pathParts = url.pathname.split(/[\\/]/);

    const name = pathParts[pathParts.length - 1]?.split('.')[0];
    const category = pathParts[pathParts.length - 2] ?? 'general';

    return { name, category };
}