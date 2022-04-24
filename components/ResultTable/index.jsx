import Table from 'components/common/Table'

const TABLE_HEAD = ['input', 'value', 'status']

const dummyResults = [
  { input: 'xxxxxxxxx', value: '111111111', status: 'ok' },
  { input: 'xxxxxxxxx', value: '2222?11?1', status: 'nok' },
  { input: 'xxxxxxxxx', value: '111111111', status: 'ok' },
  { input: 'xxxxxxxxx', value: '111111111', status: 'ok' },
]

export default function ParseResult({ parseId }) {
  return (
    <>
      <h2>{parseId}</h2>
      <Table data={dummyResults} fields={TABLE_HEAD} />
    </>
  )
}
