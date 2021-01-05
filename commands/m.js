 
    module.exports.run = async (client, message, args) => {

        var n = args[1];
        if(isNaN(n) || n > 1000) {
            message.channel.send("Invalid input.");
            return;
        }

        function primeGen(n) {
            for (let i = 2; i <= n/2; i++)
               if ((n%i) == 0) return false;
            return true;
        }

        function goldbachGen(n) {
            var arr = [];
            for (var a = 2; a <= n/2; a++) {
                if (primeGen(a) && primeGen(n-a)) 
                        arr.push([a, n-a]) 
            }
            return arr;
        }

        function p_factorGen(n) {
            var num = n;
            var p_arr = [];
            for (let k = 2; k <= Math.sqrt(n); k++) {
                if(primeGen(k)) {
                    for (; (num%k) == 0; num/=k)  
                        p_arr.push([k]);
                }
            }
            return p_arr;
        }

        function digitGen(n) {
            var sum = 0, dm = n;
            for (; dm > 0; Math.floor((dm/=10))) 
                sum += Math.floor((dm%10));
            return sum;
        }

        function smithGen(n) {
            var pf = p_factorGen(n), dg = digitGen(n), sum = 0;
            pf.forEach(element => {
                sum += parseInt(element);
            });
            if (sum == dg) return true;
        }

        function gcdGen(n, m) {
            var m = args[2];
            if(isNaN(m) || m > 1000) {
                message.channel.send("Invalid input.");
                return;
            } 

            var x = Math.max(n, m), y = Math.min(n, m);
            for (;(x%y)>0;) {
                var holder = y;
                y = x%y;
                x = holder;
            }
            return y;
        }



        switch(args[0]) {
            case "pr":
            case "prime":
                if (primeGen(n)) message.channel.send(`> The number ${n} is a prime.`)
                else message.channel.send(`> The number ${n} is not a prime.`)
            break;

            case "gb":
            case "goldbach":
                var arr = goldbachGen(n), _msg = "";
                for (let e = 0; e < arr.length; e++) 
                    _msg += (`> Goldbach Conjecture of ${n}: ${arr[e][0]} & ${arr[e][1]}`) + "\n"
                if (n>5 && n%2==0) message.channel.send(`\`\`\`q\n${_msg}\`\`\``);
                else message.channel.send("> Invalid input.");
            break;

            case "pf":
            case "primefactors":
                if (n <= 3) break;
                var arr = p_factorGen(n), _msg = "";
                for (let f = 0; f < arr.length; f++) 
                    _msg += (`> Prime Factor of ${n}: ${arr[f]}`) + "\n"
                message.channel.send(`\`\`\`q\n${_msg}\`\`\``)
            break;

            case "sd":
            case "sumofdigits":
                message.channel.send(`> The sum of the digits of **${n}** is **${digitGen(n)}**.`);
            break;

            case "sm":
            case "smith":
                if(smithGen(n)) message.channel.send(`> The number **${n}** is a Smith Number.`)
                else message.channel.send(`> The number **${n}** is not a Smith Number.`)
            break;

            case "gcd":
                if (isNaN(n) || isNaN(m)) message.channel.send("> Invalid input.");
                else message.channel.send(`> The GCD of **${n}** and **${m}** is **${gcdGen(n, m)}**.`)
            break;

            case "cp":
            case "coprime":
                if (gcdGen(n,m) == 1) message.channel.send(`> The numbers **${n}** and **${m}** are coprime.`)
                else message.channel.send(`> The numbers **${n}** and **${m}** are not coprime.`)
            break;

            case "avg":
                var _msg = message.content.substring(args[0].length+args[1].length+2).split(" "), sum = 0;
                _msg.forEach(element => { sum+=parseFloat(element); });
                message.channel.send(`> The mean is **${(sum/=_msg.length).toFixed(2)}**.`);
            break;

            case "median":
                var _msg = message.content.substring(args[0].length+args[1].length+2).split(" ");
                for (let med_i = 0; med_i < _msg.length; med_i++) 
                    _msg[med_i] = parseFloat(_msg[med_i]);
                _msg.sort();
                message.channel.send(`The median is **${_msg[_msg.length/2]}**.`);
                message.channel.send(_msg);
        }
    }

    module.exports.help = {
        name: "m"
    }