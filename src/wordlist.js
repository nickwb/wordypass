import Promise from 'promise';

let $ = window.jQuery;

function getWords(doc, element) {
    var text = $(element, doc).text();
    var words = $.trim(text.replace(/\s+/g, ' ')).split(' ');
    return words;
}

let listCache = null;

function getWordList() {
    return new Promise((resolve, reject) => {
        
        if(listCache) {
            resolve(listCache);
            return;
        }

        $.ajax({
          dataType: 'xml',
          url: './words.xml',
          type: 'GET',
          success: (data, status) => {
              listCache = {
                nouns: getWords(data, 'nouns'),
                verbs: getWords(data, 'verbs'),
                adjectives: getWords(data, 'adjectives'),
                adverbs: getWords(data, 'adverbs'),
              };
              resolve(listCache);
          },
          error: (xhr, status, error) => reject({ status: status, error: error })
        });

    });
}

export default {
    getWordList: getWordList
};
