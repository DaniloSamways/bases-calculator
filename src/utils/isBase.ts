export function isBase(value: string | number, base: string): boolean {
  switch (base) {
    case 'Binário':
      return /^[0-1]+$/.test(value.toString())
    case 'Octal':
      return /^[0-7]+$/.test(value.toString())
    case 'Decimal':
      return /^[0-9]+$/.test(value.toString())
    case 'Hexadecimal':
      return /^[0-9A-F]+$/.test(value.toString().toUpperCase())
    default:
      return false
  }
}