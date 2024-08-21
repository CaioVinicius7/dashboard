export function capitalizeFirstLetters(text: string) {
  return text
    .split(" ")
    .map((word) =>
      word.length > 2
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word
    )
    .join(" ");
}
