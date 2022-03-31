# Jwordle

This is a Japanese version of the popular word guessing game, based on the [React Wordle](https://github.com/cwackerfuss/react-wordle) clone project. Made using React, Typescript, and Tailwind.

[**Play the game!**](https://jwordle.vercel.app/)

## Build and run

### To Run Locally:

Clone the repository and perform the following command line actions:

```bash
$> cd jwordle
$> npm install
$> npm run start
```

### To build/run docker container:

#### Development

```bash
$> docker build -t game:dev .
$> docker run -d -p 3000:3000 game:dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

#### Production

```bash
$> docker build --target=prod -t game:prod .
$> docker run -d -p 80:80 game:prod
```

Open [http://localhost](http://localhost) in browser.

## Improvements over the original code base

### Practice mode

- Ability to practice during the day as many times as you want
- Can be started after solving the word of the day by pushing the Practice button in the Stats modal
- Share button replaced by Word of the Day button in order to return to the word of the day grid
- Can be interrupted at any time by clicking one of the buttons in the Stats modal
- Can also be restarted by clicking the refresh icon or Escape key after solving the current problem
- Practice words are randomly chosen from the list of target words, but never in the vicinity of the current day solution
- Practice stats only last a day and then are reset

### Different play modes

- Ability to switch between two different styles of Romanization (modified Hepburn with macrons on long vowels vs. Nihon-shiki with Word Processor style vowel doubling)
- Different keyboards with different number of keys (28 vs. 22)
- Different maximum number of guesses (7 versus 6) to reflect increased difficulty level of the former
- Ability to switch between two different word lengths (5 and 6 letters)
- Combined with Romanization styles this results in 4 different daily puzzles, each with their own statistics and word lists

### Translation and localization

- Ability to switch between Japanese and English in the Settings modal
- Solution word displayed in Stats modal along with renderings in kanji and kana
- Ability to view English translation(s) in WWWJDIC by clicking the link of any kanji or kana rendering

### Extra icons and keys

- Refresh icon added on top of main display to either clear the current guess or start a new practice round after solving the current puzzle
- Pushing the Escape key triggers the refresh action
- In Hepburn mode, typing a hyphen before a vowel produces the vowel with a macron on top

## Credits

**Code base:** [React Wordle](https://github.com/cwackerfuss/react-wordle)  
**Dictionary:** [WWWJDIC](http://nihongo.monash.edu/cgi-bin/wwwjdic) 
**Frequency list:** [Charles Kelly's Online Japanese Language Study Materials](http://www.manythings.org/japanese/)
**Romanization:** Built in-house, because not available in WWWJDIC