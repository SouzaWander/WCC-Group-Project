// This module should contain all functions related with books
// For now, it only contains the list of books

export interface Book {
    id: number,
    title: string,
    authors: string[],
    image: string,
    rating: number,
    numberrating: number
}

export const books = [
    {
        id: 1,
        title: "Ubik",
        authors: [
            "Philip K. Dick"],
        image: "https://covers.openlibrary.org/b/id/9251896-L.jpg",
        rating: 4,
        numberrating: 300,
        category: "Science fiction"
    },
    {
        id: 2,
        title: "Do Androids dream of electric sheep?",
        authors: [
            "Philip K. Dick"
        ],
        image: "https://covers.openlibrary.org/b/id/11153217-L.jpg",
        rating: 5,
        numberrating: 255,
        category: "Science fiction"
    },
    {
        id: 3,
        title: "The Man in The High Castle",
        authors: [
            "Philip K. Dick"
        ],
        image: "https://covers.openlibrary.org/b/id/10045188-L.jpg",
        rating: 5,
        numberrating: 120,
        category: "Science fiction"
    },
    {
        id: 4,
        title: "Minority Report and other tales",
        authors: [
            "Philip K. Dick"
        ],
        image: "https://covers.openlibrary.org/b/id/911202-L.jpg",
        rating: 3,
        numberrating: 450,
        category: "Science fiction"
    },
    {
        id: 5,
        title: "Dune",
        authors: [
            "Frank Herbert"
        ],
        image: "https://covers.openlibrary.org/b/id/9719751-L.jpg",
        rating: 4,
        numberrating: 450,
        category: "Science fiction"
    },
    {
        id: 6,
        title: "The City of Mist",
        authors: [
            "Carlos Ruiz Zafon"
        ],
        image: "https://covers.openlibrary.org/b/id/10833361-L.jpg",
        rating: 5,
        numberrating: 450,
        category: "Romance"
    },
    {
        id: 7,
        title: "The Angel's Game",
        authors: [
            "Carlos Ruiz Zafon"
        ],
        image: "https://covers.openlibrary.org/b/id/12133051-L.jpg",
        rating: 5,
        numberrating: 450,
        category: "Romance"
    }
]