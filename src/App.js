import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import ListBookShelf from './ListBookShelf';
import SearchBooks from './SearchBooks';
import * as Utils from './utils';

import './App.css'

class App extends React.Component {
    state = {
        booksMap : {},
        shelvedBooks: []
    };

    componentDidMount = () => {
        BooksAPI.getAll().then((books) => {
            const booksMap = Utils.mapData(books);
            const shelvedBooks = Utils.getSortedArrayFromObject(booksMap);
            this.setState({booksMap,shelvedBooks});
        });
    };

    updateBooksMap = (book) => {
        const booksMapCopy = Object.assign({},this.state.booksMap);

        if (book.shelf === 'none') {
            delete booksMapCopy[book.id];
        } else {
            booksMapCopy[book.id] = book;
        }

        this.setState({
            booksMap : booksMapCopy,
            shelvedBooks : Utils.getSortedArrayFromObject(booksMapCopy)
        });
    };

    moveBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            BooksAPI.get(book.id).then((data) => this.updateBooksMap(data));
        });
    };

    searchBook = (query) => {
        return BooksAPI.search(query).then((data) => {
            return Array.isArray(data) ? data : [];
        });
    };

    render = () => {

        const {shelvedBooks} = this.state;

        return <div className="app">
            <Route exact path="/" render={() => (<ListBookShelf shelvedBooks={shelvedBooks} moveBookAction={this.moveBook}/>)}/>
            <Route path="/search" render={() => (<SearchBooks shelvedBooks={shelvedBooks} moveBookAction={this.moveBook} searchBooksAction={this.searchBook}/>)}/>
        </div>;
    }
}

export default App;
