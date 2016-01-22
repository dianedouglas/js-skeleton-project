exports.printThing = function(){
  console.log("fa la la la la.");
  return "stuff";
}
console.log("la la la la!");

var expect = require('chai').expect;
var module = require("./mymodule.js");

describe('mymodule.printThing', function() {
  it("returns stuff!", function() {
    expect(module.printThing()).to.equal("stuff");
  });
});
