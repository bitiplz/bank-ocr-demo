import { Paper, Table } from 'components/common'
import * as Template from './Templates'

const FIELDS = [
  { id: 'input', field: 'input', label: 'Input', template: Template.Input },
  {
    id: 'account',
    label: 'Account',
    template: Template.Output,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    template: Template.Status,
    align: 'right',
  },
]

export default function ResultTable({ data = [], activeId = '' }) {
  return (
    <Paper primary title="Results" sub={activeId}>
      <Table fields={FIELDS} data={data} />
      {data.length === 0 && <i>No result available</i>}
    </Paper>
  )
}
