function reverseString(str: string) {
  return str.split("").reverse().join("");
}

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
  let baseValue = 0;
  switch (base) {
    case 'Binário':
      baseValue = 2
      break
    case 'Octal':
      baseValue = 8
      break
    case 'Hexadecimal':
      baseValue = 16
      break
  }

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
      15 = F`)
  }

  while (true) {
    rest = Math.floor(dividend % baseValue);
    (dividend !== 0 || rest !== 0) && steps.push(`${dividend} ÷ ${baseValue} = ${Math.floor(dividend / baseValue)}  |  Sobra ${rest} ${(base === 'Hexadecimal' && rest >= 10) ? `(${toHexadecimal(rest)})` : ''}`);
    if (base === 'Hexadecimal') rest = toHexadecimal(rest)

    dividend = Math.floor(dividend / baseValue);

    if (!result) result = rest.toString();

    if (dividend === 0 && rest === 0) break

    result = result + rest;

  }

  result = result.slice(1);
  steps.push(`Juntar os restos [${result}] e invertê-los: ${reverseString(result)}`)

  var resolution = ``

  for (let step in steps) {
    resolution += `${parseInt(step) + 1}º Passo: ${steps[step]} \n`
  }


  return {
    result: reverseString(result),
    resolution
  }
}