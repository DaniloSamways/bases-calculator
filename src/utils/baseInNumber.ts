export function baseInNumber(base: string): number {
  let baseValue = 0;
  switch (base) {
    case 'Decimal':
      baseValue = 10
      break
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

  return baseValue
}