export default class Random {

    static randomInt(min, maxExclusive) {
        if(maxExclusive <= min) { throw 'Max must be greater than min.'; }
        var range = maxExclusive - min;

        if(crypto && Uint32Array) {
            var value = new Uint32Array(1);
            crypto.getRandomValues(value);
            return (Number(value[0]) % range) + min;
        }

        return Math.floor(Math.random() * range) + min;
    }

    static randomElement(array) {
        return array[Random.randomInt(0, array.length)];
    }
};
