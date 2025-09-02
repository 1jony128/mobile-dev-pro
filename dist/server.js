const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Раздача статических файлов
app.use(express.static(__dirname));

// Основные маршруты
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/mobile-app-necessity', (req, res) => {
    res.sendFile(path.join(__dirname, 'mobile-app-necessity-article.html'));
});

app.get('/blog-todo-apps', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog_todo_apps.html'));
});

// Обработка 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📱 Mobile Developer Site is ready!`);
    console.log(`🌐 Open http://localhost:${PORT} in your browser`);
});

module.exports = app;
