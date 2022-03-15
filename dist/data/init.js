"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const books_1 = require("../books");
const sqlite3 = sqlite3_1.default.verbose();
exports.db = new sqlite3.Database("db.sqlite", (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    }
    else {
        console.log("Connected to the database");
        exports.db.run(`
CREATE TABLE author(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)
`, (dberr) => {
            if (dberr) {
                console.log("Authors' table already created.");
            }
            else {
                const insert = `INSERT INTO author (name) SELECT @_name
                    WHERE NOT EXISTS(SELECT name FROM author WHERE name = @_name)`;
                books_1.books.forEach(b => {
                    b.authors.forEach(a => {
                        console.log(a);
                        exports.db.run(insert, a);
                    });
                });
                // db.run(insert, [0,"Philip K. Dick"])
                // db.run(insert, [1,"Frank Herbert"])
            }
        });
        exports.db.run(`
CREATE TABLE book(
    id INTEGER PRIMARY KEY,
    title TEXT,
    image TEXT,
    rating INTEGER,
    numberrating INTEGER,
    category TEXT
)
`, (dberr) => {
            if (dberr) {
                console.log("Books' table already created.");
            }
            else {
                console.log("book cre");
                const insert = `
INSERT INTO book (id,title, image, rating, numberrating, category) VALUES (?,?,?,?,?,?)
`;
                books_1.books.forEach(b => {
                    exports.db.run(insert, [b.id, b.title, b.image, b.rating, b.numberrating, b.category]);
                });
            }
        });
        exports.db.run(`
CREATE TABLE author_book(
    author_id INTEGER,
    book_id INTEGER,
    FOREIGN KEY(author_id) REFERENCES author(author_id),
    FOREIGN KEY(book_id) REFERENCES book(book_id)
)
`, (dberr) => {
            if (dberr) {
                console.log("Book/Author relation table already created.");
            }
            else {
                const insert = 
                // 'INSERT INTO author_book (book_id, author_id)
                // VALUES (@_bookid,(SELECT id FROM author WHERE name = @_authorname))'
                // `
                // INSERT INTO author_book (author_id, book_id)
                // VALUES (?,SELECT id FROM author WHERE name = ?)
                // `
                `
INSERT INTO author_book (author_id, book_id) VALUES (?,?)
`;
                // db.run(insert, [1,1])
                // db.run(insert, [1,2])
                // db.run(insert, [1,3])
                // db.run(insert, [1,4])
                // db.run(insert, [1,5])
                // db.run(insert, [2,5])
                // const authors: number[][] = []
                // for(const idx in books) {
                // if( authors[idx] ) { // Se já está no mapa
                //     authors[idx].push(books[idx].id)
                // } else { // ainda não está no mapa
                //     authors[idx] = [books[idx].id] // cria a lista com o primeiro livro.
                // }
                // }
                const sql2 = `SELECT id, name FROM author`;
                books_1.books.forEach((row) => {
                    const params2 = [];
                    exports.db.all(sql2, params2, (err2, auth) => {
                        if (err2) {
                            console.log("error in database: " + err2);
                        }
                        else {
                            auth.forEach(a => {
                                if (row.authors.includes(a.name)) {
                                    exports.db.run(insert, [a.id, row.id]);
                                }
                            });
                        }
                    });
                });
                // console.log(authors)
                // books.forEach( b => {
                //     b.authors.forEach(a =>{
                //         db.run(insert,(b.id,a))
                //     })
                // })
            }
        });
    }
});
//# sourceMappingURL=init.js.map