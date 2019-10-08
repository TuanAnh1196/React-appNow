import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ShowBanner extends React.Component {
    render() {
        return (
            <div className="Banner-footer">
                <div className="Banner-Content">
                    <strong><span>Số lượng : {this.props.soluong}</span></strong>
                    <strong><span>Tổng Tiền : {this.props.tongtien}</span> VND</strong>
                </div>
            </div>
        );
    }
}

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

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: [
                { srcHinh: "images/nemchua.jpeg", Name: "Nem Chua Rán", Gia: 5000 },
                { srcHinh: "images/trasua.jpeg", Name: "Trà Sữa", Gia: 10000 },
                { srcHinh: "images/tradao.jpeg", Name: "Trà Đào", Gia: 15000 }
            ],
            checkout: 0,
            quantity: 0,
            orders: []
        };
    }

    changeOrder = (food, amount) =>{
        const { orders } = this.state
        const foodOrder = orders.find(item => item.Name === food.Name)
        this.setState({
            quantity: this.state.quantity + amount,
            orders  : foodOrder ? orders.map(item => {
                if (item.Name === food.Name) {
                  let currentTotal = item.total + amount;
                  return {
                    ...item,
                    total: currentTotal,
                    price: currentTotal * food.Gia
                  }
                }
                return item;
                }) : [
                    ...orders,
                    {
                        Name: food.Name,
                        total: 1,
                        price: food.Gia
                    }
                ],
        }, ()=>{
            var a =0;
            this.state.orders.map(item=>{
                a += item.price;
                this.setState({
                    checkout: a
                });
            })
        })
    }
    
    add = (food) => this.changeOrder(food,1);
    sub = (food) => this.changeOrder(food,-1);

    render() {
        return (
            <div>
                <List foods={this.state.foods}
                    addToOrders={this.add}
                    subToOrders={this.sub} />
                {
                    this.state.quantity > 0 ? (
                        <ShowBanner soluong={this.state.quantity} tongtien={this.state.checkout} />
                    ) : ""
                }
            </div>
        );
    }
}

ReactDOM.render(
    <div>
        <Container />
    </div>
    ,
    document.getElementById('root'));
