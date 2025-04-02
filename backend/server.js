const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();

// 连接 MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 使用 API 路由
app.use('/api', apiRoutes);

// 静态文件（用于访问生成的PDF文件）
app.use('/pdfs', express.static('pdfs'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
