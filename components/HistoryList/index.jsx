const dummyHistory = [
  { id: '001', name: 'History 1' },
  { id: '002', name: 'History 2' },
  { id: '003', name: 'History 3' },
  { id: '004', name: 'History 4' },
]

import List from 'components/common/List'
import Tempalte from './ItemTemplate'

export default function HistoryList() {
  return <List template={Tempalte} items={dummyHistory} />
}
