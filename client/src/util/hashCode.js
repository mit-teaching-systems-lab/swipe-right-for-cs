// from https://docs.oracle.com/javase/7/docs/api/java/lang/String.html
function hashCode (str){
  var value = 0;
  var power = 1;
  var length = str.length;
  for (var i = 0; i < length; i++) {
    power = Math.pow(31, length - 1 - i);
    value = value + (str.charCodeAt(i)) * power;
    value = value & value; // Convert to 32bit integer
  }
  return value;
}

export default hashCode;