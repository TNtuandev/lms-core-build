export function formatToVietnameseMonthYear(isoDate: string): string {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1; // getMonth() trả về 0–11
  const year = date.getFullYear();
  return `Tháng ${month}/${year}`;
}

export function formatToHourUnit(seconds: number): string {
  const hours = (seconds / 3600).toFixed(1); // giữ 1 số sau dấu phẩy
  return `${hours} Giờ`;
}

export function formatDateToCustomString(isoString: string): string {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() trả về 0–11
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0h => 12am
  const hourStr = hours.toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hourStr}:${minutes} ${ampm}`;
}