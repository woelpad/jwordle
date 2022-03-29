import { LookupLink } from '../stats/LookupLink'

type Props = {
    readings: Array<Array<string>>
}

export const Lookup = ({ readings }: Props) => {
    return (
        <div>
            {
              readings[0].map((reading, i) => (
                <LookupLink
                  key={reading}
                  reading={reading}
                  front={i === 0 ? '' : '; '}
                />
              ))
            }
            {(readings.length > 1) && (
              <span>
                {' ['}
                {
                  readings[1].map((reading, i) => (
                    <LookupLink
                      key={reading}
                      reading={reading}
                      front={i === 0 ? '' : '; '}
                    />
                  ))
                }
                {']'}
              </span>
            )}
        </div>
    )
}