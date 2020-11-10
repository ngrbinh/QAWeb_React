export function delay(timeout) {
  return new Promise( res => setTimeout(res, timeout) );
}

export function truncateWithEllipsis(string, length) {
  if (string.length > length) 
    return string.substring(0,length)+'...'
  else
    return string
}

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const DayInMonth = (m, y) => {
  switch (m) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      if (y % 4 !== 0) return 28;
      if (y % 400 === 0) return 29;
      if (y % 100 === 0) return 28;
      return 29;
  }
}