'use strict';
/* global CryptoJS:false */
/* global vkbeautify:false */
/* exported getHashAndSalt */
/* exported viewPage */
/* exported isValidMSISDN */
/* exported returnContentType */
/* exported beautifyIndent */

function getHashAndSalt(stringToBeHashed) {
  var salt = CryptoJS.lib.WordArray.random(16).toString();
  var sha512 = CryptoJS.algo.SHA512.create();
  sha512.update(salt);
  sha512.update(stringToBeHashed);
  var hash = sha512.finalize();
  return  {
    hash: hash.toString(CryptoJS.enc.Hex),
    salt: salt,
    algorithm: 'sha512'
  };
}


//location provider
function viewPage(path) {
  var url = window.location.href+path;
  window.location = url;
}

function isValidMSISDN(inputtxt){
  if ( inputtxt ){
    var numRegex = /^([1-9]\d{1})([0-9]{3,13})$/;
    if ( inputtxt.match(numRegex) ){
      return true;
    } else {
      return false;
    }
  }
}



function returnContentType( objectHeaders ){

  var contentType = '';

  if ( objectHeaders['Content-Type'] ){
    contentType = objectHeaders['Content-Type'];
  }else if ( objectHeaders['content-type'] ){
    contentType = objectHeaders['content-type'];
  }

  return contentType;

}

function beautifyIndent(type, content){

  if ( type.indexOf('text/xml') >= 0 || type.indexOf('application/xml') >= 0 ){
    return { lang: 'xml', content: vkbeautify.xml(content, 2 ) };
  }

  if ( type.indexOf('text/json') >= 0 || type.indexOf('application/json') >= 0 ){
    return { lang: 'json', content: vkbeautify.json(content, 2 ) };
  }

  if ( type.indexOf('text/html') >= 0 || type.indexOf('application/html') >= 0 ){
    return { lang: 'html', content: vkbeautify.xml(content, 2 ) };
  }

  // {anything}application/{word characters}+xml{anything}.
  if( /.*application\/\w+\+xml.*/.test(type) ){
    return { lang: 'xml', content: vkbeautify.xml(content, 2 ) };
  }

  // if not applicable then return as is
  return { lang: '', content: content};

}