const Word = require('../model/word'); 
const DailyWord = require('../model/daily_game'); 
const wordPad_Size = 5;
const daily_wordPad_length = 5;


 const general  =  async () => {
    try {
        const list_word = await Word.find({ length: daily_wordPad_length }); 
        const wordCount  = list_word.length
        let Word_Data = []
        let Douplice = {}
        for (let i = 0; i < wordPad_Size; i++) {
            let randomIndex = Math.floor(Math.random() * wordCount); 
            let count = 0;
            while(Douplice[randomIndex])
            {
                randomIndex = Math.floor(Math.random() * wordCount); 
                count++;
                if (count > 30)
                {
                    throw Error("do not enough data")
                }
            }
            const randomWord = list_word[randomIndex]
            Word_Data.push(randomWord);
        }
       let newDaily = await DailyWord.create({
            game_data : JSON.stringify(Word_Data),
            createdAt: new Date(),
        })

        return newDaily;
    } catch (error) {
        console.error('Error ', error);
        return null;
        
    }
};


module.exports = {general};