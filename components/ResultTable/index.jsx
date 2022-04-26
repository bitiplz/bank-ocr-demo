import { useOcrContext } from 'components/context/OcrProvider'
import { useRouter } from 'next/router'
import Table from 'components/common/Table'

const TABLE_HEAD = ['input', 'output', 'outputValid']

const InputTemplate = ({ item: lines }) => (
  <pre>
    {lines.map((line) => (
      <>
        {line}
        <br />
      </>
    ))}
  </pre>
)

const OutputTemplate = ({ item: characters }) => (
  <span>{characters.join('')}</span>
)
const StatusTemplate = ({ item: isValidOutput }) => (
  <span>{isValidOutput ? 'ok' : 'nok'}</span>
)

export default function ResultTable() {
  const { history } = useOcrContext()
  const {
    query: { id: resultId },
  } = useRouter()

  const current = history.find(({ id }) => id === resultId)

  return (
    <Table
      fields={TABLE_HEAD}
      data={current?.result?.data || []}
      fieldTemplate={{
        input: InputTemplate,
        output: OutputTemplate,
        outputValid: StatusTemplate,
      }}
    />
  )
}
