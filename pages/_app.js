import '../styles/globals.css'

import OcrProvider from 'components/context/OcrProvider'

function MyApp({ Component, pageProps }) {
  return (
    <OcrProvider>
      <Component {...pageProps} />
    </OcrProvider>
  )
}

export default MyApp
