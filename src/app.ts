import express from 'express'
import fs from 'fs'

const app = express()

app.get('*', (req, res) => {
  res.send('Hello World')
})

export default app
