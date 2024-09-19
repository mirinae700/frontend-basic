"use strict"

class Calendar {

    constructor(selector) {
        this.wrapper = document.querySelector(selector);

        this.currDate = new Date();
        this.currYear = this.currDate.getFullYear();
        this.currMonth = this.currDate.getMonth();
        this.currDay = this.currDate.getDate();

        this.baseDate = this.currDate;
        this.baseYear = this.baseDate.getFullYear();
        this.baseMonth = this.baseDate.getMonth();
        this.baseDay = this.baseDate.getDate();

        this.dayOfWeekLabel = ["일", "월", "화", "수", "목", "금", "토"];

        this.#init();
    }

    #init() {
        this.#renderCalendar();
    }

    #renderCalendar() {
        if(this.wrapper.querySelector(".calendar table")) {
            this.wrapper.replaceChildren(); // 기존 table 삭제
        }

        const table = document.createElement("table");
        this.wrapper.appendChild(this.createCalendarHeader()); // 캘린더 헤더 표시
        table.appendChild(this.createDayOfWeeks()); // 달력 요일 표시
        this.wrapper.appendChild(this.createDays(table)); // 날짜 표시
    }
    
    createCalendarHeader() {
        const div = document.createElement("div");
        div.classList.add("cal-header");

        // 년도 표시
        const year = document.createElement("span");
        year.classList.add("year");
        year.dataset.calYear = this.baseYear;
        year.textContent = this.baseYear;

        // 월 표시
        const month = document.createElement("span");
        month.classList.add("month");
        month.dataset.calMonth = this.baseMonth;
        month.textContent = this.baseMonth < 9 ? "0" + (this.baseMonth + 1) : this.baseMonth + 1;

        // 월 이동 버튼
        const leftArrow = document.createElement("i");
        const rightArrow = document.createElement("i");
        leftArrow.addEventListener("click", () => this.changePrevMonth());
        rightArrow.addEventListener("click", () => this.changeNextMonth());
        leftArrow.classList.add("fa-solid", "fa-chevron-left", "prev");
        rightArrow.classList.add("fa-solid", "fa-chevron-right", "next");

        // 년,월,버튼 태그 div에 append
        const dateWrapper = document.createElement("div");
        dateWrapper.appendChild(leftArrow);
        dateWrapper.appendChild(year);
        dateWrapper.appendChild(month);
        dateWrapper.appendChild(rightArrow);
        div.appendChild(dateWrapper);

        // 오늘날짜 이동 버튼
        const button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("today-button");
        button.textContent = "오늘";
        button.addEventListener("click", () => this.changeCurrentMonth());
        div.appendChild(button);

        return div;
    }

    createDayOfWeeks() {
        const thead = document.createElement("thead");
        this.dayOfWeekLabel.forEach((day) => {
            const th = document.createElement("th");
            th.textContent = day;
            thead.appendChild(th);
        })

        return thead;
    }

    createDays(table) {
        const startDate = new Date(this.baseDate.getFullYear(), this.baseDate.getMonth(), 1);
        const endDate = new Date(this.baseDate.getFullYear(), this.baseDate.getMonth() + 1, 0);

        let dayCount = 1;
        const calYear = Number(this.wrapper.querySelector(".year").dataset.calYear);
        const calMonth = Number(this.wrapper.querySelector(".month").dataset.calMonth);
        const tbody = document.createElement("tbody");

        if(startDate.getDay() > 0) {
            // 첫주 - 이전 달 포함하여 표시
            const tr = document.createElement("tr");

            let prevMonthStartDay = new Date(startDate.getFullYear(), startDate.getMonth(), -startDate.getDay()).getDate() + 1;
            for(let i = startDate.getDay(); i > 0; i--) {
                const td = document.createElement("td");
                td.classList.add("diff-month");
                td.textContent = prevMonthStartDay++;
                tr.appendChild(td);
            }
            for(let i = 0; i < 7 - startDate.getDay(); i++) {
                const td = document.createElement("td");
                if(this.currDay === dayCount) {
                    if(this.currYear === calYear && this.currMonth === calMonth)
                        td.classList.add("today");
                }
                td.textContent = dayCount++;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);

            // 남은 이번 달 날짜 표시
            const weeks = Math.ceil(endDate.getDate() / 7);
            for(let i = 0; i < weeks; i++) {
                if(dayCount > endDate.getDate()) break;
                const tr = document.createElement("tr");

                for(let j = 0; j < 7; j++) {
                    if(dayCount > endDate.getDate()) break;

                    const td = document.createElement("td");
                    if(this.currDay === dayCount) {
                        if(this.currYear === calYear && this.currMonth === calMonth)
                            td.classList.add("today");
                    }
                    td.textContent = dayCount++;
                    tr.appendChild(td);
                }

                tbody.appendChild(tr);
            }
            table.appendChild(tbody);

        } else {
            const weeks = Math.ceil(endDate.getDate() / 7);

            for(let i = 0; i < weeks; i++) {
                if(dayCount > endDate.getDate()) break;
                const tr = document.createElement("tr");

                for(let j = 0; j < 7; j++) {
                    if(dayCount > endDate.getDate()) break;

                    const td = document.createElement("td");
                    const span = document.createElement("span");
                    if(this.currDay === dayCount) { // 오늘 날짜 표시
                        if(this.currYear === calYear && this.currMonth === calMonth)
                            td.classList.add("today");
                    }
                    span.textContent = dayCount++;
                    span.classList.add("cal-day");

                    td.appendChild(span);
                    tr.appendChild(td);
                }

                tbody.appendChild(tr);
                table.appendChild(tbody);
            }
        }

        // 마지막주 다음 달 표시
        if(endDate.getDay() < 6) {
            const tr = tbody.querySelector("tr:last-child");

            for(let i = 1; i < 7 - endDate.getDay(); i++) {
                const td = document.createElement("td");
                td.classList.add("diff-month");
                td.textContent = i;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
            table.appendChild(tbody);
        }

        return table;
    }

    changePrevMonth() {
        let year = Number(document.querySelector(".year").dataset.calYear);
        let month = Number(document.querySelector(".month").dataset.calMonth);
        
        // month == 1, (year -= 1), (month = 12)
        // month != 1, (month -= 1)
        if(month === 1) {
            year -= 1;
            month = 12;
        } else {
            month -= 1;
        }

        this.baseDate = new Date(year, month, 1);
        this.resetBaseDateInfo();
        this.#renderCalendar();
    }

    changeNextMonth() {
        let year = Number(document.querySelector(".year").dataset.calYear);
        let month = Number(document.querySelector(".month").dataset.calMonth);
        
        // month == 12, (year += 1), (month = 1)
        // month != 12, (month += 1)
        if(month === 12) {
            year += 1;
            month = 1;
        } else {
            month += 1;
        }

        this.baseDate = new Date(year, month, 1);
        this.resetBaseDateInfo();
        this.#renderCalendar();
    }

    resetBaseDateInfo() {
        this.baseYear = this.baseDate.getFullYear();
        this.baseMonth = this.baseDate.getMonth();
        this.baseDay = this.baseDate.getDate();
    }

    changeCurrentMonth() {
        this.baseDate = this.currDate;
        this.resetBaseDateInfo();
        this.#renderCalendar();
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const c = new Calendar("#calendarWrap");
})