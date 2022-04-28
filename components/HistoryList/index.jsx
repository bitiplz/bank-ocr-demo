import { Paper, List } from 'components/common'
import Tempalte from './ItemTemplate'

export default function HistoryList({ history, activeId }) {
  const activeItem = history.find(({ id }) => id === activeId)
  if (activeItem) {
    activeItem.active = true
  }
  return (
    <Paper title="File History">
      <List template={Tempalte} items={history} />
    </Paper>
  )
}
