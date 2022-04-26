import { useState, createContext, useContext } from 'react'
import readFile from 'features/FileReader'
import ParseFile from 'features/segments/Parser'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'

export const OcrContext = createContext()
export const useOcrContext = () => useContext(OcrContext)

export default function OcrProvider({ children }) {
  const [history, setHistory] = useState([])
  const { push: navigate } = useRouter()

  const add = async (files) => {
    const result = await Promise.all(
      files.map(async (f) => {
        const fileContent = await readFile(f)
        const result = ParseFile(fileContent)

        return {
          id: uuidv4(),
          fileName: f.name,
          createdAt: new Date(),
          result,
        }
      })
    )

    setHistory([...history, ...result])
    navigate(`/result/${result[0].id}`)
  }

  const state = {
    history,
    add,
  }

  return (
    <OcrContext.Provider value={state}>
      {/**/}
      {children}
    </OcrContext.Provider>
  )
}
