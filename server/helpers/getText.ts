export default function getText(
  text: string[],
  start: string,
  end: string,
  startOffset: number = 1
) {
  const textStart = text.indexOf(start) + startOffset;
  const textEnd = text.indexOf(end);

  return text.slice(textStart, textEnd).join(" ");
}
