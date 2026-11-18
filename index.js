const gamearr = document.querySelector("#calendarBody");
const monthDay = document.querySelector("#monthDay");
const dayResult = document.querySelector("#dayResult");

function setCookie(key, value, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + seconds * 1000);

    let expires = "expires=" + d.toUTCString();

    document.cookie = key + "=" + getCookieValue(key) + value + ";" + expires + ";path=/";
}

function getCookieValue(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);

    let components = decodedCookie.split(';');

    for (let i = 0; i < components.length; i++) {
        let section = components[i];
        while (section.charAt(0) == " ") {
            section = section.substring(1);

            if (section.indexOf(name) == 0) {
                return section.substring(name.length, section.length);
            }
        }
    }
    return "";
}

function historyResponse() {
    const monthArr = [];
    const monthItem = document.querySelector("#monthItem");
    const yearItem = document.querySelector("#yearItem");
    let date = new Date(`${monthItem.value}-1-${yearItem.value}`);
    let monthInfo = [];
    if (date.getMonth() + 1 == monthItem.value && date.getFullYear() == yearItem.value) {
        let counter = 1;
        while (date.getMonth() + 1 == monthItem.value && date.getFullYear() == yearItem.value) {
            date.setDate(counter);
            monthInfo = date.toDateString().split(" ");
            if (date.getDate() == counter) {
                let weeks;
                switch (monthInfo[0]) {
                    case "Mon":
                        weeks = 1;
                        break;
                    case "Tue":
                        weeks = 2;
                        break;
                    case "Wed":
                        weeks = 3;
                        break;
                    case "Thu":
                        weeks = 4;
                        break;
                    case "Fri":
                        weeks = 5;
                        break;
                    case "Sat":
                        weeks = 6;
                        break;
                    case "Sun":
                        weeks = 7;
                        break;
                    default:
                        break;
                }
                monthArr[counter - 1] = {
                    day: counter,
                    week: weeks,
                    month: monthInfo[1],
                    year: date.getFullYear(),
                    noteDay: ""
                };
                counter++;
            }
        }
        return monthArr;
    }
    return monthArr;
}

var monthArr;

function noteResult(index) {
    const note = document.querySelector("#note");

    if (note.value) {
        dayResult.innerHTML = note.value + `: ${monthArr[index].day}-${monthArr[index].month}-${monthArr[index].year}`;
        monthArr[index].noteDay = note.value + `: ${monthArr[index].day}-${monthArr[index].month}-${monthArr[index].year}`;
        const teg = document.getElementById(`${index}`);
        teg.style.backgroundColor = "rgba(12, 151, 42, 0.99)";
        let noteDay2 = JSON.stringify(monthArr[index]);
        setCookie("calendarCookie", `${noteDay2}++`, 10000);
    } else {
        const note2 = document.querySelector("#result");
        if (note2) note2.innerHTML = "Incorrect entry...";
    }
}

function DateCheck(index) {
    for (let i = 0; i < monthArr.length; i++) {
        const teg = document.getElementById(`${i}`);
        if (teg && teg.style.backgroundColor == "rgba(233, 182, 74, 0.99)") {
            teg.style.backgroundColor = "";
        }
    }
    const note2 = document.querySelector("#result");
    const teg = document.getElementById(`${index}`);
    if (teg && teg.style.backgroundColor == "") {
        teg.style.backgroundColor = "rgba(233, 182, 74, 0.99)";
    }
    if (note2) note2.innerHTML = "";
    

    dayResult.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">${monthArr[index].noteDay}</div>
        <div>Record the day:</div>
        <input type="text" id="note">
        <button onclick="noteResult(${index})">Confirm the new entry</button>
    `;
}

function historyResult() {
    monthArr = historyResponse();
    let weekCount = Math.ceil((monthArr.length + monthArr[0].week - 1) / 7);
    let tegCalendar = "";
    let count = 0;
    let liveTime = new Date();
    let info = liveTime.toDateString().split(" ");
    let daysResult = getCookieValue("calendarCookie");
    let splitDate = daysResult.split("++");
    
    for (let i = 0; i < weekCount; i++) {
        let weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        if (i == 0) {
            tegCalendar += `<tr>`;
            for (let k = 0; k < 7; k++) {
                tegCalendar += `<td>${weeks[k]}</td>`;
            }
            tegCalendar += `</tr>`;
        }

        tegCalendar += `<tr>`;

        for (let k = 0; k < 7; k++) {
            if (i == 0 && k < monthArr[0].week - 1) {
                tegCalendar += `<td></td>`;
                continue;
            }

            if (monthArr[count] != undefined) {
                for (let j = 0; j < splitDate.length; j++) {
                    if (splitDate[j] != "") {
                        let dayM = JSON.parse(splitDate[j]);
                        if (dayM.year == monthArr[count].year
                            && dayM.month == monthArr[count].month
                            && dayM.day == monthArr[count].day) {
                            monthArr[count].noteDay = dayM.noteDay;
                        }
                    }
                }
                                
                if (monthArr[count].noteDay != "") {
                    (info[1] == monthArr[count].month
                        && monthArr[count].year == liveTime.getFullYear()
                        && monthArr[count].day == liveTime.getDate())
                        ? tegCalendar += `<td id="${count}" onclick="DateCheck(${count})" style="background-color: rgba(184, 8, 8, 0.99);" >${monthArr[count].day}</td>`
                        : tegCalendar += `<td id="${count}" onclick="DateCheck(${count})" style="background-color: rgba(12, 151, 42, 0.99);" >${monthArr[count].day}</td>`;
                } else {
                    (info[1] == monthArr[count].month
                        && monthArr[count].year == liveTime.getFullYear()
                        && monthArr[count].day == liveTime.getDate())
                        ? tegCalendar += `<td id="${count}" onclick="DateCheck(${count})" style="background-color: rgba(184, 8, 8, 0.99);" >${monthArr[count].day}</td>`
                        : tegCalendar += `<td id="${count}" onclick="DateCheck(${count})" >${monthArr[count].day}</td>`;
                }

                count++;
            } else {
                tegCalendar += `<td></td>`;
            }
        }
        tegCalendar += `</tr>`;
    }

    monthDay.innerHTML = `${monthArr[0].month} ${monthArr[0].year}`;
    gamearr.innerHTML = tegCalendar;
}