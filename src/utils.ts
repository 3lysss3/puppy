export function formatDate(value: string) {
  if (!value) return "未设置";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function todayValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60_000;
  return new Date(today.getTime() - offset).toISOString().slice(0, 10);
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function petAge(birthday: string) {
  if (!birthday) return "待补充";
  const start = new Date(`${birthday}T00:00:00`);
  const now = new Date();
  const months = Math.max(
    0,
    (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth(),
  );
  if (months < 12) return `${months} 个月`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest ? `${years} 岁 ${rest} 个月` : `${years} 岁`;
}
