import { Paper, Table } from 'components/common'
import * as Template from './Templates'

const FIELDS = [
  ['input', Template.Input, 'left'],
  ['output', Template.Output, 'right'],
  ['outputValid', Template.Status, 'right'],
]

export default function ResultTable({ data = [], activeId = '' }) {
  return (
    <Paper primary title="Results" sub={activeId}>
      <Table fields={FIELDS} data={data} />
    </Paper>
  )
}
