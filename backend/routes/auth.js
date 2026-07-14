const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

// POST /api/auth/login  { username, password }
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'Enter a username and password.' })

    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    const user = rows[0]
    if (!user) return res.status(401).json({ message: 'Invalid username or password.' })

    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) return res.status(401).json({ message: 'Invalid username or password.' })

    const payload = { id: user.id, role: user.role, name: user.full_name }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '8h' })
    res.json({ token, user: payload })
  } catch (e) { next(e) }
})

module.exports = router
