export const formatDate = (date: string) => {
  const d = new Date(date);

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

export const formatDateAndTime = (isoString: string) => {
  if (!isoString) return '';

  const date = new Date(isoString);

  return date.toLocaleString('en-US', {
    timeZone: 'Africa/Lagos',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
