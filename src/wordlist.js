import Promise from 'promise';

let $ = window.jQuery;
let _listCache = null;

function getWords(doc, element) {
    var text = $(element, doc).text();
    var words = $.trim(text.replace(/\s+/g, ' ')).split(' ');
    return words;
}

let WordList = {};

WordList.getWordList = function () {
    return new Promise((resolve, reject) => {

        if(_listCache) {
            resolve(_listCache);
            return;
        }

        $.ajax({
          dataType: 'xml',
          url: './words.xml',
          type: 'GET',
          success: (data, status) => {
              _listCache = {
                nouns: getWords(data, 'nouns'),
                verbs: getWords(data, 'verbs'),
                adjectives: getWords(data, 'adjectives'),
                adverbs: getWords(data, 'adverbs'),
              };
              resolve(_listCache);
          },
          error: (xhr, status, error) => reject({ status: status, error: error })
        });

    });
}

export default WordList;
