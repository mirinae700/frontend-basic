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
        this.baseMonth = this.baseDate.getMonth() + 1;
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
        this.wrapper.appendChild(this.createYearAndMonth()); // 월 표시
        table.appendChild(this.createDayOfWeeks()); // 달력 요일 헤더 표시
        this.wrapper.appendChild(this.createDays(table)); // 날짜 표시
    }
    
    createYearAndMonth() {
        const div = document.createElement("div");
        div.classList.add("cal-title");

        const year = document.createElement("span");
        year.classList.add("year");
        year.dataset.calYear = this.baseYear;
        year.textContent = this.baseYear;

        const month = document.createElement("span");
        month.classList.add("month");
        month.dataset.calMonth = this.baseMonth - 1;
        month.textContent = this.baseMonth < 10 ? "0" + this.baseMonth : this.baseMonth;

        // 월 이동 버튼
        const leftArrow = document.createElement("i");
        leftArrow.addEventListener("click", () => this.prevMonth());
        leftArrow.classList.add("fa-solid", "fa-chevron-left", "prev");

        const rightArrow = document.createElement("i");
        rightArrow.addEventListener("click", () => this.nextMonth());
        rightArrow.classList.add("fa-solid", "fa-chevron-right", "next");
        
        div.appendChild(leftArrow);
        div.appendChild(year);
        div.appendChild(month);
        div.appendChild(rightArrow);

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
        const sDate = new Date(this.baseDate.getFullYear(), this.baseDate.getMonth(), 1);
        const eDate = new Date(this.baseDate.getFullYear(), this.baseDate.getMonth() + 1, 0);

        let dayCount = 1;
        const tbody = document.createElement("tbody");

        if(sDate.getDay() > 0) {
            // 첫주 - 이전 달 포함하여 표시
            const tr = document.createElement("tr");

            let prevMonthStartDay = new Date(sDate.getFullYear(), sDate.getMonth(), -sDate.getDay()).getDate() + 1;
            for(let i = sDate.getDay(); i > 0; i--) {
                const td = document.createElement("td");
                td.classList.add("diff-month");
                td.textContent = prevMonthStartDay++;
                tr.appendChild(td);
            }
            for(let i = 0; i < 7 - sDate.getDay(); i++) {
                const td = document.createElement("td");
                
                if(this.currDay === dayCount) {
                    const currDate = new Date();
                    if(currDate === this.currDate) td.classList.add("today");
                }

                td.textContent = dayCount++;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);

            // 남은 이번 달 날짜 표시
            const weeks = Math.ceil(eDate.getDate() / 7);
            for(let i = 0; i < weeks; i++) {
                if(dayCount > eDate.getDate()) break;
                const tr = document.createElement("tr");

                for(let j = 0; j < 7; j++) {
                    if(dayCount > eDate.getDate()) break;

                    const td = document.createElement("td");
                    
                    if(this.currDay === dayCount) {
                        const currDate = new Date();
                        if(currDate === this.currDate) td.classList.add("today");
                    }

                    td.textContent = dayCount++;
                    tr.appendChild(td);
                }

                tbody.appendChild(tr);
            }
            table.appendChild(tbody);

        } else {
            const weeks = Math.ceil(eDate.getDate() / 7);

            for(let i = 0; i < weeks; i++) {
                if(dayCount > eDate.getDate()) break;
                const tr = document.createElement("tr");

                for(let j = 0; j < 7; j++) {
                    if(dayCount > eDate.getDate()) break;

                    const td = document.createElement("td");
                    
                    if(this.currDay === dayCount) {
                        const currDate = new Date();
                        if(currDate === this.currDate) td.classList.add("today");
                    }

                    td.textContent = dayCount++;
                    tr.appendChild(td);
                }

                tbody.appendChild(tr);
                table.appendChild(tbody);
            }
        }

        // 마지막주 다음 달 표시
        if(eDate.getDay() < 6) {
            const tr = tbody.querySelector("tr:last-child");

            for(let i = 1; i < 7 - eDate.getDay(); i++) {
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

    prevMonth() {
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

    nextMonth() {
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
        this.baseMonth = this.baseDate.getMonth() + 1;
        this.baseDay = this.baseDate.getDate();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const c = new Calendar("#calendarWrap");
})