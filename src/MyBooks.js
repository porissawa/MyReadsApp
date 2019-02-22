import React, {Component, Fragment} from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Bookshelf extends Component {
    
    constructor(props){
        super(props)
        this.updateShelf = this.updateShelf.bind(this)
    }
    
    updateShelf(e, book) {
        BooksAPI.update(book, e.target.value)
        .then(this.props.onUpdate())
    }

    render(){
        const {books, title} = this.props

        return(
            <div className="bookshelf">
                {title && (   
                    <h2 className="bookshelf-title">{title}</h2>
                )}
                <div className="bookshelf-books">
                    <ul className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <img src={book.imageLinks ? book.imageLinks.smallThumbnail : "http://i.imgur.com/sJ3CT4V.gif"} className="book-cover" alt={`${book.title} cover`}/>
                                        <div className="book-shelf-changer"> 
                                            <select onChange={(e) => this.updateShelf(e, book)}
                                            value={typeof book.shelf === "undefined" ? "none" : book.shelf}>
                                                <option value="" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <p className="book-title">{book.title}</p>
                                    <p className="book-authors">{book.authors ? book.authors[0] : "Unknown Author"}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

class Search extends Component {
    state = {
        searchQuery: '',
        results: [],
    }

    constructor(props) {
        super(props)

        this.setQuery = this.setQuery.bind(this)
    }

    setQuery(e) {
        if(e) {
            this.setState({searchQuery: e.target.value})
            BooksAPI.search(e.target.value)
            .then((results) => {
                const bookSearch = results.map((bookResult) => {
                    this.props.books.map((book) => {
                        if (book.id === bookResult.id) {
                            bookResult.shelf = book.shelf
                        }
                        return bookResult
                   })
                   return bookResult
               })
                this.setState({results: bookSearch})
            })
            .catch((err) => {
                this.setState({results: []})
            })
        } else {
            this.setState({results: []})
        }
        
    }

    render() {
        const results = this.state.results

        return (
            <div>
                <div className="search-books-bar">
                    <a href='/'><button className="close-search"></button></a>
                    <input type="text" placeholder="Search by title or author" onChange={this.setQuery} value={this.state.searchQuery}></input>
                </div>
                <div className="search-books-results">
                    <Bookshelf books={results} onUpdate={this.props.onUpdate}/>
                </div>
            </div>
        )
    }
}

class Container extends Component {
    state = {
        books: [],
    };

    constructor(props) {
        super(props)
        this.getBooks = this.getBooks.bind(this)
    }
    
    componentDidMount() {
        this.getBooks()
    }

    getBooks = () => {
        BooksAPI.getAll()
        .then((books) => {
            this.setState(() => ({books}))
        })
    }

    render() {
        const books = this.state.books
        const currentlyReading = books.filter(cr => cr.shelf === "currentlyReading")
        const wantToRead = books.filter(want => want.shelf === "wantToRead");
        const read = books.filter(read => read.shelf === "read");

        return(
            <div className='app'>
                <Route exact path='/' render={() => (
                    <div>
                        <div className='list-books-title'>
                            <h1>MyBooks App</h1>
                        </div>
                        <div className='list-books-content'>
                            <Bookshelf books={currentlyReading} title="Currently Reading" onUpdate={this.getBooks}/>
                            <Bookshelf books={wantToRead} title="Want to Read" onUpdate={this.getBooks}/>
                            <Bookshelf books={read} title="Read" onUpdate={this.getBooks}/>
                        </div>                        
                        <a href="/search" className="open-search"><button></button></a>
                    </div>
                )}/>

                <Route path='/search' render={() => ( 
                    <Fragment>
                        <Search books={books} onUpdate={this.getBooks}/>   
                    </Fragment>
                )} />
            </div>
        )
    }
}

export default Container