function calc(
  yearPercent,
  term,
  initialAmount,
  arrMonthlyRefill
) {
  const response = {
    accAmount: 0,
    amount: 0,
    accPercent: 0,
    history: [],
  }
  const monthlyPercent = yearPercent / 12

  let
    accAmount = initialAmount,
    accPercent = 0,
    amount = initialAmount


  for (let t = 0; t < term; t += 1) {
    if (arrMonthlyRefill.length > 0 && t !== 0) {
      accAmount += arrMonthlyRefill[t-1]
    }

    const percent = getPercentValue(accAmount, monthlyPercent)
    const start = accAmount

    accAmount += percent
    accPercent += percent

    response.history.push({
      month: t+1,
      startSum: start,
      percentOfPeriod: accPercent,
      endSum: accAmount
    })
  }

  response.accAmount = accAmount
  response.amount = amount
  response.accPercent = accPercent

  return response
}

function getPercentValue(value, percent) {
  return (value / 100) * percent
}
