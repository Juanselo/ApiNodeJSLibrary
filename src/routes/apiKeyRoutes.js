const express = require('express');
const router = express.Router();
const createApiKey = require('../services/apiKeyService'); // Ajusta el camino según la ubicación de tu archivo

// Endpoint para generar una nueva clave API
router.post('/generate', async (req, res) => {
  try {
    const apiKey = await createApiKey();
    res.status(201).json({ apiKey });
  } catch (error) {
    console.error('Error al generar la clave API:', error);
    res.status(500).json({ error: 'Error al generar la clave API' });
  }
});

module.exports = router;
