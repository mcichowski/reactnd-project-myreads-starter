/**
 * Created by mcichowski on 19/12/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class GridBooks extends Component {

    static propTypes = {
        books : PropTypes.array.isRequired,
        moveBookAction : PropTypes.func.isRequired
    };

    render = () => {
        const {books, moveBookAction} = this.props;
        return <ol className="books-grid">
            {books.map((book) => (<li key={book.id}><Book moveBookAction={moveBookAction} book={book}/></li>))}
        </ol>;
    };
}

export default GridBooks;