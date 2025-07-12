const express = require('express')
const router = express.Router()
const SwapRequest = require('../models/SwapRequest')

// Create a new swap request
router.post('/', async (req, res) => {
  try {
    const newSwap = new SwapRequest(req.body)
    await newSwap.save()
    res.status(201).json(newSwap)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Get all swap requests
router.get('/', async (req, res) => {
  try {
    const swaps = await SwapRequest.find().populate('fromUser toUser')
    res.json(swaps)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
