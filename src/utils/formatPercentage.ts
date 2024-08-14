export function formatPercentage(value: number, showNegative = true) {
  const formattedValue = showNegative
    ? `${value.toFixed(2)}%`
    : `${Math.abs(value).toFixed(2)}%`;

  return formattedValue;
}
