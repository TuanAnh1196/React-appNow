import React from 'react';
import './App.css';
import List from './components/List';
import ShowBanner from './components/ShowBanner';

const totalPrice = (acc, cur) => acc +cur.price;
class App extends React.Component {
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
      // let sumprice = this.state.orders.reduce((price,order,index) => {
      //     return price += order.price
      // }, 0)
      // this.setState({
      //     checkout: sumprice
      // });
      this.setState({
          checkout: this.state.orders.reduce(totalPrice,0),
      });
    })
  }
  
  addOrder = (food) => this.changeOrder(food,1);
  subOrder = (food) => this.changeOrder(food,-1);

  render() {
    return (
        <div>
          <List foods={this.state.foods}
              addToOrders={this.addOrder}
              subToOrders={this.subOrder} />
          {
              this.state.quantity > 0 ? (
                  <ShowBanner soluong={this.state.quantity} tongtien={this.state.checkout} />
              ) : ""
          }
        </div>
    );
  }
}

export default App;
