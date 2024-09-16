const express = require("express");
const $mysql = require("mysql2/promise");
//require("dotenv").config();
const app = express();

let mimiddleware = function (req, res, next) {
  console.log(req.path);
  next();
};

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static("public/html"));
app.use(express.static("public/imagenes"));
app.use(express.static("public/styles"));
app.use(express.static("public/js"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/form.html");
});

app.get("/nueva", (req, res) => {
  res.send("nueva");
});

app.get("/personas", async (req, res) => {
  $conn = await $mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DB || "pruebadb",
  });
  const [$result] = await $conn.query("select * from persona");
  res.json($result);
});

app.get("/traducir", (req, res) => {});

app.get("/productos/:id/color/:color", (req, res) => {
  res.send(`el producto ${req.params.id} - ${req.params.color}`);
});

app.get("/productos", (req, res) => {
  res.send(`el producto ${req.query.color}`);
});

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
/*
app.get("/personas", mimiddleware, (req, res) => {
  res.status(200).send("manejo de ruta archivo.dat");
});
*/
app.post("/procesar", (req, res) => {
  res.send(
    `El departamento ${req.body.departamento} es con palabra clave ${req.body.keyWord}`
  );
});

app.get("/redirigir", (req, res) => {
  res.redirect(301, "/form.html");
});

app.all("*", (req, res) => {
  res.status(404).send("No se encontro la ruta");
});

app.listen(3000, () => {
  console.log("Servidor iniciado");
});
