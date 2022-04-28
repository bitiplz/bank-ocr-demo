import { getFilesList } from 'lib/ocr'

export default async function files(req, res) {
  switch (req.method) {
    case 'GET': {
      const data = await getFilesList()

      if (!data) {
        return res.status(500).json({ message: 'db error' })
      }

      return res.json(data)
    }

    default: {
      return res.status(400).json({ message: 'unsupported request method' })
    }
  }
}
