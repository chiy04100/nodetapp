import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

// MySQLの接続設定
const pool = mysql.createPool({
  host: 'db', // Dockerネットワーク上のMySQLコンテナのホスト名を指定
  user: 'root',
  password: 'root',
  database: 'myapp',
});

// CORSミドルウェアを使用
app.use(cors());

// ルートハンドラーの定義
app.get('/api/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error);
      res.status(500).send('Internal Server Error: ' + error.message);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.json(results);
    }
  });
});

// サーバーを起動
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
