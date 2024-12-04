const express = require('express');
const DailyGeneral = require('../service/DailyGeneral');
const GameService = require('../service/GameService')
const DailyGame = require('../model/daily_game')

const router = express.Router();



router.post('/wordseg', async (req, res) => {
    const { text } = req.body  
    if (!text)
    {
        return res.status(422).json({
            detail: [{
                loc : ["body", "text "],
                msg : "Text is required",
                type : "value_error.missing"
            }]
        })
    }
   // let result  =  await GameService.isValidText(text);
    return res.json(null);
    
});

router.get('/daily', async (req, res) => {
    const { guess, size = 5 } = req.query;  // Default size to 5 if not provided

    if (!guess || guess.length != size) {
        return res.status(422).json({
            detail: [{
                loc: ["query", "guess"],
                msg: "Guess must match the size",
                type: "invalid_length"
            }]
        });
    }
    const today = new Date().toISOString().split('T')[0];

    let dailyWord = await DailyGame.findOne({
        where: {
            date: today,
        },
    });
    if (!dailyWord)
        dailyWord = await DailyGeneral.general();
    if (!dailyWord)
        return res.status(422).json({
            detail: [{
                loc: [],
                msg: "DailyGeneral error",
                type: "invalid logic"
            }]
        });
        let word_pad = JSON.parse(dailyWord.game_data)
        // i have  no ideal for this cause  daily send guess for which line or just plus  after one time and reset  or something
        let data = GameService.checkWord(guess, word_pad[0], word_pad);
        return res.json(data);
}
);


router.get('/random', async (req, res) => {
    let { guess, size = 5, seed } = req.query;
    try {
        size = Number(size);
        if (seed)
            seed = Number(seed);
        if (!guess || guess.length != size) {
            return res.status(422).json({
                detail: [{
                    loc: ["query", "guess"],
                    msg: "Guess must match the size",
                    type: "invalid_length"
                }]
            });
        }
        let word = await GameService.getWordFromSeed(seed, size);
        let data = GameService.checkWord(guess, word, []);
        return res.json(data);
    }
    catch (e) {
        return res.status(422).json({
            detail: [{
                loc: ["size", "seed"],
                msg: "error format number",
                type: "format_err"
            }]
        });
    }
});

router.get('/word/:word', (req, res) => {
    const { word } = req.params;
    const { guess } = req.query;
  
    if (!guess || guess.length !== word.length) {
      return res.status(422).json({
        detail: [{
          loc: ["query", "guess"],
          msg: `Guess must match the length of the word (${word.length})`,
          type: "invalid_length"
        }]
      });
    }
    let data = GameService.checkWord(guess, word ,  []);
    return res.json(data);
});

module.exports = router;
