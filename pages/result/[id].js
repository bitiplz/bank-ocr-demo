import Head from 'next/head'

import SplitLayout from 'layouts/SplitLayout'
import HistoryList from 'components/HistoryList'
import AddFile from 'components/AddFile'
import ResultTable from 'components/ResultTable'

export default function Results({ ssr = {} }) {
  const {
    history,
    result: { data },
    resultId,
  } = ssr

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
            <HistoryList history={history} activeId={resultId} />
          </>
        }
      >
        <ResultTable data={data} />
      </SplitLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    query: { id },
  } = context

  /*
    TODO: replace fetches with lib/ocr getters

    jsondb instantiates on every getServerSideProps
    should not happen with a real db conn, hance the fetches
  */
  const [historyData, resultData] = await Promise.all([
    fetch('http://localhost:3000/api/ocr/files'),
    fetch(`http://localhost:3000/api/ocr/file/${id}`),
  ])

  const history = await historyData.json()
  const result = await resultData.json()

  return {
    props: { ssr: { history, resultId: id, result: result.data } },
  }
}
