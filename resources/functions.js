
    function primeGen(n) {
        for (let i = 2; i <= Math.sqrt(n); i++)
            if ((n%i) == 0) return false;
        return true;
    }

    function goldbachGen(n) {
        var arr = [];
        if (n == 4) arr.push([n/2,n/2])
        for (var a = 3; a <= n/2; a+=2) 
            if (primeGen(a) && primeGen(n-a))  
                arr.push([a, n-a]) 
        
        return arr;
    }

    function factorGen(n) {
        var arr = [];
        for (let i = 1; i <= n/2; i++) 
            if(n%i == 0) arr.push([i]);

        return arr;
    }

    function digitGen(n) {
        var sum = 0;
        for (; n > 0; Math.floor((n/=10))) 
            sum += Math.floor((n%10));
        return sum;
    }

    function gcdGen(n_arr) {
        var gcd = 1;
        for (let i = gcd+1; i <= Math.min.apply(null, n_arr); i++) 
            if (n_arr.every(x => x % i === 0))
                gcd = i;
        
        return gcd;
    }



module.exports = {
    primeGen,
    goldbachGen,
    factorGen,
    digitGen,
    gcdGen
}