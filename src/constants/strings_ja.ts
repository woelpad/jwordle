export const ALERTS_JA = {
  wins: ['素晴らしい！', 'お見事！', 'さすがです'],
  losses: ['残念', '運がなかった', '惜しい！'],
  gameCopied: '結果をクリップボードにコピーしました',
  notEnoughLetters: '文字が足りません',
  wordNotFound: '単語が見つかりません',
  newDay: '日にちとお題が変わりました！',
  hardMode: 'ハードモードは始める前にしか変えられません！',
  wrongSpot: (letter: string, position: number) =>
    `${position}番目の文字が「${letter}」でないといけません`,
  notContained: (letter: string) =>
    `「${letter}」の文字を入れないといけません`
}

export const KEYS_JA = {
  enter: 'Enter',
  delete: 'Delete',
}
   
export const INFO_MODAL_JA = {
  title: '遊び方',
  playMethod: 
    'お題を限らた回数で当てはめるゲームです。入力後に' +
    '各文字タイルの色が以下のように変わります。',
  correctSpot: (letter: string) => 
    `「${letter}」の文字が正しいところに当てはまりました。`,
  differentSpot: (letter: string) =>
    `「${letter}」の文字が間違ったところに当てはまりました。`,
  noSpot: (letter: string) =>
    `「${letter}」の文字がお題に入っていません。`,
  options:
    'ローマ字の式、および単語の文字数は、設定画面で変えられますので、' +
    '毎日４つの新しいお題が待っています。',
  credits: [
    '本作品は、オーペンソースプロジェクト ',
    ' を元に作られました。単語集は、辞書サイト ',
    ' から抽出されました。'
  ],
}

export const SETTINGS_MODAL_JA = {
  title: '設定',
  wordProcessorModeName: 'ワープロモード',
  wordProcessorModeDescription: 'ヘボン式の代わりに日本式が使用',
  wordLengthName: '文字数の変更',
  hardModeName: 'ハードモード',
  hardModeDescription: '露出したヒントを次の察しに使うことが必須',
  darkModeName: 'ダークモード',
  highContrastModeName: 'ハイコントラストモード',
  highContrastModeDescription: '色対象の向上',
  englishModeName: '言語を英語に変更',
  englishModeDescription: 'Switch to English',
}

export const STATS_MODAL_JA = {
  title: '統計',
  practiceTitle: '練習統計',
  guessDistribution: '察し数配布',
  correctWord: (solution: string) =>
    `「${solution}」が解答でした。`,
  newWord: '次のお題まで',
  wordOfDay: '今日のお題',
  share: '共有',
  practice: '練習',
  totalGames: 'プレイ数',
  successRate: '成功率',
  currentStreak: '現在の連続勝利',
  bestStreak: '最大の連続勝利',
}