import _ from 'underscore';

import random from './random';
import sentence from './sentence';

function getRandomSentence() {
    return sentence.getRandomSentence();
}

function getRandomDigit() {
    return random.randomElement('0123456789');
}

function getRandomUppercase() {
    return random.randomElement('ABCDEFGHJKMNPQRSTUVWXYZ');
}

class PasswordGenerator {

    static generateRandomCharactersFromPattern(pattern) {
        return _.map(pattern.split(''), group => PasswordGenerator.resolvers[group]());
    }

    static generateRandomPassword() {
        let sentence = getRandomSentence();
        let chars = PasswordGenerator.generateRandomCharactersFromPattern(random.randomElement(PasswordGenerator.patterns));
        return sentence.concat(chars.join(''));
    }

    static init(words) {
        sentence.init(words);
    }
}

PasswordGenerator.patterns = ['UD', 'DU'];

PasswordGenerator.resolvers = {
    D: getRandomDigit,
    U: getRandomUppercase
};

export default PasswordGenerator;
