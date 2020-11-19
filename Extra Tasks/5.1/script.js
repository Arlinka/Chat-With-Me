getDay = (date) => {
  let day = date.getDay();
  if (day == 0) day = 7;
  return day - 1;
};

createCalendar = (elem, year, month) => {
  let mon = month - 1;
  let dd = new Date(year, mon);
  let table = `<table border="1" cellspacing="0" cellpadding="3">
        <tr>
            <th colspan="7">${mon + 1}.${year}</th>
        </tr>
        <tr>
            <td>mon</td>
            <td>tues</td>
            <td>wed</td>
            <td>thurs</td>
            <td>fri</td>
            <td>sat</td>
            <td>sun</td>
        </tr>
        <tr></tr>`;
  for (let i = 0; i < getDay(dd); i++) table += "<td></td>";
  for (; dd.getMonth() == mon; dd.setDate(dd.getDate() + 1)) {
    table += "<td>" + dd.getDate() + "</td>";
    if (getDay(dd) % 7 == 6) table += "</tr><tr>";
  }
  if (getDay(dd) != 0)
    for (let i = getDay(dd); i < 7; i++) table += "<td></td>";
  table += "</tr></table>";
  document.write(table);
};
createCalendar(calendar, 2020, 11);
