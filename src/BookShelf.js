/**
 * Created by mcichowski on 19/12/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridBooks from './GridBooks';
import sortBy from 'sort-by';

class BookShelf extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfType : PropTypes.shape({
                type : PropTypes.string.isRequired,
                description : PropTypes.string.isRequired,
            }
        ).isRequired,
        moveBookAction : PropTypes.func.isRequired
    };

    render = () => {
        const {books, shelfType, moveBookAction} = this.props;

        books.sort(sortBy('title'));

        return <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfType.description}</h2>
            <div className="bookshelf-books">
                <GridBooks moveBookAction={moveBookAction} books={books}/>
            </div>
        </div>
    }
}

export default BookShelf;