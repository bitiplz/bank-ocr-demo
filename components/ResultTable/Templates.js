import { Fragment } from 'react'
import { Chip } from 'components/common'

export const Input = ({ item: lines }) => (
  <pre>
    {lines.map((line, i) => (
      <Fragment key={`${line}-${i}`}>
        {line}
        <br />
      </Fragment>
    ))}
  </pre>
)

export const Output = ({ item: characters }) => (
  <span>{characters.join('')}</span>
)

export const Status = ({ item: isValidOutput }) => (
  <Chip color="pink">{isValidOutput ? 'ok' : 'nok'}</Chip>
)
