import Head from 'next/head'
import CenteredLayout from 'layouts/CenteredLayout'
import AddFile from 'components/AddFile'

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bank OCR Demo</title>
        <meta name="description" content="Bank OCR Demo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CenteredLayout>
        <AddFile />
        <Link href="/result">Skip</Link>
      </CenteredLayout>
    </>
  )
}
