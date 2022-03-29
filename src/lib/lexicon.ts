import {
  ALERTS_EN,
  KEYS_EN,
  INFO_MODAL_EN,
  SETTINGS_MODAL_EN,
  STATS_MODAL_EN,
} from '../constants/strings_en' 
import {
  ALERTS_JA,
  KEYS_JA,
  INFO_MODAL_JA,
  SETTINGS_MODAL_JA,
  STATS_MODAL_JA,
} from '../constants/strings_ja' 

const englishLexicon = {
  alerts: ALERTS_EN,
  keys: KEYS_EN,
  infoModal: INFO_MODAL_EN,
  settingsModal: SETTINGS_MODAL_EN,
  statsModal: STATS_MODAL_EN,
}

const japaneseLexicon = {
  alerts: ALERTS_JA,
  keys: KEYS_JA,
  infoModal: INFO_MODAL_JA,
  settingsModal: SETTINGS_MODAL_JA,
  statsModal: STATS_MODAL_JA,
}

export let lexicon = englishLexicon

export const selectLexicon = (isInEnglish: boolean) => {
    lexicon = isInEnglish ? englishLexicon : japaneseLexicon
}