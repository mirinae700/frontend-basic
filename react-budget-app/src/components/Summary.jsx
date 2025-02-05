import { Component } from "react";

export default class Summary extends Component {
  render() {
    return (
      <>
        <p className="total-income">
          <span>총 수입액 </span>
          <span>{this.props.summary.income.toLocaleString()}원</span>
        </p>
        <span>-</span>
        <p className="total-expenditure">
          <span>총 지출액 </span>
          <span>{this.props.summary.expenditure.toLocaleString()}원</span>
        </p>
        <span>=</span>
        <p className="balance">
          <span>잔액 </span>
          <span>{this.props.summary.balance.toLocaleString()}원</span>
        </p>
      </>
    );
  }
}
