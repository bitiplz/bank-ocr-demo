import Link from 'next/link'

export default function HistoryItemTemplate({ item: { id, createdAt, name } }) {
  return (
    <Link href={`/result/${id}`} passHref>
      <div role="button">
        <strong>{name}</strong>
        <br />
        <small>{createdAt}</small>
        <br />
        <small>{id}</small>
      </div>
    </Link>
  )
}
