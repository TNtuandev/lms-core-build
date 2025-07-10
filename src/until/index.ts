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