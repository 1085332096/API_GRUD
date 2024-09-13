const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productsmodel'); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Configura la ruta raíz
app.get('/', (req, res) => {
  res.send('Hola Api');
});

// Obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un producto por ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productDelete = await Product.findByIdAndDelete(id);

    if (!productDelete) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Crear un nuevo producto
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);  // Status 201 para recursos creados
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un producto por ID
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Conexión a MongoDB
mongoose.connect("mongodb+srv://alejandrapuerchambud2:Ek04WCP7z3tLKCTf@cluster0.uljab.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Conexión exitosa con la base de datos");
    app.listen(3000, () => {
      console.log("Servidor corriendo en el puerto 3000");
    });
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos:", err);
  });
