export function delay(timeout) {
  return new Promise( res => setTimeout(res, timeout) );
}

export function truncateWithEllipsis(string, length) {
  if (string.length > length) 
    return string.substring(0,length)+'...'
  else
    return string
}