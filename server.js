const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kyc',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});


app.use(express.json());
app.post('/submitForm', (req, res) => {
  const { name, prenom, email, num, text } = req.body;

  // Insert the form data into the MySQL database
  const sql = 'INSERT INTO employe (name, prenom, email, numero, motivation) VALUES (?, ?, ?, ?, ?)';
  const values = [name, prenom, email, num, text];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    console.log('Data inserted successfully');
    res.status(200).json({ message: 'Data inserted successfully' });
  });
});

//add formateur
app.post('/addForm', (req, res) => {
  const { name, prenom, email, num, date_disponibilite } = req.body;

  // Insert the form data into the MySQL database
  const sql = 'INSERT INTO formateur (nom, prenom, email, numero, debutDisponibilite, finDisponibilite) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, prenom, email, num, date_disponibilite];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    console.log('Data inserted successfully');
    res.status(200).json({ message: 'Data inserted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});