import "./ExpenseItem.css";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
  const amount = expense.amount;
  return (
    <li className="item">
      <div className="info">
        <span className="content">{expense.content}</span>
        <span className="amount">
          {expense.typeCode === "income"
            ? `${amount.toLocaleString()}원`
            : `-${amount.toLocaleString()}원`}
        </span>
      </div>
      <div>
        <button className="btn edit-btn" onClick={() => handleEdit(expense.id)}>
          <MdEdit />
        </button>
        <button
          className="btn delete-btn"
          onClick={() => handleDelete(expense.id)}
        >
          <MdDeleteForever />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
