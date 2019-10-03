import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ENGINE_METHOD_DSA } from 'constants';
class Note extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Sum: 0,

        };
    }
       
    showIncrease = () => {
        this.setState({
            Sum : this.state.Sum +1,
        });
        
       
    }
    showDecrease = () => {
        this.state.Sum = this.state.Sum-1;
        this.setState(this.state);
    }
	render() {
		return (
			<div className="Container">
                <div className="img-left">
                    <img  src={this.props.src} />
                </div>
                <div className="content-right">
                    <h2>{this.props.children}</h2>
                    <span>Giá: {this.props.gia} VND</span>
                    <div>
                        {
                            this.state.Sum > 0 ?(
                                 /* ham buttonGiam truyen props gia nguoc lai List */ 
                            <button onClick={()=>{this.showDecrease(); this.props.buttonGiam(this.props.gia)}}> - </button>
                            ):""
                        }
                        {this.state.Sum>0?<span>{this.state.Sum}</span>:""}
                        <button onClick={(event) =>{this.props.onNhan(this.props.gia);this.showIncrease()}}> + </button>
                        { /* ham onNhan truyen props gia nguoc lai List */ }
                        
                        
                    </div>
                    
               
                </div>
                
                
				<div className="clear"></div>
			</div>
		);
	}
}

class ShowBanner extends React.Component{
    render(){
        return(
            <div className="Banner-footer">
                <div className="Banner-Content">
                    <strong><span>Số lượng : {this.props.soluong}</span></strong>
                    <strong><span>Tổng Tiền : {this.props.tongtien}</span> VND</strong>
                </div>
            </div>
        );
    }
}
class Container extends React.Component{
    constructor(props){
		super(props);
		this.state = {
            isShow: false,
            gia: 0,
            soluong: 0
        };
    }
    onShowGia=(e)=>{
		this.setState({
            isShow:true, 
            gia: +this.state.gia+ +e,
            soluong: +this.state.soluong+ +1,
        });
    }
    GiamGia = (e)=>{
        this.setState({
            gia: parseInt(this.state.gia)-e,
            soluong: parseInt(this.state.soluong)-1,
        });
    }

    render(){
        return(
            //onShowGia tang gia va tang so luong o banner
            //GiamGia giam gia va giam so luong o banner
            <div>
                <List onNhanList={this.onShowGia} onNhanGiamList={this.GiamGia} />
                {
                    //khi bam nut them or so luong lon hon 0 thi show banner
                    this.state.soluong > 0?(
                        this.state.isShow?<ShowBanner soluong={this.state.soluong} tongtien={this.state.gia}/>:""
                    ):""
                }
                
            </div>
        );
    }
}
class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			mang: [
				{srcHinh: "images/nemchua.jpeg", Name: "Nem Chua Rán", Gia: "5000"},
				{srcHinh: "images/trasua.jpeg", Name: "Trà Sữa", Gia: "10000"},
				{srcHinh: "images/tradao.jpeg", Name: "Trà Đào", Gia: "15000"}
			]
		};
    }

    onNhanNote = (e) =>{ 
        // tham so e chua props gia
        this.props.onNhanList(e);
    }
    onNhanGiam = (e)=>{
        //tham so e chua props gia
        this.props.onNhanGiamList(e);
        
    }

	render(){
		return(
			<div>
				{
					this.state.mang.map((note,index) => {
						return <Note key={index} src={note.srcHinh} buttonGiam={this.onNhanGiam}   onNhan={this.onNhanNote} gia={note.Gia}>{note.Name}</Note>
                    })
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
serviceWorker.unregister();
