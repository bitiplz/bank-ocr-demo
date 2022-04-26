import Head from 'next/head'

import CenteredLayout from 'layouts/CenteredLayout'
import HistoryList from 'components/HistoryList'
import ParseFile from 'components/ParseFile'
import ResultTable from 'components/ResultTable'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bank OCR Demo</title>
        <meta name="description" content="Bank OCR Demo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CenteredLayout
        sidePanel={
          <>
            <ParseFile />
            <HistoryList />
          </>
        }
      >
        <ResultTable />
      </CenteredLayout>
    </>
  )
}
