let localMemory = localStorage.getItem('uz-tickets');
localMemory = JSON.parse(localMemory);

const table = document.querySelector('table')

if (localMemory.length>0) {
    table.style.display = 'table'
    document.querySelector('h1').textContent = 'Кошик'

    for (let i = 0; i < localMemory.length; i++) {
        const tr = document.createElement('tr')

        const tdTrainNumber = document.createElement('td')
        tdTrainNumber.textContent = localMemory[i].train;

        const tdRoute = document.createElement('td')
        tdRoute.textContent = localMemory[i].route

        const tdDate = document.createElement('td')
        tdDate.textContent = localMemory[i].date

        const tdTimeDep = document.createElement('td')
        tdTimeDep.textContent = localMemory[i].timeDep

        const tdTimeArr = document.createElement('td')
        tdTimeArr.textContent = localMemory[i].timeArr

        const tdWagon = document.createElement('td')
        tdWagon.textContent = localMemory[i].wagon

        const tdSeat = document.createElement('td')
        tdSeat.textContent = localMemory[i].seat

        const tdCost = document.createElement('td')
        tdCost.textContent = localMemory[i].cost

        tr.appendChild(tdTrainNumber)
        tr.appendChild(tdRoute)
        tr.appendChild(tdDate)
        tr.appendChild(tdTimeDep)
        tr.appendChild(tdTimeArr)
        tr.appendChild(tdWagon)
        tr.appendChild(tdSeat)
        tr.appendChild(tdCost)

        table.appendChild(tr);
    }

    const trArray = table.querySelectorAll('tr')

    for (let i = 0; i < trArray.length; i++){
        const tr = trArray[i] 

        if (tr.querySelector('td')) {
            const tdArray = tr.querySelectorAll('td');

            tdArray.forEach(td => {
                const tdFirstText = td.textContent

                td.addEventListener('mouseover', () => {
                    td.textContent = 'Видалити квиток з кошика';
                    td.style.color = 'tomato';
                    td.style.cursor = 'pointer';

                    td.addEventListener('click', () => {
                        tr.remove();

                        localMemory.splice(i - 1, 1)
                        localStorage.setItem('uz-tickets', JSON.stringify(localMemory))

                        if (localMemory.length < 1) {
                            table.style.display = 'none'
                            document.querySelector('h1').textContent = 'Кошик пустий'
                        }
                    })
                })

                td.addEventListener('mouseout', () => {
                    td.textContent = tdFirstText;
                    td.style.color = '#000';
                })
            })
        }
    }
}

else {
    table.style.display = 'none'
    document.querySelector('h1').textContent = 'Кошик пустий'
}

