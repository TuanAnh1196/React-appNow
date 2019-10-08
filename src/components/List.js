import React from 'react';
import Note from './Note';

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    addOrders = (itemFood) => {
        this.props.addToOrders(itemFood);
    }

    subOrders = (itemFood) => {
        this.props.subToOrders(itemFood);
    }

    render() {
        return (
            <div>
                {
                    this.props.foods.map((note, index) => {
                        return <Note key={index}
                            itemFood={note}
                            curentAdd={this.addOrders}
                            curentSub={this.subOrders}
                        >
                        </Note>
                    })
                }
            </div>
        );
    }
}

export default List;
