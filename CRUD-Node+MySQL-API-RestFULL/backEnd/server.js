import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "laranja",
  database: "crud",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server!" });
    console.log({ result });
    return res.json(result);
  });
});

app.post("/student", (req, res) => {
  const sql = "INSERT INTO student (`name`, `email`) VALUES (?)";
  console.log(req.body);
  const values = [req.body.name, req.body.email];

  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    console.log({ result });
    return res.json(result);
  });
});

app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server!" });
    console.log({ result });
    return res.json(result);
  });
});

app.put("/edit/:id", (req, res) => {
  const sql = "UPDATE student SET `name`=?, `email`=? WHERE id=?";
  const id = req.params.id;

  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server!" });
    console.log({ result });
    return res.json(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server!" });
    console.log({ result });
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log(`Listening on port: 8081`);
});
