const selectWagon = document.querySelector('.seats__wagon')
const selectSeat = document.querySelector('.seats__seat')

const buttonSwap = document.getElementById('button-swap');

const inputDate = document.querySelector('.downside__input')
const buttonSubmit = document.getElementById('submit')
const alertSubmit = document.querySelector('.submit__alert')

const allTables = document.querySelectorAll('.table')


let trainNumber, wagonNumber, seatNumber, cost;
let routeLocation = '', routeDate = '', routeTimeDep = '', routeTimeArr = '';

let localMemory = []


function clearSelectSeat() {
    while (selectSeat.firstChild) {
        selectSeat.firstChild.remove();
    }
}
function clearSelectWagon() {
    while (selectWagon.firstChild) {
        selectWagon.firstChild.remove();
    }
}

let seats = []; // Объявляем переменную seats в глобальной области видимости

function updateSeatOptions(seatsPerWagon) {
    clearSelectSeat();
    seats = []; // Очищаем seats перед генерацией новых мест
    while (seats.length < seatsPerWagon) {
        const randomSeat = Math.floor(Math.random() * 20) + 1;
        if (!seats.includes(randomSeat)) {
            seats.push(randomSeat);
        }
    }

    seats.forEach(seat => {
        let option = document.createElement('option');
        option.textContent = seat;
        option.value = seat;
        selectSeat.appendChild(option);
    });
}






document.getElementById('popular1').onclick = function () {
    formPlaces.from.value = 'Київ';
    formPlaces.to.value = 'Львів';
}
document.getElementById('popular2').onclick = function () {
    formPlaces.from.value = 'Київ';
    formPlaces.to.value = 'Пшемисль';
}
document.getElementById('popular3').onclick = function () {
    formPlaces.from.value = 'Київ';
    formPlaces.to.value = 'Дніпро-головний';
}
document.getElementById('popular4').onclick = function () {
    formPlaces.from.value = 'Київ';
    formPlaces.to.value = 'Харків';
}
document.getElementById('popular5').onclick = function () {
    formPlaces.from.value = 'Львів';
    formPlaces.to.value = 'Пшемисль';
}



buttonSwap.onclick = function () {
    let a = formPlaces.from.value;
    formPlaces.from.value = formPlaces.to.value;
    formPlaces.to.value = a;
}



document.getElementById('hint-city1').onclick = function () {
    formPlaces.from.value = 'Київ'
}
document.getElementById('hint-city2').onclick = function () {
    formPlaces.from.value = 'Львів'
}
document.getElementById('hint-city3').onclick = function () {
    formPlaces.from.value = 'Пшемисль'
}
document.getElementById('hint-city4').onclick = function () {
    formPlaces.from.value = 'Дніпро-головний'
}
document.getElementById('hint-city5').onclick = function () {
    formPlaces.from.value = 'Одеса'
}



document.getElementById('hint-city6').onclick = function () {
    formPlaces.to.value = 'Київ'
}
document.getElementById('hint-city7').onclick = function () {
    formPlaces.to.value = 'Львів'
}
document.getElementById('hint-city8').onclick = function () {
    formPlaces.to.value = 'Пшемисль'
}
document.getElementById('hint-city9').onclick = function () {
    formPlaces.to.value = 'Дніпро-головний'
}
document.getElementById('hint-city10').onclick = function () {
    formPlaces.to.value = 'Одеса'
}





let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
if (month < 10) month = '0' + month
let day = today.getDate();
if (day < 10) day = '0' + day


formPlaces.date.value = year + '-' + month + '-' + day;

today.setDate(today.getDate() + 1);
let tomorrow = today.getDate();
today.setDate(today.getDate() + 1);
let afterTomorrow = today.getDate();

document.getElementById('hint-day1').onclick = function () {
    formPlaces.date.value = year + '-' + month + '-' + day;
}
document.getElementById('hint-day2').onclick = function () {
    formPlaces.date.value = year + '-' + month + '-' + tomorrow;
}
document.getElementById('hint-day3').onclick = function () {
    formPlaces.date.value = year + '-' + month + '-' + afterTomorrow;
}



buttonSubmit.textContent = 'Пошук поїздів на ' + day + '.' + month + '.' + year;

let submitString, submitDay, submitMonth, submitYear

