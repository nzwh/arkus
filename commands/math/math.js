 
    module.exports.run = async (client, message, args) => {
  
        var n_arr = [], s_arr = [], ttl = 0;
        var operators = "+-*/%";

        args.forEach(value => {
            if(!isNaN(value)) 
                n_arr.push(value);
            else if(operators.includes(value)) 
                s_arr.push(value);
        });

        ttl = parseFloat(n_arr[0]);
        for (let n = 1; n < n_arr.length+1; n++) {
            if(s_arr[0] == "+") ttl += parseFloat(n_arr[n]);
            if(s_arr[0] == "-") ttl -= parseFloat(n_arr[n]);
            if(s_arr[0] == "*") ttl *= parseFloat(n_arr[n]);
            if(s_arr[0] == "/") ttl /= parseFloat(n_arr[n]);
            if(s_arr[0] == "%") ttl %= parseFloat(n_arr[n]);
            s_arr.shift();
        }

        message.channel.send(`> The answer is ${ttl}.`);
    }

    module.exports.help = {
        name: "math",
        aliases: ['m', 'calc'],
        description: "Does a math operation. Note: Limited."
    }