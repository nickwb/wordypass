let Entropy = { };

Entropy.calculate = function (count) {
    let result = {
        totalCombinations: count
    };

    let e = 1.0 / count;
    e = -count * (e * (Math.log(e) / Math.log(2)));
    e = Math.round((e) * 100.0) / 100.0;

    result.entropyBits = e;
    result.guessRates = [];

    for(var i = 1; i <= 10000000; i *= 10) {
        let item = {
            guessesPerSecond: i,
            //                                 mins hrs  days yrs      50%
            averageGuessTimeYrs: (count / (i * 60 * 60 * 24 * 365.25 * 2))
        };

        result.guessRates.push(item);
    }

    return result;
}

export default Entropy;
