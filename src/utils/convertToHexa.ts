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

export function convertToHexa(value: string): string{
  const isHexaLetter = Object.values(hexaValues).includes(value.toString().toUpperCase());
  if (isHexaLetter) {
    const hexaLetter = value.toString().toUpperCase();
    const hexaNumber = Object.keys(hexaValues).find(key => hexaValues[key] === hexaLetter);
    return hexaNumber as string;
  }
  return value;
}