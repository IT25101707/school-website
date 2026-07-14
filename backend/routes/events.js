const router = require('express').Router()
const pool = require('../config/db')

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE date >= CURDATE() ORDER BY date ASC')
    res.json(rows)
  } catch (e) { next(e) }
})

module.exports = router
