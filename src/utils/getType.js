export function getType(val) {
  let result;
  if (typeof val === 'object') {
    result = Array.isArray(val) ? 'array' : 'object';
  }
  result = typeof val;
  return result;
}
