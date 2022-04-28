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

export const Status = ({
  item: {
    postProcessData: { checksumValid },
    outputValid,
  },
}) => {
  const ill = !outputValid
  const err = !ill && !checksumValid

  const color = err ? 'error' : ill ? 'warning' : 'success'
  const text = err ? 'ERR' : ill ? 'ILL' : 'OK'

  return <Chip color={color}>{text}</Chip>
}
