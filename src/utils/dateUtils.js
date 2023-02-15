function getCurrentDate() {
  const dateOptions = { weekday: "long", day: "numeric", month: "long" };
  const today = new Date();
  const currentDate = today.toLocaleDateString("en-US", dateOptions);
  return currentDate;
}

export default getCurrentDate;
