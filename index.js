const express = require('express');

const app = express()

app.listen(3000, () =>{
    console.log("server corriendo puerto")
})

// Configura la ruta raíz
app.get('/', (req, res) => {
    res.send('Hola desde modo API');
  });
