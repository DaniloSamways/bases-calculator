import { baseInNumber } from "../baseInNumber";
import { convertToHexa } from "../convertToHexa";
import { reverseString } from "../revertString";

type hexaValuesType = {
  [key: string]: string
}

const hexaValues: hexaValuesType = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

function toHexadecimal(value: number) {
  return hexaValues[value] || value
}

export function decimalToBase(value: string | number, base: string) {
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

  if (base === 'Hexadecimal') {
    if (hexaValues[value]) {
      return {
        result: hexaValues[value],
        resolution: `1º Passo:
          Números de 10 a 15 são trocados por letras:
          10 = A
          11 = B
          12 = C
          13 = D
          14 = E
          15 = F\n\n2º Passo:
          Substitua o valor pelo seu valor correspondente:
          ${value} = ${hexaValues[value].toUpperCase()}
      `,
      }
    }
  }

  const baseValue = baseInNumber(base);

  if (typeof value === 'string') value = parseInt(value)

  const steps = [];

  var dividend = value;
  var rest: number | string;
  var result = "";

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

  const formulaStepsArray = [];

  while (true) {
    rest = Math.floor(dividend % baseValue);
    (dividend !== 0 || rest !== 0) && formulaStepsArray.push(`    ${dividend} ÷ ${baseValue} = ${Math.floor(dividend / baseValue)}  |  Sobra ${rest} ${(base === 'Hexadecimal' && rest >= 10) ? `(${toHexadecimal(rest)})` : ''}`);
    if (base === 'Hexadecimal') rest = toHexadecimal(rest)

    dividend = Math.floor(dividend / baseValue);

    if (!result) result = rest.toString();

    if (dividend === 0 && rest === 0) break

    result = result + rest;

  }

  steps.push(`
    Dividir o número ${value} pela base ${base} (${baseValue}) até que o quociente seja 0: ${formulaStepsArray.join('\n')}
  `)

  result = result.slice(1);

  steps.push(`
  Juntar os restos [${result}] e invertê-los: ${reverseString(result)}
  `)

  var resolution = ``

  for (let step in steps) {
    resolution += `${parseInt(step) + 1}º Passo: ${steps[step]} \n`
  }


  return {
    result: reverseString(result),
    resolution
  }
}