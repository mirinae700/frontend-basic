"use strict"

class Schedule {

    constructor(c) {
        this.c = c;
        this.modal = document.querySelector("#modal");
        this.openModalButton = document.querySelector(".open-modal");
        this.closeModalButton = document.querySelector(".close-modal");
        this.init();
    }

    init() {
        // 모달 열기, 닫기
        this.openModalButton.addEventListener("click", () => this.showAndHideScheduleModal());
        this.closeModalButton.addEventListener("click", () => this.showAndHideScheduleModal());

        // 일정유형 변경
        const scheduleType = this.modal.querySelectorAll("input[name=scheduleType]");
        scheduleType.forEach((input) => {
            input.addEventListener("click", this.selectScheduleType);
        })

        // 날짜(기간) 선택
        const date = this.modal.querySelectorAll("input[type=date]");
        date.forEach((input) => {
            input.addEventListener("change", () => {
                const dateWrap = input.closest("div");
                const startDate = dateWrap.querySelector(".start-date").value;
                const endDate = dateWrap.querySelector(".end-date").value;
                
                if(startDate !== "" && endDate !== "") {
                    if(startDate > endDate) {
                        alert("시작일이 종료일보다 늦습니다. 날짜를 확인해 주세요.");
                        input.value = "";
                        input.focus();
                    } else {
                        const period = this.modal.querySelector("input[name=period");
                        period.value = ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1) + "일";
                    }
                }
            })
        })

        // 일정 색상 선택
        const colorWrap = this.modal.querySelector(".color-wrap");
        const color = colorWrap.querySelectorAll("input[name=color]");
        color.forEach((input) => {
            input.addEventListener("change", () => {
                colorWrap.querySelector("label.selected").removeAttribute("class");
                input.closest("label").setAttribute("class","selected");
            })
        })
    }

    selectScheduleType() {
        const labelList = this.closest(".button-wrap").querySelectorAll("label");
        labelList.forEach((label) => {
            if(label.classList.contains("active")) {
                label.classList.remove("active");
            } else {
                label.classList.add("active");
            }
        })
    }

    showAndHideScheduleModal() {
        if(this.modal.classList.contains("active")) {
            this.modal.classList.remove("active");
        } else {
            this.modal.classList.add("active");
        }
    }
}