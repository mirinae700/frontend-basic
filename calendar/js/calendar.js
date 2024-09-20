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

        this.selectedDate = this.currDate;

        this.dayOfWeekLabel = ["일", "월", "화", "수", "목", "금", "토"];

        this.#init();
    }

    #init() {
        this.#renderCalendar();

        // 일정 영역 오늘날짜 표시
        this.displaySelectedDate();
    }

    #renderCalendar() {
        if(this.wrapper.querySelector(".calendar table")) {
            this.wrapper.replaceChildren(); // 기존 table 삭제
        }

        const table = document.createElement("table");
        this.wrapper.appendChild(this.createCalendarHeader()); // 캘린더 헤더 표시
        table.appendChild(this.createDayOfWeeks()); // 달력 요일 표시
        this.wrapper.appendChild(this.createDays(table)); // 날짜 표시

        // 캘린더 날짜 클릭 이벤트
        this.wrapper.querySelector("table").addEventListener(
            "click", (event) => this.selectDate(event), true);
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
        button.addEventListener("click", () => this.changeCurrentDate());
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

        this.dayCount = 1;
        const tbody = document.createElement("tbody");

        if(startDate.getDay() > 0) {
            // 첫주 - 이전 달 포함하여 표시
            const tr = document.createElement("tr");

            let prevMonthStartDay = new Date(startDate.getFullYear(), startDate.getMonth(), -startDate.getDay() + 1).getDate();

            for(let i = startDate.getDay(); i > 0; i--) {
                const td = document.createElement("td");
                td.classList.add("diff-month");
                td.dataset.calMonth = startDate.getMonth() - 1;
                td.dataset.calDay = prevMonthStartDay;

                // 선택 날짜 표시
                const calYear = Number(this.wrapper.querySelector(".year").dataset.calYear);
                const calMonth = Number(this.wrapper.querySelector(".month").dataset.calMonth) - 1;
                if(this.selectedDate.getDate() === prevMonthStartDay) {
                    if(this.currYear === calYear && this.selectedDate.getMonth() === calMonth)
                        td.classList.add("active");
                }

                td.textContent = prevMonthStartDay++;
                tr.appendChild(td);
            }

            for(let i = 0; i < 7 - startDate.getDay(); i++) {
                if(this.dayCount > endDate.getDate()) break;
                    tr.appendChild(this.createDay());
            }

            tbody.appendChild(tr);

            // 남은 이번 달 날짜 표시
            const weeks = Math.ceil(endDate.getDate() / 7);
            for(let i = 0; i < weeks; i++) {
                if(this.dayCount > endDate.getDate()) break;
                const tr = document.createElement("tr");

                for(let j = 0; j < 7; j++) {
                    if(this.dayCount > endDate.getDate()) break;
                    tr.appendChild(this.createDay());
                }

                tbody.appendChild(tr);
            }
            table.appendChild(tbody);

        } else {
            const weeks = Math.ceil(endDate.getDate() / 7);

            for(let i = 0; i < weeks; i++) {
                if(this.dayCount > endDate.getDate()) break;
                const tr = document.createElement("tr");

                for(let j = 0; j < 7; j++) {
                    if(this.dayCount > endDate.getDate()) break;
                    tr.appendChild(this.createDay());
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
                td.dataset.calMonth = this.baseDate.getMonth() + 1;
                td.dataset.calDay = i;
                td.textContent = i;
                tr.appendChild(td);

                // 선택 날짜 표시
                const calYear = Number(this.wrapper.querySelector(".year").dataset.calYear);
                const calMonth = Number(this.wrapper.querySelector(".month").dataset.calMonth) + 1;
                if(this.selectedDate.getDate() === i) {
                    if(this.currYear === calYear && this.selectedDate.getMonth() === calMonth)
                        td.classList.add("active");
                }
            }
            tbody.appendChild(tr);
            table.appendChild(tbody);
        }

        return table;
    }

    createDay() {
        const calYear = Number(this.wrapper.querySelector(".year").dataset.calYear);
        const calMonth = Number(this.wrapper.querySelector(".month").dataset.calMonth);

        const td = document.createElement("td");
        const span = document.createElement("span");

        if(this.currDay === this.dayCount) { // 오늘 날짜 표시
            if(this.currYear === calYear && this.currMonth === calMonth)
                td.classList.add("today");
        }
        if(this.selectedDate.getDate() === this.dayCount) { // 선택 날짜 표시
            if(this.currYear === calYear && this.selectedDate.getMonth() === calMonth)
                td.classList.add("active");
        }

        td.dataset.calMonth = calMonth;
        td.dataset.calDay = this.dayCount;

        span.textContent = this.dayCount++;
        span.classList.add("cal-day");

        td.appendChild(span);

        return td;
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

    changeCurrentDate() {
        this.selectedDate = this.currDate;
        this.baseDate = this.currDate;
        this.resetBaseDateInfo();
        this.#renderCalendar();

        this.displaySelectedDate();
    }

    selectDate(event) {
        const target = event.target;
        this.selectedDate = new Date(this.baseYear, target.dataset.calMonth, target.dataset.calDay);
        
        if(target.tagName.toLowerCase() === "td") {
            const active = document.querySelector("td.active");
            if(active) {
                active.classList.remove("active");
            }
            target.classList.add("active");

            this.displaySelectedDate();
        }
    }

    displaySelectedDate() {
        const selectedDateArea = document.querySelector("#selectedDate");
        const content = `${this.baseYear}년 
                        ${this.selectedDate.getMonth() < 9 ? "0" + (this.selectedDate.getMonth() + 1) : this.selectedDate.getMonth() + 1}월 
                        ${this.selectedDate.getDate() < 10 ? "0" + this.selectedDate.getDate() : this.selectedDate.getDate()}일 
                        (${this.dayOfWeekLabel[this.selectedDate.getDay()]})`;
        selectedDateArea.textContent = content;
    }
}