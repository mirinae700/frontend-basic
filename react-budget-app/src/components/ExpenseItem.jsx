import "./ExpenseItem.css";
import { Component } from "react";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

export default class ExpenseItem extends Component {
  render() {
    const amount = this.props.expense.amount;
    return (
      <li className="item">
        <div className="info">
          <span className="content">{this.props.expense.content}</span>
          <span className="amount">
            {this.props.expense.typeCode === "income"
              ? `${amount.toLocaleString()}원`
              : `-${amount.toLocaleString()}원`}
          </span>
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
