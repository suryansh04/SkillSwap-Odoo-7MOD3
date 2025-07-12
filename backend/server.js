require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// Replace <password> with actual password from .env
const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err))

// Example test route
app.get('/', (req, res) => {
  res.send('API is working!')
})

// Import your routes here
// app.use('/api/users', require('./routes/userRoutes'))
// app.use('/api/swaps', require('./routes/swapRoutes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
