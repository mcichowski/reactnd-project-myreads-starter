/**
 * Created by mcichowski on 19/12/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const shelfTypeActionOptions = [
    {
        id : 1,
        type: 'currentlyReading',
        description : 'Currently Reading',
    },
    {
        id : 2,
        type: 'wantToRead',
        description : 'Want to Read',
    },
    {
        id : 3,
        type: 'read',
        description : 'Read',
    },
    {
        id : 4,
        type: 'none',
        description : 'None',
    },
];

class BookActionMenu extends Component {

    static propTypes = {
        moveBookAction : PropTypes.func.isRequired,
        book : PropTypes.shape({
            id : PropTypes.string.isRequired
        }).isRequired
    };

    state = {
        selectedShelf : 'none'
    };

    componentDidMount = () => {

        if (this.props.book.shelf) {
            this.setState({
                selectedShelf : this.props.book.shelf
            });
        }
    };

    updateSelectedShelf = (selectedShelf) => {
        this.setState({
                selectedShelf
            });
        this.props.moveBookAction(this.props.book, selectedShelf);

    };

    render = () => {
        const {selectedShelf} = this.state;

        return <div className="book-shelf-changer">
                <select value={selectedShelf} onChange={(event) => (this.updateSelectedShelf(event.target.value))}>
                    <option value='' disabled>Move to...</option>
                    {shelfTypeActionOptions.map((option) =>
                        (<option key={option.id} value={option.type} >{option.type === selectedShelf ? '\u2713 ':''}{option.description}</option>))}
                </select>
            </div>;
    };
}

export default BookActionMenu;