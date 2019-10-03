import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Note extends React.Component {
  render() {
    const { foodItem, currentOrder, onClickSub, onClickAdd } = this.props

    return (
      <div className="Container">
        <div className="img-left">
          <img src={foodItem.srcHinh} alt="day la hinh anh cua food" />
        </div>
        <div className="content-right">
          <h2>{foodItem.Name}</h2>
          <span>Giá: {foodItem.Gia} VND</span>
          <div>
            {
              currentOrder && currentOrder.total > 0 ? (
                <button onClick={onClickSub}> - </button>
              ) : ""
            }
            {currentOrder && currentOrder.total > 0 ? <span>{currentOrder.total}</span> : ""}
            <button onClick={onClickAdd}> + </button>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

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

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  getCurrentOrder = (note) => {
    const { orders } = this.props
    const currentOrder = orders.find(item => item.Name === note.Name)
    return currentOrder
  }

  render() {
    return (
      <div>
        {
          this.props.foods.map((note, index) => {
            return <Note
              key={index}
              foodItem={note}
              currentOrder={this.getCurrentOrder(note)}
              onClickAdd={this.props.onAddOrder(note)}
              onClickSub={this.props.onRemoveOrder(note)}
            />
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
      orders: [],
    };
  }

  changeOrderTotal = (food, amount) => {
    const { orders } = this.state
    const foodOrder = orders.find(item => item.Name === food.Name)

    this.setState({
      orders: foodOrder ? orders.map(item => {
        if (item.Name === food.Name) {
          return {
            ...item,
            total: item.total + amount
          }
        }
        return item;
      }) : [
        ...orders,
        {
          Name: food.Name,
          total: 1
        }
      ]
    })
  }

  onAddOrder = (food) => () => this.changeOrderTotal(food, 1)
  onRemoveOrder = (food) => () => this.changeOrderTotal(food, -1)

  render() {
    return (
      <div>
        <List
          foods={this.state.foods}
          orders={this.state.orders}
          onAddOrder={this.onAddOrder}
          onRemoveOrder={this.onRemoveOrder}
        />
        {
          this.state.orders.length > 0 ? <ShowBanner soluong={0} tongtien={0} /> : null
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