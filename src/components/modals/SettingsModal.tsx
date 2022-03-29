import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'
import { lexicon } from '../../lib/lexicon'
import { DEFAULT_WORD_LENGTH } from '../../constants/settings'
import { getWordLengths } from '../../lib/words'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isWordProcessorMode: boolean
  handleWordProcessorMode: Function
  maxWordLength: number
  handleMaxWordLength: Function
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  isEnglishMode: boolean
  handleEnglishMode: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isWordProcessorMode,
  handleWordProcessorMode,
  maxWordLength,
  handleMaxWordLength,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  isEnglishMode,
  handleEnglishMode,
}: Props) => {
  const modal = lexicon.settingsModal
  return (
    <BaseModal title={modal.title} isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col mt-2 divide-y">
        <SettingsToggle
          settingName={modal.wordProcessorModeName}
          flag={isWordProcessorMode}
          handleFlag={handleWordProcessorMode}
          description={modal.wordProcessorModeDescription}
        />
        <SettingsToggle
          settingName={modal.wordLengthName}
          flag={maxWordLength !== DEFAULT_WORD_LENGTH}
          handleFlag={(flag) => {
            let wordLength = DEFAULT_WORD_LENGTH
            if (flag) {
              getWordLengths().forEach(length => {
                if (length != DEFAULT_WORD_LENGTH) {
                  wordLength = length
                }
              })
            }
            handleMaxWordLength(wordLength)
          }}
        />
        <SettingsToggle
          settingName={modal.hardModeName}
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={modal.hardModeDescription}
        />
        <SettingsToggle
          settingName={modal.darkModeName}
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName={modal.highContrastModeName}
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={modal.highContrastModeDescription}
        />
        <SettingsToggle
          settingName={modal.englishModeName}
          flag={isEnglishMode}
          handleFlag={handleEnglishMode}
          description={modal.englishModeDescription}
        />
      </div>
    </BaseModal>
  )
}
