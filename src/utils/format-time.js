export function fToNow(date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = now - targetDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return 'just now';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  return targetDate.toLocaleDateString();
}