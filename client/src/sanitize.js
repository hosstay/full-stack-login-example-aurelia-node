//input: the string to sanitize
//id: the id of the input element the string came from
//er_id: the id of the element to output the error to
//length: the allowable length of the string
module.exports.sanitize = function(input, id, err_id, minLength, maxLength){
  if(!input){
    document.getElementById(err_id).innerHTML = id + " field empty";
    document.getElementById(id).focus();
    return false;
  } else{
    if(input.length < minLength || input.length > maxLength){
      document.getElementById(err_id).innerHTML = id + " field must be between " + minLength + " and " + maxLength + " characters.";
      document.getElementById(id).focus();
      return false;
    } else {
      return encodeURIComponent(input);
    }
  }
}