import _ from 'underscore';

import random from './random';

function pluraliseVerb(word) {
    if(word.match(/[^aeiou]y$/)) {
        return word.substr(0, word.length - 1) + 'ies';
    }

    return word + (word.match(/[^g][shz]$/) ? 'es' : 's');
}

class Sentence {

    static randomWord(group) {
        return random.randomElement(Sentence.wordMap[group]);
    }

    static transform(word, group) {
        if(Sentence.transformers[group]) {
            return Sentence.transformers[group](word);
        }

        return word;
    }

    static getRandomSentenceFromPattern(pattern) {
        return _.map(pattern.split(''), group => Sentence.transform(Sentence.randomWord(group), group));
    }

    static getRandomSentence() {
        return Sentence.getRandomSentenceFromPattern(random.randomElement(Sentence.patterns));
    }

    static countCombinations() {

        let getPattern = p => _.chain(p)
            .map(c => Sentence.wordMap[c].length)
            .reduce((product, n) => product * n, 1)
            .value();

        let sentence = _.chain(Sentence.patterns)
            .map(getPattern)
            .reduce((sum, n) => sum + n, 0)
            .value();

        return sentence;
    }

    static init(words) {
        if(Sentence.wordMap) { return; }

        Sentence.wordMap = {
            N: words.nouns,
            V: words.verbs,
            J: words.adjectives,
            A: words.adverbs
        };
    }
};

Sentence.patterns = ['JNVN', 'NVJN', 'NAVN'];

Sentence.transformers = {
    V: pluraliseVerb
};

export default Sentence;