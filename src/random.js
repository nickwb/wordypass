let Random = {};

let crypto = window.crypto,
    Uint32Array = window.Uint32Array,
    _isCryptoApi = !!(crypto && crypto.getRandomValues && Uint32Array);


Random.randomInt = function (min, maxExclusive) {
    if(maxExclusive <= min) { throw 'Max must be greater than min.'; }
    let range = maxExclusive - min;

    if(_isCryptoApi) {
        let value = new Uint32Array(1);
        crypto.getRandomValues(value);
        return (Number(value[0]) % range) + min;
    }

    return Math.floor(Math.random() * range) + min;
}

Random.randomElement = function (array) {
    return array[Random.randomInt(0, array.length)];
}

Random.isCryptoApi = function () {
    return _isCryptoApi;
}

export default Random;
