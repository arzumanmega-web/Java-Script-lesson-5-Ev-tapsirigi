const gamearr = document.querySelector("#calendarGovde");
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

function tarixResponse() {
    const monthArr = [];
    const month = document.querySelector("#month");
    const year = document.querySelector("#year");
    let date = new Date(`${month.value}-1-${year.value}`);
    let monthInfo = [];
    if (date.getMonth() + 1 == month.value && date.getFullYear() == year.value) {
        let counter = 1;
        while (date.getMonth() + 1 == month.value && date.getFullYear() == year.value) {
            date.setDate(counter);
            monthInfo = date.toDateString().split(" ");
            if (date.getDate() == counter) {
                let week;
                switch (monthInfo[0]) {
                    case "Mon":
                        week = 1;
                        break;
                    case "Tue":
                        week = 2;
                        break;
                    case "Wed":
                        week = 3;
                        break;
                    case "Thu":
                        week = 4;
                        break;
                    case "Fri":
                        week = 5;
                        break;
                    case "Sat":
                        week = 6;
                        break;
                    case "Sun":
                        week = 7;
                        break;
                    default:
                        break;
                }
                monthArr[counter - 1] = {
                    gun: counter,
                    hefte: week,
                    ay: monthInfo[1],
                    il: date.getFullYear(),
                    qeydGun: ""
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
        dayResult.innerHTML = note.value + `: ${monthArr[index].gun}-${monthArr[index].ay}-${monthArr[index].il}`;
        monthArr[index].qeydGun = note.value + `: ${monthArr[index].gun}-${monthArr[index].ay}-${monthArr[index].il}`;
        const teg = document.getElementById(`${index}`);
        teg.style.backgroundColor = "rgba(12, 151, 42, 0.99)";
        let noteDay = JSON.stringify(monthArr[index]);
        setCookie("calen1", `${noteDay}++`, 10000);
    } else {
        const note2 = document.querySelector("#result");
        if (note2) note2.innerHTML = "yalnis daxil etdiniz...";
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
        <div style="font-weight: bold; margin-bottom: 5px;">${monthArr[index].qeydGun}</div>
        <div>Gunu qeyde alin:</div>
        <input type="text" id="note">
        <button onclick="noteResult(${index})">Yeni qeydi tesdiq edin</button>
    `;
}

function tarixResult() {
    monthArr = tarixResponse();
    let weekCount = Math.ceil((monthArr.length + monthArr[0].hefte - 1) / 7);
    let tegCalendar = "";
    let count = 0;
    let liveTime = new Date();
    let info = liveTime.toDateString().split(" ");
    let daysResult = getCookieValue("calen1");
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
            if (i == 0 && k < monthArr[0].hefte - 1) {
                tegCalendar += `<td></td>`;
                continue;
            }

            if (monthArr[count] != undefined) {
                for (let j = 0; j < splitDate.length; j++) {
                    if (splitDate[j] != "") {
                        let dayM = JSON.parse(splitDate[j]);
                        if (dayM.il == monthArr[count].il
                            && dayM.ay == monthArr[count].ay
                            && dayM.gun == monthArr[count].gun) {
                            monthArr[count].qeydGun = dayM.qeydGun;
                        }
                    }
                }
                
                if (monthArr[count].qeydGun != "") {
                    (info[1] == monthArr[count].ay
                        && monthArr[count].il == liveTime.getFullYear()
                        && monthArr[count].gun == liveTime.getDate())
                        ? tegCalendar += `<td id="${count}" onclick="DateCheck(${count})" style="background-color: rgba(184, 8, 8, 0.99);" >${monthArr[count].gun}</td>`
                        : tegCalendar += `<td id="${count}" onclick="DateCheck(${count})" style="background-color: rgba(12, 151, 42, 0.99);" >${monthArr[count].gun}</td>`;
                } else {
                    (info[1] == monthArr[count].ay
                        && monthArr[count].il == liveTime.getFullYear()
                        && monthArr[count].gun == liveTime.getDate())
                        ? tegCalendar += `<td id="${count}" onclick="DateCheck(${count})" style="background-color: rgba(184, 8, 8, 0.99);" >${monthArr[count].gun}</td>`
                        : tegCalendar += `<td id="${count}" onclick="DateCheck(${count})" >${monthArr[count].gun}</td>`;
                }

                count++;
            } else {
                tegCalendar += `<td></td>`;
            }
        }
        tegCalendar += `</tr>`;
    }

    monthDay.innerHTML = `${monthArr[0].ay} ${monthArr[0].il}`;
    gamearr.innerHTML = tegCalendar;
}