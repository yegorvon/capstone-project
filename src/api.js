function seededRandom(seed) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return function () {
    s = (s * a) % m;
    return s / m;
  };
}

export function fetchAPI(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return [];

  const day = date.getDate();
  const month = date.getMonth() + 1; // 1..12
  const year = date.getFullYear();
  const seed = year * 10000 + month * 100 + day; // e.g., 20250828

  const rand = seededRandom(seed);
  const result = [];

  for (let hour = 17; hour <= 21; hour++) {
    if (rand() < 0.5) result.push(`${hour.toString().padStart(2, "0")}:00`);
    if (rand() < 0.5) result.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return result;
}

export function submitAPI(_formData) {
  return true;
}
