import _ from 'underscore';

import random from './random';
import sentence from './sentence';

function getRandomSentence() {
    return sentence.getRandomSentence();
}

class PasswordGenerator {

    static generateRandomCharactersFromPattern(pattern) {
        return _.map(pattern.split(''), group => random.randomElement(PasswordGenerator.groups[group]));
    }

    static generateRandomPassword() {
        let sentence = getRandomSentence();
        let chars = PasswordGenerator.generateRandomCharactersFromPattern(random.randomElement(PasswordGenerator.patterns));
        return sentence.concat(chars.join(''));
    }

    static countCombinations() {

        let getPattern = p => _.chain(p)
            .map(c => PasswordGenerator.groups[c].length)
            .reduce((product, n) => product * n, 1)
            .value();

        let extraCharacters = _.chain(PasswordGenerator.patterns)
            .map(getPattern)
            .reduce((sum, n) => sum + n, 0)
            .value();

        return extraCharacters * sentence.countCombinations();
    }

    static init(words) {
        sentence.init(words);
    }
}

PasswordGenerator.patterns = ['UD', 'DU'];

PasswordGenerator.groups = {
    D: '0123456789',
    U: 'ABCDEFGHJKMNPQRSTUVWXYZ'
};

export default PasswordGenerator;