inputDate.addEventListener('change', () => {
    submitString = formPlaces.date.value.toString();
    submitDay = submitString[8] + submitString[9];
    submitMonth = submitString[5] + submitString[6];
    submitYear = submitString[0] + submitString[1] + submitString[2] + submitString[3];
    buttonSubmit.textContent = 'Пошук поїздів на ' + submitDay + '.' + submitMonth + '.' + submitYear;

    if (submitString === '') {
        buttonSubmit.textContent = 'Пошук поїздів на ' + day + '.' + month + '.' + year;
    }
})



buttonSubmit.onclick = () => {
    if ((submitYear < year) || (submitMonth < month && submitYear <= year) || (submitDay < day && submitMonth <= month)) {
        alertSubmit.style.display = 'block';
        alertSubmit.textContent = 'Обрана дата вже минула'

        allTables.forEach(table => {
            table.style.display = 'none'
        })
    }

    else if (formPlaces.from.value === '' || formPlaces.to.value === '') {
        alertSubmit.style.display = 'block';
        alertSubmit.textContent = 'Заповніть усі поля'

        allTables.forEach(table => {
            table.style.display = 'none'
        })
    }

    else {
        alertSubmit.style.display = 'none';

        allTables.forEach(table => {
            table.style.display = 'none'
        })


        if (formPlaces.from.value === 'Київ') {

            if (formPlaces.to.value === 'Львів') {
                document.querySelector('.table.kyiv-lviv').style.display = 'table';

                const dateDeps = document.querySelector('.table.kyiv-lviv').querySelectorAll('.table__dep-date')
                const dateArrs = document.querySelector('.table.kyiv-lviv').querySelectorAll('.table__arr-date')

                dateDeps.forEach(span => {
                    span.textContent = day + '.' + month + '.' + year;
                    if (submitString !== undefined) {
                        span.textContent = submitDay + '.' + submitMonth + '.' + submitYear
                    }
                })
                dateArrs.forEach(span => {
                    const spanTr = span.closest('tr')
                    const times = spanTr.querySelector('.table__time').querySelectorAll('span')
                    let depDate = spanTr.querySelector('.table__dep-date').textContent


                    if (Number(times[1].textContent[0] + times[1].textContent[1]) - Number(times[0].textContent[0] + times[0].textContent[1]) < 0) {
                        if (depDate[1] === '9') {
                            span.textContent = (Number(depDate[0]) + 1) + '0' + '.' + depDate[3] + depDate[4] + depDate[5] + depDate[6] + depDate[7] + depDate[8] + depDate[9]
                        }

                        else {
                            span.textContent = depDate[0] + (Number(depDate[1]) + 1) + '.' + depDate[3] + depDate[4] + depDate[5] + depDate[6] + depDate[7] + depDate[8] + depDate[9]
                        }

                        switch (depDate[3] + depDate[4]) {
                            case '04':
                            case '06':
                            case '11':
                                if (span.textContent[0] + span.textContent[1] === '31') {
                                    span.textContent = '0' + '1' + '.' + depDate[3] + (Number(depDate[4]) + 1) + '.' + depDate[6] + depDate[7] + depDate[8] + depDate[9]
                                }
                                break;
                            case '09':
                                if (span.textContent[0] + span.textContent[1] === '31') {
                                    span.textContent = '0' + '1' + '.' + '1' + '0' + '.' + depDate[6] + depDate[7] + depDate[8] + depDate[9]
                                }
                                break;
                            case '02':
                                if (span.textContent[0] + span.textContent[1] === '29') {
                                    span.textContent = '0' + '1' + '.' + depDate[3] + (Number(depDate[4]) + 1) + '.' + depDate[6] + depDate[7] + depDate[8] + depDate[9]
                                }
                                break;
                            default:
                                if (span.textContent[0] + span.textContent[1] === '32') {
                                    span.textContent = '0' + '1' + '.' + depDate[3] + (Number(depDate[4]) + 1) + '.' + depDate[6] + depDate[7] + depDate[8] + depDate[9]
                                    if (span.textContent[3] + span.textContent[4] === '13') {
                                        span.textContent = '0' + '1' + '.' + '0' + '1' + '.' + (Number(depDate[6] + depDate[7] + depDate[8] + depDate[9]) + 1)
                                    }
                                }
                                break;
                        }
                    }

                    else {
                        span.textContent = depDate
                    }
                })


                const tableFreeArray = document.querySelector('.table.kyiv-lviv').querySelectorAll('.table__free')

                tableFreeArray.forEach(td => {
                    td.onmouseover = () => {
                        const closestSpan = td.querySelector('.free__type');

                        closestSpan.style.position = 'absolute';
                        closestSpan.style.backgroundColor = '#eaeef1';

                        switch (closestSpan.textContent) {
                            case 'C1':
                                closestSpan.textContent = 'Сидячий першого класу';
                                closestSpan.style.marginLeft = '-270px';
                                break;
                            case 'C2':
                                closestSpan.textContent = 'Сидячий другого класу';
                                closestSpan.style.marginLeft = '-261px';
                                break;
                            case 'К':
                                closestSpan.textContent = 'Купе';
                                closestSpan.style.marginLeft = '-60px';
                                break;
                            case 'П':
                                closestSpan.textContent = 'Плацкарт';
                                closestSpan.style.marginLeft = '-115px';
                                break;
                            case 'Л':
                                closestSpan.textContent = 'Люкс';
                                closestSpan.style.marginLeft = '-65px';
                                break;
                        }
                    }

                    td.onmouseout = () => {
                        const closestSpan = td.querySelector('.free__type');

                        closestSpan.style.position = '';
                        closestSpan.style.marginLeft = '';
                        closestSpan.style.backgroundColor = '';

                        switch (closestSpan.textContent) {
                            case 'Сидячий першого класу':
                                closestSpan.textContent = 'C1';
                                break;
                            case 'Сидячий другого класу':
                                closestSpan.textContent = 'C2';
                                break;
                            case 'Купе':
                                closestSpan.textContent = 'К';
                                break;
                            case 'Плацкарт':
                                closestSpan.textContent = 'П';
                                break;
                            case 'Люкс':
                                closestSpan.textContent = 'Л';
                                break;
                        }
                    }
                });



                document.querySelector('.table.kyiv-lviv').addEventListener('click', (event) => {
                    if (event.target.classList.contains('free__button')) {
                        
                        routeLocation = '';
                        routeDate = '';
                        routeTimeDep = '';
                        routeTimeArr = '';

                        let button = event.target

                        const buttonTr = button.closest('tr')
                        const freeSeatCount = Number(buttonTr.querySelector('.free__seats').textContent)
                        const seatType = buttonTr.querySelector('.free__type').textContent

                        let tdRouteLocation = buttonTr.querySelector('.table__location');
                        if (tdRouteLocation === null) tdRouteLocation = buttonTr.previousElementSibling.querySelector('.table__location')
                        tdRouteLocation.querySelectorAll('span').forEach(span => {
                            routeLocation += span.textContent + ' - ';
                        })
                        routeLocation = routeLocation.slice(0, -2)

                        let tdRouteDate = buttonTr.querySelector('.table__date')
                        if (tdRouteDate === null) {
                            tdRouteDate = buttonTr.previousElementSibling.querySelector('.table__date')
                        }
                        routeDate = tdRouteDate.querySelector('.table__dep-date').textContent

                        let tdRouteTime = buttonTr.querySelector('.table__time')
                        if (tdRouteTime === null) tdRouteTime = buttonTr.previousElementSibling.querySelector('.table__time')
                        routeTimeDep = tdRouteTime.querySelectorAll('span')[0].textContent
                        routeTimeArr = tdRouteTime.querySelectorAll('span')[1].textContent

                        let tdTrainNumber = buttonTr.querySelector('.table__number')
                        if (tdTrainNumber === null) tdTrainNumber = buttonTr.previousElementSibling.querySelector('.table__number')
                        trainNumber = tdTrainNumber.querySelector('span').textContent

                        document.querySelector('.seats').style.display = 'block'
                        document.querySelector('.table.kyiv-lviv').style.display = 'none'

                        let wagonCount, seatsPerWagon, seats, selectedWagon

                        switch (seatType) {
                            case 'Сидячий першого класу':
                                clearSelectWagon()
                                wagonCount = 3;
                                seatsPerWagon = Math.floor(freeSeatCount / wagonCount)
                                for (let i = 1; i <= wagonCount; i++) {
                                    let option = document.createElement('option')
                                    option.textContent = i;
                                    option.value = i;
                                    selectWagon.appendChild(option)
                                }
                                updateSeatOptions(seatsPerWagon);
                                selectWagon.addEventListener('change', function () {
                                    updateSeatOptions(seatsPerWagon);
                                });

                                cost = '218, 34';

                                break;

                            case 'Сидячий другого класу':
                                clearSelectWagon()
                                wagonCount = 3;
                                seatsPerWagon = Math.floor(freeSeatCount / wagonCount)
                                for (let i = 1; i <= wagonCount; i++) {
                                    let option = document.createElement('option')
                                    option.textContent = i;
                                    option.value = i;
                                    selectWagon.appendChild(option)
                                }
                                updateSeatOptions(seatsPerWagon);
                                selectWagon.addEventListener('change', function () {
                                    updateSeatOptions(seatsPerWagon);
                                });

                                cost = '451, 33'

                                break;
                            case 'Плацкарт':
                                clearSelectWagon()
                                wagonCount = 4;
                                seatsPerWagon = Math.floor(freeSeatCount / wagonCount)
                                for (let i = 1; i <= wagonCount; i++) {
                                    let option = document.createElement('option')
                                    option.textContent = i;
                                    option.value = i;
                                    selectWagon.appendChild(option)
                                }
                                updateSeatOptions(seatsPerWagon);
                                selectWagon.addEventListener('change', function () {
                                    updateSeatOptions(seatsPerWagon);
                                });

                                cost = '210, 85'

                                break;
                            case 'Купе':
                                clearSelectWagon()
                                wagonCount = 5;
                                seatsPerWagon = Math.floor(freeSeatCount / wagonCount)
                                if (seatsPerWagon < 1) seatsPerWagon = 1;
                                for (let i = 1; i <= wagonCount; i++) {
                                    let option = document.createElement('option')
                                    option.textContent = i;
                                    option.value = i;
                                    selectWagon.appendChild(option)
                                }
                                updateSeatOptions(seatsPerWagon);
                                selectWagon.addEventListener('change', function () {
                                    updateSeatOptions(seatsPerWagon);
                                });

                                cost = '541, 57'

                                break;
                            case 'Люкс':
                                clearSelectWagon()
                                wagonCount = 2;
                                seatsPerWagon = Math.floor(freeSeatCount / wagonCount)
                                for (let i = 1; i <= wagonCount; i++) {
                                    let option = document.createElement('option')
                                    option.textContent = i;
                                    option.value = i;
                                    selectWagon.appendChild(option)
                                }
                                updateSeatOptions(seatsPerWagon);
                                selectWagon.addEventListener('change', function () {
                                    updateSeatOptions(seatsPerWagon);
                                });

                                cost = '1687, 98'

                                break;
                        }
                    }
                })
            }
        }
    }
    document.querySelector('.seats__button').onclick = (event) => {
        event.preventDefault();

        wagonNumber = selectWagon.value;
        seatNumber = selectSeat.value;

        document.querySelector('.buy').style.display = 'block'

        document.querySelector('.train-info__train').textContent = 'Поїзд: ' + trainNumber
        document.querySelector('.train-info__wagon').textContent = 'Вагон: ' + wagonNumber
        document.querySelector('.train-info__seat').textContent = 'Місце: ' + seatNumber

        document.querySelector('.js-cost-span').textContent = cost + ' грн'
    }

    document.querySelector('.form__cancel').onclick = () => {
        document.querySelector('.buy').style.display = 'none';
    }

    document.querySelector('.end__button').onclick = () => {
        let isInputEmpty = false
        document.querySelectorAll('.name__input').forEach(input => {
            if (input.value === '') isInputEmpty = true
            document.querySelector('.end__message').textContent = "Уведіть прізвище та ім'я"
            document.querySelector('.end__message').style.display = 'block'
        })

        if (isInputEmpty === false) {
            document.querySelector('.end__message').textContent = 'Квиток додано до кошика'
            document.querySelector('.end__message').style.display = 'block'

            setTimeout(() => {
                document.querySelector('.end__message').textContent = ''
                document.querySelector('.end__message').style.display = 'none'
            }, 5000);
            let ticket = {
                train: trainNumber,
                route: routeLocation,
                date: routeDate,
                timeDep: routeTimeDep,
                timeArr: routeTimeArr,
                wagon: wagonNumber,
                seat: seatNumber,
                cost: cost
            }
            localMemory.push(ticket)
            localStorage.setItem('uz-tickets', JSON.stringify(localMemory))

        }
    }
}

document.querySelector('.shopping-cart').onclick = () => {
    window.open('shopping cart.html')
}

