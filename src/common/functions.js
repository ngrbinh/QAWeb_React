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