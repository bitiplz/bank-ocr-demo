import Head from 'next/head'

import SplitLayout from 'layouts/SplitLayout'
import HistoryList from 'components/HistoryList'
import AddFile from 'components/AddFile'
import ResultTable from 'components/ResultTable'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bank OCR Demo</title>
        <meta name="description" content="Bank OCR Demo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SplitLayout
        sidePanel={
          <>
            <AddFile />
            <HistoryList />
          </>
        }
      >
        <ResultTable />
      </SplitLayout>
    </>
  )
}
