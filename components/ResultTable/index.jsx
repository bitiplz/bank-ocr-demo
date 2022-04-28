import { Fragment } from 'react'
import Table from 'components/common/Table'

const TABLE_HEAD = ['input', 'output', 'outputValid']

const InputTemplate = ({ item: lines }) => (
  <pre>
    {lines.map((line) => (
      <Fragment key={line}>
        {line}
        <br />
      </Fragment>
    ))}
  </pre>
)

const OutputTemplate = ({ item: characters }) => (
  <span>{characters.join('')}</span>
)
const StatusTemplate = ({ item: isValidOutput }) => (
  <span>{isValidOutput ? 'ok' : 'nok'}</span>
)

export default function ResultTable({ data }) {
  return (
    <Table
      fields={TABLE_HEAD}
      data={data || []}
      fieldTemplate={{
        input: InputTemplate,
        output: OutputTemplate,
        outputValid: StatusTemplate,
      }}
    />
  )
}
