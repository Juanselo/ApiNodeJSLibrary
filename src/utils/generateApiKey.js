const pool = require('../config/dbConfig');
const generateApiKey = require('../utils/generateApiKey'); // Importa la función para generar la clave

/**
 * Crea una nueva clave API y la guarda en la base de datos.
 * @returns {Promise<Object>} El objeto con la clave API generada y sus detalles.
 */
const createApiKey = async () => {
  const secretKey = generateApiKey();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1); // La clave API expira en 24 horas

  try {
    const [result] = await pool.query(
      'INSERT INTO api_keys (secret_key, expires_at) VALUES (?, ?)',
      [secretKey, expiresAt]
    );
    return { id: result.insertId, secretKey, expiresAt };
  } catch (error) {
    throw new Error('Error al crear la clave API: ' + error.message);
  }
};

module.exports = { createApiKey };
