import Head from 'next/head'

import CenteredLayout from 'layouts/CenteredLayout'
import HistoryList from 'components/HistoryList'

export default function Results({ ssr = {} }) {
  const { history } = ssr

  return (
    <>
      <Head>
        <title>Bank OCR Demo</title>
        <meta name="description" content="Bank OCR Demo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CenteredLayout>
        <HistoryList history={history} />
      </CenteredLayout>
    </>
  )
}

export async function getServerSideProps() {
  const historyData = await fetch('http://localhost:3000/api/ocr/files')
  const historyResult = await historyData.json()
  const history = historyData.status === 200 ? historyResult : []

  return {
    props: { ssr: { history } },
  }
}
