import {db} from './init'
import {books, Book} from '../books'

export function getAllBooks(search:string, fn:(books:Book[]) => void) {
  const sql =
  `
              SELECT * FROM Book b
              WHERE b.title LIKE '%' || ? || '%'
              `
  const params:string[] = [search]
  return db.all(sql, params, (err, rows) =>{
    if( err ) {
      console.log("error in database: "+err)
      fn([])
    } else {
      // Now get the authors for each book and add it to the result
      const sql2 = `SELECT name FROM author_book ab
              JOIN author a on a.id = ab.author_id
              WHERE book_id = ?`;
      rows.forEach( (row) =>{
        const params2:string[] = [row.id]
        db.all(sql2, params2, (err2, a) =>{
          if( err2 ) {
            console.log("error in database: "+err2)
          } else {
            const la:string[] = [];
            // Now get the authors for each book and add it to the result
            a.forEach(author =>{
              la.push(author.name)
            })
            row.authors = la
          }
        })
      })
      setTimeout(() => fn(rows), 1000)
      // fn(rows)
    }
  })
}

export function getOneBook(id:number, fn:(book:Book|null) => void) {
  const sql = "SELECT * FROM Book WHERE id = ?"
  const params:string[] = [""+id]
  return db.get(sql, params, (err, row) =>{
    if( err ) {
      console.log("error in database: "+err)
      fn(null)
    } else {
      // get the authors of the book and add it to the book
      fn(row)
    }
  })}

export function getAllCategories(search:string,fn:(categories:string[]|null)=> void){
  const sql = `SELECT category, COUNT(category) AS n_cate FROM Book WHERE category LIKE '%' || ? || '%' GROUP BY category ORDER BY n_cate DESC`
  const params:string[] = [search]
  return db.all(sql, params, (err, row) =>{
    if( err ) {
      console.log("error in database: "+err)
      fn(null)
    } else {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      // get the authors of the book and add it to the book
      fn(row)
    }
  })
}

export function getAllBooksCategories(search:string, fn:(books:Book[]) => void) {
  const sql =
  `
              SELECT * FROM Book b
              WHERE category LIKE '%' || ? || '%'
              `
  const params:string[] = [search]
  return db.all(sql, params, (err, rows) =>{
    if( err ) {
      console.log("error in database: "+err)
      fn([])
    } else {
      // Now get the authors for each book and add it to the result
      const sql2 = `SELECT name FROM author_book ab
              JOIN author a on a.id = ab.author_id
              WHERE book_id = ?`;
      rows.forEach( (row) =>{
        const params2:string[] = [row.id]
        db.all(sql2, params2, (err2, a) =>{
          if( err2 ) {
            console.log("error in database: "+err2)
          } else {
            const la:string[] = [];
            // Now get the authors for each book and add it to the result
            a.forEach(author =>{
              la.push(author.name)
            })
            row.authors = la
          }
        })
      })
      setTimeout(() => fn(rows), 1000)
      // fn(rows)
    }
  })
}

export function getAllAuthors(search:string,fn:(authors:string[]|null)=> void){
  const sql = `SELECT name FROM author WHERE name LIKE '%' || ? || '%' `
  const params:string[] = [search]
  return db.all(sql, params, (err, row) =>{
    if( err ) {
      console.log("error in database: "+err)
      fn(null)
    } else {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      // get the authors of the book and add it to the book
      fn(row)
    }
  })
}

export function addOneBook(s:Book) {

  const idMax = `
  SELECT MAX(id) as maxid FROM book
  `
  let aux: number;
  db.all(idMax, [], (err, row) =>{
    if( err ) {
      console.log("error in database: "+err)
    } else {
      s.id = row[0].maxid + 1
      aux = row[0].maxid + 1
      const booksql = `
    INSERT INTO book (id, title, image, category, rating, numberrating) VALUES (?,?,?,?,?,?)
    `
    db.run(booksql, [s.id, s.title, s.image, s.category, s.rating, s.numberrating])
    }

  })

  // const booksql = `
  // INSERT INTO book (id, title, image, category, rating, numberrating) VALUES (?,?,?,?,?,?)
  // `
  // db.run(booksql, [s.id, s.title, s.image, s.category, s.rating, s.numberrating])

  const authorsql =
      `INSERT INTO author (name) SELECT @_name
                    WHERE NOT EXISTS(SELECT name FROM author WHERE name = @_name)`
      s.authors.forEach(author => {
        db.run(authorsql, [author])
      })
  const relation = 'INSERT INTO author_book (author_id, book_id) VALUES (?,?)'
  const sql2 = `SELECT id, name FROM author`;
  const params2:number[] = []
  db.all(sql2, params2, (err2, auth) =>{
    if( err2 ) {
        console.log("error in database: "+err2)
    } else {
        auth.forEach(a => {
            if(s.authors.includes(a.name)){
                db.run(relation, [a.id, aux ])
            }
        });
    }
    })
}

// Getting the category stats for chartJS
export function getCategoryStats(fn:(category:any[]) => void) {
  const sql = "SELECT category, COUNT(*) AS count FROM book GROUP BY category"
  db.all(sql, [], (err, rows) =>{
    if( err ) {
      console.log("Error in database: " + err)
    } else {
      fn(rows)
    }
  })
  }

  // Getting the rating stats for chartJS
export function getRatingStats(fn:(rating:any[]) => void) {
  const sql = "SELECT rating, COUNT(*) AS count FROM book GROUP BY rating"
  db.all(sql, [], (err, rows) =>{
    if( err ) {
      console.log("Error in database: " + err)
    } else {
      fn(rows)
    }
  })
  }

