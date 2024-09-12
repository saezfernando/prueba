const express = require("express");
const app = express();

let mimiddleware = function (req, res, next) {
  console.log(req.path);
  next();
};

app.use(express.urlencoded());
app.use(express.static("public/html"));
app.use(express.static("public/imagenes"));
app.use(express.static("public/styles"));
app.use(express.static("public/js"));

app.get("/usuario/:dni", (req, res) => {
  res.send(
    "<h1> Hola " +
      req.path +
      "</h1>" +
      "<h1> Hola " +
      req.query.saludo +
      "</h1>"
  );
});

app.get("/personas", mimiddleware, (req, res) => {
  res.status(200).send("manejo de ruta archivo.dat");
});

app.post("/procesar", (req, res) => {
  res.json(req.body);
});

app.get("/redirigir", (req, res) => {
  res.redirect(301, "/form.html");
});

app.listen(3000, () => {
  console.log("Servidor iniciado");
});

module.exports = app;
