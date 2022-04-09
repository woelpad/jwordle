import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { lexicon } from '../../lib/lexicon'
import { localeAwareUpperCase } from '../../lib/words'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  onEscape: () => void
  guesses: string[]
  isRevealing?: boolean
  isHighContrast: boolean
  isWordProcessor: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  onEscape,
  guesses,
  isRevealing,
  isHighContrast,
  isWordProcessor,
}: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else if (value === 'ESCAPE') {
      onEscape()
    } else {
      onChar(value)
    }
  }

  const topRow: Array<string> = isWordProcessor ? 
    ['G', 'Z', 'D', 'V', 'B', 'P', 'F', 'W'] :
    ['G', 'Z', 'D', 'B', 'V', '\u0100', '\u012a', '\u016a', '\u0112', '\u014c']
  const midRow: Array<string> = isWordProcessor ?
    ['K', 'S', 'T', 'N', 'H', 'M', 'Y', 'R'] :
    ['K', 'S', 'T', 'H', 'F', 'A', 'I', 'U', 'E', 'O']
  const bottomRow: Array<string> = isWordProcessor ?
    ['A', 'I', 'U', 'E', 'O', '\uff0d'] :
    ['J', 'C', 'P', 'W', 'R', 'Y', 'M', 'N']
  const unusedChars = isWordProcessor ? 'CJLQX' : 'LQX'
  const hyphenatedVowels: { [char: string]: string; } = {
    'A': '\u0100',
    'I': '\u012a',
    'U': '\u016a',
    'E': '\u0112',
    'O': '\u014c',
  }
  let isHyphenated: boolean = false

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
        isHyphenated = false
      } else if (e.code === 'Backspace') {
        onDelete()
        isHyphenated = false
      } else if (e.code === 'Escape') {
        onEscape()
        isHyphenated = false
      } else if (e.key === '-') {
        if (isWordProcessor) {
          onChar('\uff0d')
        } else {
          isHyphenated = true
        }
      } else {
        let key = localeAwareUpperCase(e.key)
        // TODO: check this test if the range works with non-english letters
        if (key.length === 1 && key >= 'A' && key <= 'Z' && unusedChars.indexOf(key) === -1) {
          if (isHyphenated && (key in hyphenatedVowels)) {
            key = hyphenatedVowels[key]
          }
          onChar(key)
          isHyphenated = false
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {topRow.map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            isHighContrast={isHighContrast}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {midRow.map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            isHighContrast={isHighContrast}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          {lexicon.keys.enter}
        </Key>
        {bottomRow.map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            isHighContrast={isHighContrast}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          {lexicon.keys.delete}
        </Key>
      </div>
    </div>
  )
}
