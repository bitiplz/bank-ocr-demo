import { getFile } from 'lib/ocr'

export default async function file(req, res) {
  switch (req.method) {
    case 'GET': {
      if (!req.query.id) {
        return res.status(400).json({ message: '"id" was not provided ' })
      }

      const { data, error } = await getFile(req.query.id)

      if (error) {
        return res.status(500).json({ message: 'db error' })
      }

      return res.json(data)
    }

    default: {
      return res.status(400).json({ message: 'unsupported request method' })
    }
  }
}
