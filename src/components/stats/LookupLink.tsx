import { LOOKUP_LINK } from '../../constants/settings'

type Props = {
    reading: string
    front: string
}

export const LookupLink = ({ reading, front }: Props) => {
    return (
        <span>
            {front}
            <a
                href={LOOKUP_LINK + reading}
            >{reading}</a>
        </span>
    )
}