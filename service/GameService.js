const Word = require('../model/word'); 
const crypto = require('crypto');
const wordnet = require('wordnet');

const checkWord = (guess, word, wordpad) => {
    let result = [];
    for (let index = 0; index < word.length; index++) {
        let object_Data = {
            "slot": index,
            "guess": guess[index],
        }
        if (word[index] == guess[index]) {
            object_Data.result = "correct"
        }
        else {
            object_Data.result = 'obsent'
            for (let index_wordpad = 0; index_wordpad < wordpad.length; index_wordpad++) {
                if (index_wordpad != index) {
                    data = checkCharacterOneLine(guess[index], wordpad[index_wordpad])
                    if (data.result == 'present') {
                        object_Data.result = 'obsent'
                        break;
                    }
                }

            }
        }
        result.push(object_Data)
    }
    return result;
};
const checkCharacterOneLine = (char , word  ) => {

    for (let index = 0; index < word.length; index++)
        {
            if (word[index] == char)
                   return {slot : index  , result  : 'present'};
        }
    return { result  : 'obsent'};
};
const getWordFromSeed =  async (seed, size) => {
    
    const words = await Word.findAll({
        where: {
            length: size, 
        }
    });
    if (words.length == 0) {
        throw new Error('No words available for the specified size');
    }
    if (seed) {
        const hash = crypto.createHash('sha256').update(seed.toString()).digest('hex');
        randomIndex = parseInt(hash, 16) % words.length;
    } else {
        randomIndex = Math.floor(Math.random() * words.length);
    }
    return words[randomIndex];
}

const isValidText = async (text) => {

    const words = text.trim().split(' ');  // Split the text into words
    const results = [];
    
    for (let word of words) {
      const result = await checkWordValid(word);
      results.push(result);
    }
    return results;  
}

const checkWordValid = async (word) => {
    try {
        await wordnet.init();
        const definitions = await new Promise((resolve, reject) => {
          wordnet.lookup(word, (err, defs) => {
            if (err) reject(err);
            resolve(defs);
          });
        });

        if (definitions && definitions.length > 0) {
          return { word: word, valid: true };
        } else {
          return { word: word, valid: false };
        }
      } catch (err) {
        console.error("Error checking word validity:", err);
        return { word: word, valid: false };
      }
  }

module.exports = {checkWord, checkCharacterOneLine , getWordFromSeed , isValidText}