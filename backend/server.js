const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notices', require('./routes/notices'))
app.use('/api/news', require('./routes/news'))
app.use('/api/events', require('./routes/events'))
app.use('/api/gallery', require('./routes/gallery'))
app.use('/api/downloads', require('./routes/downloads'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/students', require('./routes/students'))
app.use('/api/marks', require('./routes/marks'))
app.use('/api/attendance', require('./routes/attendance'))
app.use('/api/parents', require('./routes/parents'))
app.use('/api/admin', require('./routes/admin'))

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'school-api' }))

// Central error handler
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong on the server.' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ School API running on http://localhost:${PORT}`))
