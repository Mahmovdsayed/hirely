const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export const calculateDuration = (
  startDate: string,
  endDate: string,
  isCurrent: boolean,
) => {
  const start = new Date(startDate);
  const end = isCurrent ? new Date() : new Date(endDate);
  const months = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30),
  );
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0 && remainingMonths > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`;
  } else if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  } else {
    return `${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`;
  }
};
