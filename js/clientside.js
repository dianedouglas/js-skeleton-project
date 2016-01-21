var mymodule = require('./../src/mymodule/mymodule.js');

$(document).ready(function(){
  $('h1').append("<h3>Hola</h3>");
  mymodule.printThing();
});
