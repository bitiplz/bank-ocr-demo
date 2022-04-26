import { useOcrContext } from 'components/context/OcrProvider'

import List from 'components/common/List'
import Tempalte from './ItemTemplate'

const byCreatedAt = ({ createdAt: a }, { createdAt: b }) => (a < b ? 1 : -1)

export default function HistoryList() {
  const { history } = useOcrContext()
  const sortedHistory = history.sort(byCreatedAt)

  return <List template={Tempalte} items={sortedHistory} />
}
