const formatDate = (date) => {
  const d = date instanceof Date ? date : new Date(date);

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default formatDate;
