import { Component } from "react";

export default class Summary extends Component {
  render() {
    return (
      <>
        <p className="total-income">
          총 수입액 <span>0원</span>
        </p>
        <span>-</span>
        <p className="total-expenditure">
          총 지출액 <span>0원</span>
        </p>
        <span>=</span>
        <p className="balance">
          잔액 <span>0원</span>
        </p>
      </>
    );
  }
}
