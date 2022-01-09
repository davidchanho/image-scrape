export default function getCurrentDate() {
  const currentDate = new Date()
    .toLocaleString("en-us", {
      month: "long",
      year: "numeric",
      day: "numeric",
    })
    .replace(",", "")
    .split(" ");

  const day = currentDate[1];
  const month = currentDate[0];
  const year = currentDate[2];

  return {
    day,
    month,
    year,
  };
}
