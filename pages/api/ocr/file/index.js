import { randomUUID as uuid } from 'crypto'
import ParseFile from 'features/segments/Parser'
import multer from 'multer'
import fs from 'fs'

import adapter from 'lib/db/adapters'

export const config = {
  api: {
    bodyParser: false,
  },
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/files')
    },
    filename: function (req, file, cb) {
      cb(null, uuid().replaceAll('-', ''))
    },
  }),
})

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function file(req, res) {
  if (req.method === 'POST') {
    await runMiddleware(req, res, upload.single('file'))
    const content = fs.readFileSync(req.file.path, 'utf-8')
    fs.unlink(req.file.path, () => {})

    const { originalname: name, filename: id } = req.file

    const newRecord = {
      name,
      createdAt: new Date(),
      data: ParseFile(content),
    }

    const { error } = await adapter.add(`/files/${id}`, newRecord)

    if (error) {
      return res.status(500).json({ message: 'db error' })
    }

    return res.json({ ok: 'OK', id, newRecord })
  }

  return res.status(400).json({ message: 'unsupported request method' })
}
