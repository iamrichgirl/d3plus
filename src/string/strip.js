//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Removes all non ASCII characters
//------------------------------------------------------------------------------
module.exports = function(str) {

  var removed = [ "!","@","#","$","%","^","&","*","(",")",
                  "[","]","{","}",".",",","/","\\","|",
                  "'","\"",";",":","<",">","?","=","+"]

  var diacritics = [
      [/[\300-\306]/g, "A"],
      [/[\340-\346]/g, "a"],
      [/[\310-\313]/g, "E"],
      [/[\350-\353]/g, "e"],
      [/[\314-\317]/g, "I"],
      [/[\354-\357]/g, "i"],
      [/[\322-\330]/g, "O"],
      [/[\362-\370]/g, "o"],
      [/[\331-\334]/g, "U"],
      [/[\371-\374]/g, "u"],
      [/[\321]/g, "N"],
      [/[\361]/g, "n"],
      [/[\307]/g, "C"],
      [/[\347]/g, "c"],
  ];

  str += ""

  return ""+str.replace(/[^A-Za-z0-9\-_]/g, function(chr) {

    if (" " == chr) {
      return "_"
    }
    else if (removed.indexOf(chr) >= 0) {
      return ""
    }

    var ret = chr;
    for ( var d in diacritics ) {

      if (diacritics[d][0].test(chr)) {
        ret = diacritics[d][1]
        break;
      }

    }

    return ret;

  });

}