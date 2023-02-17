import { baseInNumber } from "../baseInNumber"
import { reverseString } from "../revertString"
import { convertToHexa } from "../convertToHexa"

function returnFormula(valuesArray: string[], baseValue: number): string {
  let formula = ''

  for (let i = 0; i < valuesArray.length; i++) {
    formula += `${valuesArray[i]} × ${baseValue}<sup>${i}</sup>`

    if (i !== valuesArray.length - 1) formula += '   +   '
  }

  return formula
}

export function basesToDecimal(value: number | string, base: string) {
  if (value.toString() === "0") {
    switch (base) {
      case 'Hexadecimal':
        return {
          resolution: `1º Passo:
          Números de 0 a 9 não mudam: ${value}\n
          `,
          result: value,
        }
      case 'Octal':
        return {
          resolution: `1º Passo:
          Números de 0 a 7 não mudam: ${value}\n
          `,
          result: value,
        }
      case 'Binário':
        return {
          resolution: `1º Passo:
          Números de 0 a 1 não mudam: ${value}\n
          `,
          result: value,
        }
    }
  }


  if (value.toString().length === 1 && base === 'Hexadecimal') {
    const letter = value;
    value = parseInt(convertToHexa(value.toString()))

    if (value < 10) {
      return {
        resolution: `1º Passo:
          Números de 0 a 9 não mudam: ${value}\n
      `,
        result: value,
      }
    }

    return {
      resolution: `1º Passo:
        Números de 10 a 15 são trocados por letras:
        10 = A
        11 = B
        12 = C
        13 = D
        14 = E
        15 = F\n\n2º Passo:
        Substitua a letra pelo seu valor correspondente:
        ${letter.toString().toUpperCase()} = ${convertToHexa(value.toString())}
    `,
      result: value,
    }
  }


  if (typeof value === 'string' && base !== 'Hexadecimal') value = parseInt(reverseString(value))
  var result = 0;
  var steps: string[] = [];
  const baseValue = baseInNumber(base);

  const valueInArray = value.toString().split('');

  if (base === "Hexadecimal") {
    for (let index of valueInArray) {
      if (isNaN(parseInt(index))) {
        const hexaValue = parseInt(convertToHexa(index));
        valueInArray[valueInArray.indexOf(index)] = hexaValue.toString();
      }
    }
    valueInArray.reverse();
  }

  steps.push(`
    Conhecer a formula: N = d₁ß⁰ + d₂ß¹ + ...
    d₁, d₂ = dígitos do número
    ß = base numérica (${base} = ${baseValue})
  `)

  steps.push(`
    Inverta a ordem dos dígitos do número:
    ${base === 'Hexadecimal' ? reverseString(value.toString()) : value}
  `)

  if (base === 'Hexadecimal') {
    steps.push(`Números de 10 a 15 são trocados por letras:
      10 = A
      11 = B
      12 = C
      13 = D
      14 = E
      15 = F
  `)
  }

  steps.push(`
    Substituir os valores na formula:
    N = ${returnFormula(valueInArray, baseValue)}
  `)

  const formulaStepsArray = [];

  for (let i = 0; i < value.toString().length; i++) {
    let localResult = parseInt(valueInArray[i]) * (Math.pow(baseValue, i))
    result += localResult

    formulaStepsArray.push(localResult.toString())
  }

  if (formulaStepsArray.length > 1) {
    steps.push(`
    Somar todos os valores:
    N = ${formulaStepsArray.join('   +   ')}
    N = ${result}
    `)
  } else {
    steps.push(`
    Resolva o cálculo e obtenha o resultado:
    N = ${result}
    `)
  }


  var resolution = ``

  for (let step in steps) {
    resolution += `${parseInt(step) + 1}º Passo: ${steps[step]} \n`
  }



  return {
    result,
    resolution
  }
}