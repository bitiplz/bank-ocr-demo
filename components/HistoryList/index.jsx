import List from 'components/common/List'
import Tempalte from './ItemTemplate'

export default function HistoryList({ history, activeId }) {
  const activeItem = history.find(({ id }) => id === activeId)
  if (activeItem) {
    activeItem.active = true
  }
  return <List template={Tempalte} items={history} />
}
