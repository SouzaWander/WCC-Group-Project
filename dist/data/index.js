"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatingStats = exports.getCategoryStats = exports.addOneBook = exports.getAllAuthors = exports.getAllBooksCategories = exports.getAllCategories = exports.getOneBook = exports.getAllBooks = void 0;
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
                    }
                });
            });
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
                    }
                });
            });
            setTimeout(() => fn(rows), 1000);
            // fn(rows)
        }
    });
}
exports.getAllBooksCategories = getAllBooksCategories;
function getAllAuthors(search, fn) {
    const sql = `SELECT name FROM author WHERE name LIKE '%' || ? || '%' `;
    const params = [search];
    return init_1.db.all(sql, params, (err, row) => {
        if (err) {
            console.log("error in database: " + err);
            fn(null);
        }
        else {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            // get the authors of the book and add it to the book
            fn(row);
        }
    });
}
exports.getAllAuthors = getAllAuthors;
function addOneBook(s) {
    const idMax = `
  SELECT MAX(id) as maxid FROM book
  `;
    let aux;
    init_1.db.all(idMax, [], (err, row) => {
        if (err) {
            console.log("error in database: " + err);
        }
        else {
            s.id = row[0].maxid + 1;
            aux = row[0].maxid + 1;
            const booksql = `
    INSERT INTO book (id, title, image, category, rating, numberrating) VALUES (?,?,?,?,?,?)
    `;
            init_1.db.run(booksql, [s.id, s.title, s.image, s.category, s.rating, s.numberrating]);
        }
    });
    // const booksql = `
    // INSERT INTO book (id, title, image, category, rating, numberrating) VALUES (?,?,?,?,?,?)
    // `
    // db.run(booksql, [s.id, s.title, s.image, s.category, s.rating, s.numberrating])
    const authorsql = `INSERT INTO author (name) SELECT @_name
                    WHERE NOT EXISTS(SELECT name FROM author WHERE name = @_name)`;
    s.authors.forEach(author => {
        init_1.db.run(authorsql, [author]);
    });
    const relation = 'INSERT INTO author_book (author_id, book_id) VALUES (?,?)';
    const sql2 = `SELECT id, name FROM author`;
    const params2 = [];
    init_1.db.all(sql2, params2, (err2, auth) => {
        if (err2) {
            console.log("error in database: " + err2);
        }
        else {
            auth.forEach(a => {
                if (s.authors.includes(a.name)) {
                    init_1.db.run(relation, [a.id, aux]);
                }
            });
        }
    });
}
exports.addOneBook = addOneBook;
// Getting the category stats for chartJS
function getCategoryStats(fn) {
    const sql = "SELECT category, COUNT(*) AS count FROM book GROUP BY category";
    init_1.db.all(sql, [], (err, rows) => {
        if (err) {
            console.log("Error in database: " + err);
        }
        else {
            fn(rows);
        }
    });
}
exports.getCategoryStats = getCategoryStats;
// Getting the rating stats for chartJS
function getRatingStats(fn) {
    const sql = "SELECT rating, COUNT(*) AS count FROM book GROUP BY rating";
    init_1.db.all(sql, [], (err, rows) => {
        if (err) {
            console.log("Error in database: " + err);
        }
        else {
            fn(rows);
        }
    });
}
exports.getRatingStats = getRatingStats;
//# sourceMappingURL=index.js.map