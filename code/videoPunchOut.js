var console = require ('console')
module.exports.function = function videoPunchOut (results) {
  console.log("results", results);
  var uri;
  if(results.authorname != undefined || results.authorname != null) {
    uri = results.uri;
  } else {
    uri = results.linkhref;
  }
  return uri;
}
