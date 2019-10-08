import React from 'react';

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

export default ShowBanner;
