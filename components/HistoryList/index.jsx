import { Paper, List } from 'components/common'
import Tempalte from './ItemTemplate'

export default function HistoryList({ history, activeId }) {
  const activeItem = history.find(({ id }) => id === activeId)
  if (activeItem) {
    activeItem.active = true
  }
  return (
    <Paper title="Files">
      <List template={Tempalte} items={history} />
      {history.length === 0 && <i>No file available</i>}
    </Paper>
  )
}
