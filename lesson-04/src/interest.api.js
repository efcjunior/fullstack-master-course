//j = cit
const simpleInterest = (c, i, t) => c * i * t

const simpleInterestAmount = (c, i, t) => simpleInterest(c,i,t) + c

const compoundInterest = (c, i, t) => {
    //j = M - C
    return compoundInterestAmount(c,i,t) - c
}

//M = C * (1 +  i) ^ n​
const compoundInterestAmount = (c, i, t) => c * Math.pow((1 + i),t)

module.exports = {
    simpleInterest,
    simpleInterestAmount,
    compoundInterestAmount,
    compoundInterest
}