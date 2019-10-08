import React from 'react';

class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sum: 0,
        };
    }

    addFood=()=>{
        this.setState({
            sum: ++this.state.sum,
        });
        this.props.curentAdd(this.props.itemFood);
    }

    subFood = () => {
        this.setState({
            sum: --this.state.sum,
        });
        this.props.curentSub(this.props.itemFood);
    }

    render() {
        const { itemFood } = this.props;
        return (
            <div className="Container">
                <div className="img-left">
                    <img src={itemFood.srcHinh} />
                </div>
                <div className="content-right">
                    <h2>{itemFood.Name}</h2>
                    <span>Giá: {itemFood.Gia} VND</span>
                    <div>
                        {
                            this.state.sum > 0 ? (
                                <button onClick={this.subFood}> - </button>
                            ) : ""
                        }
                        {this.state.sum > 0 ? <span>{this.state.sum}</span> : ""}
                        <button onClick={this.addFood}> + </button>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default Note;
