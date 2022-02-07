const
  form = document.getElementById('form'),
  refillContainer = document.getElementById('refillContainer'),
  differentAmountsContainer = document.getElementById('differentAmountsContainer'),
  differentAmountElementsContainer = differentAmountsContainer.querySelector('tbody'),
  Fields = {
    yearPercent: 'yearPercent', // годовой процент
    term: 'term', // срок
    initialAmount: 'initialAmount', // Изначальная сумма
    isRefill: 'isRefill', // пополнение
    monthlyRefill: 'monthlyRefill', // сумма ежемесячного пополнения
    replenishmentWithDifferentAmounts: 'replenishmentWithDifferentAmounts', // пополнения на разную сумму
    monthsRefill: 'monthsRefill', // разные пополнения
  }

const
  resultSumWithoutPercentElement = document.getElementById('resultSumWithoutPercent'),
  resultPercentElement = document.getElementById('resultPercent'),
  resultSumElement = document.getElementById('resultSum'),
  historyTable = document.getElementById('historyTable')


function changeForm() {
  normalizeFieldForm()

  let arrMonthlyRefill = []

  if (form[Fields.replenishmentWithDifferentAmounts].checked) {
    arrMonthlyRefill = Array.from(differentAmountElementsContainer.childNodes)
      .map(ec => +ec.querySelector('.form-control').value)
  } else if (form[Fields.isRefill].checked) {
    arrMonthlyRefill = new Array(+form[Fields.term].value - 1).fill(+form[Fields.monthlyRefill].value)
  }

  console.log(arrMonthlyRefill)

  const {
    accAmount,
    accPercent,
    amount,
    history
  } = calc(
    +form[Fields.yearPercent].value,
    +form[Fields.term].value,
    +form[Fields.initialAmount].value,
    arrMonthlyRefill,
  )

  resultSumWithoutPercentElement.innerText = amount.toFixed(2)
  resultPercentElement.innerText = accPercent.toFixed(2)
  resultSumElement.innerText = accAmount.toFixed(2)

  historyTable.innerHTML = history.map(h => `<tr><td>${h.month}</td><td>${h.startSum.toFixed(2)}</td><td>${h.percentOfPeriod.toFixed(2)}</td><td>${h.endSum.toFixed(2)}</td></tr>`).join('')
}

function defaultForms() {
  form[Fields.yearPercent].value = 1
  form[Fields.term].value = 12
  form[Fields.initialAmount].value = 1000
  form[Fields.isRefill].checked = false
  form[Fields.monthlyRefill].value = 0
  form[Fields.replenishmentWithDifferentAmounts].value = false

  changeForm()
}

function normalizeFieldForm() {
  // если отмечено пополнение
  if (form[Fields.isRefill].checked) {
    refillContainer.style.display = 'block'
    // если пополнение на разные суммы
    if (form[Fields.replenishmentWithDifferentAmounts].checked) {
      differentAmountsContainer.style.display = 'block'

      if (Array.from(differentAmountElementsContainer.childNodes).length === 0) {
        differentAmountElementsContainer.innerHTML = new Array(+form[Fields.term].value - 1)
          .fill(form[Fields.monthlyRefill].value)
          .map((e, i) => `<tr><th>${i+2}</th><td><input type="number" class="form-control" value="${e}" /></td></tr>`)
          .join('')
      }
    } else {
      differentAmountsContainer.style.display = 'none'
      differentAmountElementsContainer.innerHTML = ''
    }
  }
  else {
    refillContainer.style.display = 'none'
  }
}


form.addEventListener('change', changeForm)
defaultForms()
