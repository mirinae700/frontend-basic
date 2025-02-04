import { Component } from "react";
import { MdSend } from "react-icons/md";

export default class ExpenseForm extends Component {
  render() {
    return (
      <form>
        <div className="form-center">
          <div className="form-group">
            <label htmlFor="typeCode">유형</label>
            <select id="typeCode" name="typeCode">
              <option value="income">수입</option>
              <option value="expenditure">지출</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="charge">내용</label>
            <input
              type="text"
              className="form-control"
              id="content"
              name="content"
              placeholder="예) 렌트비"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">비용</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              placeholder="예) 100"
            />
          </div>
        </div>
        <button type="submit" className="btn btn__primary">
          제출
          <MdSend className="btn-icon" />
        </button>
      </form>
    );
  }
}
