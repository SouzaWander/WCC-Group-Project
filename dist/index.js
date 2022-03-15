"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./data");
const data_1 = require("./data");
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.static('public'));
// Getting all books, with search
app.get('/api/books', (req, res) => {
    const search = (req.query.search || "");
    (0, data_1.getAllBooks)(search, (data) => { res.send(JSON.stringify(data)); });
});
// Getting one book
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    (0, data_1.getOneBook)(bookId, (book) => {
        if (book != null)
            res.send(JSON.stringify(book));
        else {
            res.status(404);
            res.send();
        }
    });
});
app.get('/api/books_category', (req, res) => {
    const search = (req.query.search || "");
    (0, data_1.getAllBooksCategories)(search, (data) => { res.send(JSON.stringify(data)); });
});
app.get('/api/categories', (req, res) => {
    const search = (req.query.search || "");
    (0, data_1.getAllCategories)(search, (data) => { res.send(JSON.stringify(data)); });
});
// Adding one book
app.post('/api/books', (req, res) => {
    console.log('New Books Being added');
    let body = "";
    req
        .on('data', (data) => body += data)
        .on('end', () => { (0, data_1.addOneBook)(JSON.parse(body)); });
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map