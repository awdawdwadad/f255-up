const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log("root_path")
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


const db = mysql.createConnection({
    host: 'localhost',
    user: 'mefe',
    password: '12345',
    database: 'admin'
});

db.connect(err => {
    if (err) {
        console.error('Veritabanı bağlantı hatası:', err);
    } else {
        console.log('Veritabanına bağlandı.');
    }
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            res.status(500).send('Veritabanı hatası');
        } else {
            res.status(200).send('Kayıt başarılı');
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            res.status(500).send('Veritabanı hatası');
        } else if (results.length > 0) {
            res.status(200).send('Oturum açma başarılı');
        } else {
            res.status(401).send('Geçersiz e-posta veya şifre');
        }
    });
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
});
