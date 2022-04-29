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

export const Output = ({ item: { output = {}, postProcessData = {} } }) => {
  const { characters: originalValue } = output
  const { value } = postProcessData
  const shownValue = (value || originalValue).join('')

  return <span>{shownValue}</span>
}

export const Status = ({ item: { postProcessData = {} } }) => {
  const { status } = postProcessData

  const hasStatus = Boolean(status)

  const err = status === 'ERR'
  const ill = status === 'ILL'
  const amb = status === 'AMB'

  const color = !hasStatus
    ? 'error'
    : err
    ? 'pink'
    : ill
    ? 'warning'
    : amb
    ? 'info'
    : 'success'

  const text = hasStatus ? status : '!'

  return <Chip color={color}>{text}</Chip>
}
