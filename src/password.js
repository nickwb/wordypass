import _ from 'underscore';

import random from './random';
import sentence from './sentence';

let _patterns = ['UD', 'DU'],
    _groups = { D: '0123456789', U: 'ABCDEFGHJKMNPQRSTUVWXYZ' };


function getRandomSentence() {
    return sentence.getRandomSentence();
}

function generateRandomCharactersFromPattern(pattern) {
    return _.map(pattern.split(''), group => random.randomElement(_groups[group]));
}

let PasswordGenerator = {};

PasswordGenerator.generateRandomPassword = function () {
    let sentence = getRandomSentence();
    let chars = generateRandomCharactersFromPattern(random.randomElement(_patterns));
    return sentence.concat(chars.join(''));
}

PasswordGenerator.countCombinations = function () {

    let getPattern = p => _.chain(p)
        .map(c => _groups[c].length)
        .reduce((product, n) => product * n, 1)
        .value();

    let extraCharacters = _.chain(_patterns)
        .map(getPattern)
        .reduce((sum, n) => sum + n, 0)
        .value();

    return extraCharacters * sentence.countCombinations();
}

PasswordGenerator.init = function (words) {
    sentence.init(words);
}

export default PasswordGenerator;
