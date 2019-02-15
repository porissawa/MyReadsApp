import React, {Component} from 'react'
import './App.css'

class Book extends Component {
    state = {
        books: [
        {
            title: "The Linux Command Line",
            authors: [
                "William E. Shotts, Jr."
            ],
            imageLinks: {
                smallThumbnail: "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                thumbnail: "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            }
        },
        {
            title: "Learning Web Development with React and Bootstrap",
            authors: [
                "Harmeet Singh",
                "Mehul Bhatt"
            ],
            imageLinks: {
                "smallThumbnail": "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
        }
        ]
    }

    render(){
        let books = this.state.books

        return(
            books.map((book) => {
                return(
                <div className="book">
                    <img src={book.imageLinks.thumbnail} className="book-cover" alt={book.title}/>
                    <p className="book-title">{book.title}</p>
                    <p className="book-authors">{book.authors}</p>
                    <button className="book-shelf-changer"></button>
                </div>
                )
            })
            
        )
    }
}

class Container extends Component {
render(){
    return(
        <div className='shelf-one'>
            <Book />
        </div>
    )
}
}

export default Container