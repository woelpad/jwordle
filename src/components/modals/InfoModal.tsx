import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { lexicon } from '../../lib/lexicon'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const modal = lexicon.infoModal
  return (
    <BaseModal title={modal.title} isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {modal.playMethod}
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="A"
          status="correct"
        />
        <Cell value="N" />
        <Cell value="I" />
        <Cell value="M" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {modal.correctSpot('A')}
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="M" />
        <Cell value="A" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="N"
          status="present"
        />
        <Cell value="G" />
        <Cell value="A" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {modal.differentSpot('N')}
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="V" />
        <Cell value="I" />
        <Cell value="D" />
        <Cell value="E" />
        <Cell isRevealing={true} isCompleted={true} value="O" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {modal.noSpot('O')}
      </p>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
        {modal.options}
      </p>

      <p className="mt-4 italic text-sm text-gray-500 dark:text-gray-300">
        {modal.credits[0]}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          react-wordle
        </a>
        {modal.credits[1]}
        <a
          href="http://nihongo.monash.edu/cgi-bin/wwwjdic"
          className="underline font-bold"
        >
          WWWJDIC
        </a>
        {modal.credits[2]}
      </p>
    </BaseModal>
  )
}
