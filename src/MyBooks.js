import React, {Component} from 'react'
import './App.css'

const Book = (props) => {
    return(
        <div className="book">
            <img src={props.cover} className="book-cover" alt={`${props.title} cover`}/>
            <p className="book-title">{props.title}</p>
            <p className="book-authors">{props.authors}</p>
            <button className="book-shelf-changer"></button>
        </div> 
    )
}

class Shelf extends Component {
    state = {
        books: [
        {
            title: "The Linux Command Line",
            authors: [
                "William E. Shotts, Jr."
            ],
            imageLinks: {
                "thumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            status: 'read'
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
            status: 'want'
        },
        ]
    };

    
    render(){
        const books = this.state.books
        return(
            books.map((book) => {
                return(
                    <Book cover={book.imageLinks.thumbnail} title={book.title} authors={book.authors} />
                )
            }) 
        )
    }
}

class Container extends Component {
render(){
    return(
        <div className='app'>
            <div className='list-books-title'>
                <h1>MyBooks App</h1>
            </div>
            <div className='list-books-content'>
                <div className='bookshelf'>
                    <Shelf />
                </div>
            </div>
        </div>
    )
}
}

export default Container