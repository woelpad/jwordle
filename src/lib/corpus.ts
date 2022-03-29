import { TARGET_WORDS_HB5 } from '../constants/target_words_hb5'
import { VALID_GUESSES_HB5 } from '../constants/valid_guesses_hb5'
import { TARGET_WORDS_WP5 } from '../constants/target_words_wp5'
import { VALID_GUESSES_WP5 } from '../constants/valid_guesses_wp5'
import { TARGET_WORDS_HB6 } from '../constants/target_words_hb6'
import { VALID_GUESSES_HB6 } from '../constants/valid_guesses_hb6'
import { TARGET_WORDS_WP6 } from '../constants/target_words_wp6'
import { VALID_GUESSES_WP6 } from '../constants/valid_guesses_wp6'

type WritingStyle = 'HB' | 'WP'

type Corpus = {
    validGuesses: Array<string>
    thesaurus: Array<Array<string | Array<Array<string>>>>
    targetWords: Array<string>
    wordLength: number
    maxChallenges: number
    style: WritingStyle
}

const HB5 = <Corpus>({
    validGuesses: VALID_GUESSES_HB5,
    thesaurus: TARGET_WORDS_HB5,
    targetWords: TARGET_WORDS_HB5.map(x => x[0]),
    wordLength: 5,
    maxChallenges: 7,
    style: 'HB',
})

const WP5 = <Corpus>({
    validGuesses: VALID_GUESSES_WP5,
    thesaurus: TARGET_WORDS_WP5,
    targetWords: TARGET_WORDS_WP5.map(x => x[0]),
    wordLength: 5,
    maxChallenges: 6,
    style: 'WP',
})

const HB6 = <Corpus>({
    validGuesses: VALID_GUESSES_HB6,
    thesaurus: TARGET_WORDS_HB6,
    targetWords: TARGET_WORDS_HB6.map(x => x[0]),
    wordLength: 6,
    maxChallenges: 7,
    style: 'HB',
})

const WP6 = <Corpus>({
    validGuesses: VALID_GUESSES_WP6,
    thesaurus: TARGET_WORDS_WP6,
    targetWords: TARGET_WORDS_WP6.map(x => x[0]),
    wordLength: 6,
    maxChallenges: 6,
    style: 'WP',
})

export const hepburnCollection: { [len: number]: Corpus; } = {
    5: HB5,
    6: HB6,
}

export const wordProcessorCollection: { [len: number]: Corpus; } = {
    5: WP5,
    6: WP6,
}