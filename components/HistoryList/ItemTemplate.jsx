import Link from 'next/link'

export default function HistoryItemTemplate({ item: { id, name } }) {
  return <Link href={`/history/${id}`}>{name}</Link>
}
