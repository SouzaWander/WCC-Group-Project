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
      console.log(rows)
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

            console.log(row)
          }
        })
      })
      console.log(rows)
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
      console.log("hi")
      console.log(row)
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
      console.log(row)
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
      console.log(rows)
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

            console.log(row)
          }
        })
      })
      console.log(rows)
      setTimeout(() => fn(rows), 1000)
      // fn(rows)
    }
  })
}
export function addOneBook(s:Book) {
  // insert one new book into the database
  // Don't forget to add the relation to authors
  // The relation to authors is established using the author identifiers
}