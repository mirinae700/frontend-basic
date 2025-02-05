import { Component } from "react";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

export default class ExpenseItem extends Component {
  render() {
    return (
      <li className="item">
        <div className="info">
          <span className="expense">{this.props.expense.content}</span>
          <span className="amount">{this.props.expense.amount}원</span>
        </div>
        <div>
          <button className="btn edit-btn">
            <MdEdit />
          </button>
          <button
            className="btn delete-btn"
            onClick={() => this.props.handleDelete(this.props.expense.id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      </li>
    );
  }
}
