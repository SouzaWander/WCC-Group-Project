"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOneBook = exports.getAllBooksCategories = exports.getAllCategories = exports.getOneBook = exports.getAllBooks = void 0;
const init_1 = require("./init");
function getAllBooks(search, fn) {
    const sql = `
              SELECT * FROM Book b
              WHERE b.title LIKE '%' || ? || '%'
              `;
    const params = [search];
    return init_1.db.all(sql, params, (err, rows) => {
        if (err) {
            console.log("error in database: " + err);
            fn([]);
        }
        else {
            console.log(rows);
            // Now get the authors for each book and add it to the result
            const sql2 = `SELECT name FROM author_book ab
              JOIN author a on a.id = ab.author_id
              WHERE book_id = ?`;
            rows.forEach((row) => {
                const params2 = [row.id];
                init_1.db.all(sql2, params2, (err2, a) => {
                    if (err2) {
                        console.log("error in database: " + err2);
                    }
                    else {
                        const la = [];
                        // Now get the authors for each book and add it to the result
                        a.forEach(author => {
                            la.push(author.name);
                        });
                        row.authors = la;
                        console.log(row);
                    }
                });
            });
            console.log(rows);
            setTimeout(() => fn(rows), 1000);
            // fn(rows)
        }
    });
}
exports.getAllBooks = getAllBooks;
function getOneBook(id, fn) {
    const sql = "SELECT * FROM Book WHERE id = ?";
    const params = ["" + id];
    return init_1.db.get(sql, params, (err, row) => {
        if (err) {
            console.log("error in database: " + err);
            fn(null);
        }
        else {
            console.log("hi");
            console.log(row);
            // get the authors of the book and add it to the book
            fn(row);
        }
    });
}
exports.getOneBook = getOneBook;
function getAllCategories(search, fn) {
    const sql = `SELECT category, COUNT(category) AS n_cate FROM Book WHERE category LIKE '%' || ? || '%' GROUP BY category ORDER BY n_cate DESC`;
    const params = [search];
    return init_1.db.all(sql, params, (err, row) => {
        if (err) {
            console.log("error in database: " + err);
            fn(null);
        }
        else {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(row);
            // get the authors of the book and add it to the book
            fn(row);
        }
    });
}
exports.getAllCategories = getAllCategories;
function getAllBooksCategories(search, fn) {
    const sql = `
              SELECT * FROM Book b
              WHERE category LIKE '%' || ? || '%'
              `;
    const params = [search];
    return init_1.db.all(sql, params, (err, rows) => {
        if (err) {
            console.log("error in database: " + err);
            fn([]);
        }
        else {
            console.log(rows);
            // Now get the authors for each book and add it to the result
            const sql2 = `SELECT name FROM author_book ab
              JOIN author a on a.id = ab.author_id
              WHERE book_id = ?`;
            rows.forEach((row) => {
                const params2 = [row.id];
                init_1.db.all(sql2, params2, (err2, a) => {
                    if (err2) {
                        console.log("error in database: " + err2);
                    }
                    else {
                        const la = [];
                        // Now get the authors for each book and add it to the result
                        a.forEach(author => {
                            la.push(author.name);
                        });
                        row.authors = la;
                        console.log(row);
                    }
                });
            });
            console.log(rows);
            setTimeout(() => fn(rows), 1000);
            // fn(rows)
        }
    });
}
exports.getAllBooksCategories = getAllBooksCategories;
function addOneBook(s) {
    // insert one new book into the database
    // Don't forget to add the relation to authors
    // The relation to authors is established using the author identifiers
}
exports.addOneBook = addOneBook;
//# sourceMappingURL=index.js.map