import Link from 'next/link'

export default function HistoryItemTemplate({
  item: { id, createdAt, fileName },
}) {
  return (
    <Link href={`/result/${id}`} passHref>
      <div role="button">
        <span>{fileName}</span>
        <br />
        <small>{createdAt.toLocaleString()}</small>
        <br />
        <small>{id}</small>
      </div>
    </Link>
  )
}
