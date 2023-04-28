// Importar módulos necesarios
const express = require('express');
const ProductManager = require('./ProductManager');

// Crear instancia de ProductManager
const productManager = new ProductManager('products.json');

// Crear instancia de Express
const app = express();

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getAll();

  if (limit) {
    products = products.slice(0, limit);
  }

  res.json({ products });
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ product });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
