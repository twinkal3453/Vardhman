const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    hr = d.getHours(),
    minute = d.getMinutes();

  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return `${[year, month, day].join("-")}, ${hr}:${minute} ${ampm}`;
};

module.exports = formatDate;
