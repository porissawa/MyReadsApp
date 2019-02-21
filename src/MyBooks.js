import React, {Component, Fragment} from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

const Book = (props) => {
    return(
        <li key={props.id}>
            <div className='book'>
                <div className='book-top'>
                    <img src={props.cover} className="book-cover" alt={`${props.title} cover`}/>
                    <div className="book-shelf-changer"> 
                        <select>
                            <option value='' disabled>Move to...</option>
                            <option value='currentlyReading'>Currently Reading</option>
                            <option value='wantToRead'>Want to Read</option>
                            <option value='read'>Read</option>
                            <option value='none'>None</option>
                        </select>
                    </div>
                </div>
                <p className="book-title">{props.title}</p>
                <p className="book-authors">{props.authors}</p>
            </div>
        </li>
    )
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
                    return bookResult
                })
                this.setState({results: bookSearch})
                console.log(results)
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
                    <ul className="books-grid">
                        {results.map((book) => {
                           return <Book cover={book.imageLinks ? book.imageLinks.thumbnail : 'http://i.imgur.com/sJ3CT4V.gif'} title={book.title} authors={book.authors} shelf={book.shelf} id={book.id} />
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

class Container extends Component {
    state = {
        books: [],
    };
    
    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
            this.setState(() => ({books}))
        })
    }

    render() {
        const books = this.state.books

        return(
            <div className='app'>
                <Route exact path='/' render={() => (
                    <div>
                        <div className='list-books-title'>
                            <h1>MyBooks App</h1>
                        </div>
                        <div className='list-books-content'>
                        <div className='bookshelf'>
                            <h2 className='bookshelf-title'>Currently Reading</h2>
                            <ul className='books-grid'>
                                {books.map((book) => {
                                    if(book.shelf === 'currentlyReading'){
                                        return(
                                            <Book cover={book.imageLinks ? book.imageLinks.thumbnail : 'http://i.imgur.com/sJ3CT4V.gif'} title={book.title} authors={book.authors} shelf={book.shelf} id={book.id} />                                   
                                        )
                                    } else {
                                        return(null)
                                    }
                                })}
                            </ul>
                        </div>
                            <div className='bookshelf'>
                                <h2 className='bookshelf-title'>Want To Read</h2>
                                <div className='bookshelf-books'>
                                <ul className='books-grid'>
                                    {books.map((book) => {
                                        if(book.shelf === 'wantToRead'){
                                            return(
                                                <Book cover={book.imageLinks ? book.imageLinks.thumbnail : 'http://i.imgur.com/sJ3CT4V.gif'} title={book.title} authors={book.authors} shelf={book.shelf} id={book.id} />
                                            )
                                        } else {
                                            return(null)
                                        }
                                    })}
                                </ul>
                                </div>
                            </div>
                            <div className='bookshelf'>
                                <h2 className='bookshelf-title'>Read</h2>
                                <div className='bookshelf-books'>
                                    <ul className='books-grid'>
                                        {books.map((book) => {
                                            if(book.shelf === 'read'){
                                                return(                                           
                                                    <Book cover={book.imageLinks ? book.imageLinks.thumbnail : 'http://i.imgur.com/sJ3CT4V.gif'} title={book.title} authors={book.authors} shelf={book.shelf} id={book.id} />                                            
                                                )
                                            } else {
                                                return(null)
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <a href="/search" className="open-search"><button></button></a>
                    </div>
                )}/>

                <Route path='/search' render={({history}) => ( 
                    <Fragment>
                        <Search/>   
                    </Fragment>
                )} />
            </div>
        )
    }
}

export default Container