/**
 * Created by mcichowski on 24/12/17.
 */

import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';


const bookShelfTypesToShow = [
    {
        type: 'currentlyReading',
        description : 'Currently Reading',
    },
    {
        type: 'wantToRead',
        description : 'Want to Read',
    },
    {
        type: 'read',
        description: 'Read',
    }];

class ListBookShelf extends Component {

    static propTypes = {
        shelvedBooks: PropTypes.array.isRequired,
        moveBookAction : PropTypes.func.isRequired
    };

    render = () => {
        const {shelvedBooks, moveBookAction} = this.props;

        return <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {bookShelfTypesToShow.map((bookShelfType) => (<BookShelf key={bookShelfType.type}
                                                                             books={shelvedBooks.filter((book) => book.shelf === bookShelfType.type)}
                                                                             shelfType={bookShelfType}
                                                                             moveBookAction={moveBookAction}/>))}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>;
    }

}

export default ListBookShelf;