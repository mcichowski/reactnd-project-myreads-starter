/**
 * Created by mcichowski on 19/12/17.
 */
import React, { Component } from 'react';
import BookActionMenu from './BookActionMenu';
import PropTypes from 'prop-types';


class Book extends Component {

    static propTypes = {
        book: PropTypes.shape({
            imageLinks : PropTypes.shape({
                thumbnail : PropTypes.string
            }).isRequired,
            title: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired,
        moveBookAction : PropTypes.func.isRequired
    };

    printAuthors = (authors) => {
        let authorInfo = '';
        if(authors) {
            for (let i = 0; i < authors.length; i++) {
                authorInfo += authors[i] + (i !== authors.length - 1 ? ', ': '') ;
            }
        }
        return authorInfo;
    };

    render = () => {
        const {book, moveBookAction} = this.props;

        const style = {
            width : 128,
            height : 193,
            backgroundImage : `url("${book.imageLinks.thumbnail}")`
        };

        return <div className="book">
            <div className="book-top">
                <div className="book-cover" style={style}/>
                <BookActionMenu moveBookAction={moveBookAction} book={book}/>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{this.printAuthors(book.authors)}</div>
        </div>;
    };
}

export default Book;