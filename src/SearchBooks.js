/**
 * Created by mcichowski on 19/12/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridBooks from './GridBooks';
import {Link} from 'react-router-dom';

class SearchBooks extends Component {

    state = {
        query : '',
        books : [],
        shelvedBooks : []
    };

    searchTimer = 0;

    static propTypes = {
        moveBookAction : PropTypes.func.isRequired,
        searchBooksAction : PropTypes.func.isRequired,
        shelvedBooks : PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.searchBooks = this.searchBooks.bind(this);
    }

    componentDidMount = () => {
        this.setState(Object.assign({}, this.state, {shelvedBooks:this.props.shelvedBooks}));
    };

    searchBooks = (query) => {
        const self = this;

        self.setState((state) => (Object.assign({}, state, {
            query,
        })));

        clearTimeout(self.searchTimer);

        self.searchTimer = setTimeout(function() {
            self.props.searchBooksAction(query).then((searchResult) => {
                const {shelvedBooks} = self.state;

                for (let i = 0; i < searchResult.length; i++) {
                    const searchBook = searchResult[i];
                    const shelfBook = shelvedBooks.find((book) => book.id === searchBook.id);

                    if (shelfBook) {
                        searchBook.shelf = shelfBook.shelf;
                    }
                }
                self.setState(Object.assign({}, self.state, {books:searchResult}));
            });

            }, 200);

    };

    render = () => {
        const {moveBookAction} = this.props;
        const {query, books} = this.state;

        return  <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" >Close</Link>
                <div className="search-books-input-wrapper">
                    <input onChange={(event) => this.searchBooks(event.target.value)} value={query} type="text" placeholder="Search by title or author"/>

                </div>
            </div>
            <div className="search-books-results">
                <GridBooks books={books} moveBookAction={moveBookAction}/>
            </div>
        </div>;
    };
}

export default SearchBooks;