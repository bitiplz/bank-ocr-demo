import { Paper, Table } from 'components/common'
import * as Template from './Templates'

const FIELDS = [
  { field: 'input', label: 'Input', template: Template.Input },
  {
    field: 'output',
    label: 'Account',
    template: Template.Output,
    align: 'right',
  },
  {
    field: 'outputValid',
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
