/*Os exercícios aqui propostos visam reforçar a prática da linguagem javascript de acordo com o que foi visto na primeira aula extra.
1) Dado um vetor de números, como poderia ser realizada a soma de todos os valores utilizando reduce.
2) Dado um vetor de números, como poderia ser realizada a soma de todos os valores pares utilizando reduce e filter.
3) Dado um vetor de números, como poderia ser realizada a soma de todos os valores ímpares utilizando reduce e filter.
4) Dado um vetor de valores, retorne um objeto com quantas vezes cada valor está presente no vetor (dica: utilize reduce)
5) Dado um vetor de valores, retorne um vetor com somente os valores únicos do vetor (aqueles que ocorrem apenas 1 vez dentro do vetor) (Dica 1: utilize reduce, filter e keys, Dica 2: escreva console.log(objeto.keys()) e veja como ele poderá te ajudar neste exercício)
6) Dado um vetor com números, retorne somente os números pares;
7) Dado um vetor com números, retorne somente os números ímpares;
8) Uma função é chamada da seguinte forma:
calculadora(10, '+', 20)
crie o corpo da função de forma que ela realize as 4 operações aritméticas
9) Modifique a calculadora do exercício anterior para que ela receba 2 números e uma função, e realize o cálculo. Exemplo:
const soma = (num1, num2) => num1+num2
const calculadoraFn = (....) => ….
calculadoraFn(10, soma, 20)*/

const values = ['a', 'b', 'c', 1, 'a', 'b']
const numbers = [10,15,20,25,30,35,40];

const sum = (number1, number2) => number1 + number2;
const minus = (number1, number2) => number1 - number2;
const times = (number1, number2) => number1 * number2;
const divide = (number1, number2) => number1 / number2;
const evenNumbers = (number) => number % 2 === 0;
const oddNumbers = (number) => number % 2 !== 0;

const result1 = numbers.reduce(sum,0);
console.log('Sum of numbers: ' + result1);

const result2 = numbers.filter(evenNumbers).reduce(sum,0);
console.log('Sum of even numbers: ' + result2);

const result3 = numbers.filter(oddNumbers).reduce(sum,0);
console.log('Sum of odd numbers: ' + result3);

//result4
const howManyTimes = (agg, val) => {
    if(!agg[val]){        
        agg[val] = {
            value : val,
            occur: 0
        };
    }
    agg[val].occur = agg[val].occur + 1;    
    return agg;
}
const result4 =  values.reduce(howManyTimes,{});
console.log(result4);

//result5
const isUnique = key => result4[key].occur === 1;
const unique = Object.keys(result4).filter(isUnique);
const result5 = unique.map(val => result4[val].value);
console.log(result5);

const result6 = numbers.filter(evenNumbers);
console.log('Even numbers: ' + result6);

const result7 = numbers.filter(oddNumbers);
console.log('Odd numbers: ' + result7);

const calculadoraFn = (number1, operatorFn, number2) =>{
    return operatorFn(number1,number2);
}

const result8_9 = calculadoraFn(10,divide,2)
console.log('Calculator: ' + result8_9);