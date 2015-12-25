(function($,window,document,undefined){

    var wordMap = {};

    var pluraliseVerb = function(word) {
        if(word.match(/[^aeiou]y$/)) {
            return word.substr(0, word.length - 1) + 'ies';
        }

        return word + (word.match(/[sh]$/) ? 'es' : 's');
    };

    var setRule = {
        'V': pluraliseVerb
    };

    var wordPatterns = ['J N V N', 'N V J N', 'N A V N'],
    charPatterns = ['DU', 'UD'],
    safeDigits = '23456789',
    safeAlpha = 'ABCDEFGHJKMNPQRSTUVWXYZ';

    function randomInt(min, maxExclusive) {
        if(maxExclusive <= min) { throw 'Max must be greater than min.'; }
        var range = maxExclusive - min;

        if(window.crypto && Uint32Array) {
            var value = new Uint32Array(1);
            window.crypto.getRandomValues(value);
            return (Number(value[0]) % range) + min;
        }

        return Math.floor(Math.random() * range) + min;
    }

    var randomFromArray = function(a) {
        return a[randomInt(0, a.length)];
    };

    var randomFromString = function(s) {
        return s.charAt(randomInt(0, s.length));
    };

    var getWordLists = function() {

      var promise = $.Deferred();

      function onSuccess(data, status) {

        function getWords(element, key) {
          var text = $(element, data).text();
          wordMap[key] = $.trim(text.replace(/\s+/g, ' ')).split(' ');
          console.log(element + ': ' + wordMap[key].length);
        }

        getWords('nouns', 'N');
        getWords('verbs', 'V');
        getWords('adjectives', 'J');
        getWords('adverbs', 'A');
        promise.resolve();
      }

      function onFailure(xhr, status, error) {
        console.log('Something went wrong.');
        promise.reject();
      }

      $.ajax({
        dataType: 'xml',
        url: './words.xml',
        type: 'GET'
      }).then(onSuccess, onFailure);

      return promise;
    };

    function generateWords(pattern) {
        var password = '';
        $.each($.trim(pattern).split(' '), function(i, m) {
            var x = Math.floor((Math.random() * wordMap[m].length) + 1);
            var w = wordMap[m][x];

            if(setRule[m] !== undefined) {
                w = setRule[m](w);
            }

            password += w + ' ';
        });

        return $.trim(password);
    }

    var generateChars = function(pattern) {
        var password = '';
        $.each($.trim(pattern).split(''), function(i, t) {
            if(t === 'D') {
                password += randomFromString(safeDigits);
            } else if (t === 'U') {
                password += randomFromString(safeAlpha);
            }
        });

        return password;
    };

    var cycleLastPassword = function() {
        var maxShown = 5,
            lastPassword = $('#lastPassword').html();

        if($.trim(lastPassword).length !== 0) {
            var prev = $('<p>').html(lastPassword);
            $('#previousPasswords').prepend(prev);

            var allPrev = $('#previousPasswords p');
            if(allPrev.length > maxShown) {
                allPrev.slice(-1 * (allPrev.length - maxShown)).remove();
            }
        }
    };

    var generatePassword = function() {
        cycleLastPassword();

        var password = generateWords(randomFromArray(wordPatterns));
        password += '&nbsp;&nbsp;' + generateChars(randomFromArray(charPatterns));

        $('#lastPassword').html(password);
    };

    var calculateCount = function() {
        // Word Combinations
        var n = 0;
        $.each(wordPatterns, function(i, p) {
            var x = 1;
            $.each($.trim(p).split(' '), function(i, set) {
                x *= wordMap[set].length;
            });

            n += x;
        });

        // Digit combinations
        n *= safeDigits.length * safeAlpha.length;

        if(console.log) {
            console.log('Total Combos: ' + n);

            var entropy = 1.0 / n;
            entropy = -n * (entropy * (Math.log(entropy) / Math.log(2)));
            entropy = Math.round((entropy) * 100.0) / 100.0;

            console.log('Entropy: ' + entropy + ' bits');

            var rate = function(r) {
                //                                                           mins hrs  days   yrs    50%
                console.log('Average Guess Time @ ' + r + '/s: ' + (n / (r * 60 * 60 * 24 * 365.25 * 2)).toFixed(2) + ' yrs');
            };

            for(var i = 1; i <= 1000000; i *= 10) {
                rate(i);
            }
        }
    };

    $(document).ready(function() {
        // Create each of the lists
        getWordLists().then(function() {
          // Map the keys to generate a password
          $(document).on('keydown', function(e) {
              if(e.which === 40 || e.which === 13 || e.which === 32) {
                  generatePassword();
              }
          });

          // Generate the first password
          generatePassword();

          // Calculate the number of different combinations
          calculateCount();
        });
    });

})(jQuery,this,this.document);
