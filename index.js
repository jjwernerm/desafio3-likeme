// Importo el paquete express y las funciones de node.js
const { consultarPosts, crearPost, eliminarPost } = require('./node');

// Importo el paquete express y se ejecuta para obtener un enrutador (app)
const express = require('express');
const app = express();

// Importo paquete CORS
const cors = require('cors');
app.use(cors());

// Uso middleware qpara que me permita parsear el cuerpo de la consulta
app.use(express.json())
app.use(express.static('public'))

// Creo una ruta raíz GET / que devuelve el archivo index.html del Apoyo Desafío - Like Me
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

// Creo una ruta GET con Express para devolver los registros de una tabla alojada en PostgreSQL
app.get("/posts", async(req,res) =>{
  const posts = await consultarPosts()
  res.json(posts)
})

// Creo una ruta POST con Express que reciba y almacene en PostgreSQL un nuevo registro
app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion, likes } = req.body;
  await crearPost(titulo, url, descripcion, likes)
  res.send("Post creado")
})

// procedo a implementar la funcionalidad de borrado utilizando una ruta DELETE /posts/:id
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  await eliminarPost(id)
  res.send("Post eliminado");
});

// Especifico en qué puerto se levantará el servidor y se declara un mensaje por consola al evantarse.
app.listen(3000, console.log("SERVIDOR CONECTADO index.js"))