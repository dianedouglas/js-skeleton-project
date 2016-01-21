exports.printThing = function(){
  console.log("rollin rollin.");
  return "stuff";
}
console.log("Keep rollin.");

var expect = require('chai').expect;
var module = require("./mymodule.js");

describe('mymodule.printThing', function() {
  it("returns stuff!", function() {
    expect(module.printThing()).to.equal("stuff");
  });
});
