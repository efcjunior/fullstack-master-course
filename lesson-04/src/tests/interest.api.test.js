const api = require('../interest.api')

test('simpleInterest', () => {
    const result = api.simpleInterest(100,0.10,1)    
    expect(result).toBe(10)
})

test('simpleInterestAmount', () => {
    const result = api.simpleInterestAmount(100,0.10,1)    
    expect(result).toBe(110)
})

test('compoundInterestAmount', () => {
    const result = api.compoundInterestAmount(100,0.10,1)
    expect(result).toBe(111)
})

test('compoundInterest', () => {
    const result = api.compoundInterest(100,0.10,1)
    expect(result).toBe(11)
})