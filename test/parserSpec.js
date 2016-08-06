/* eslint-env mocha */
'use strict'

let chai = require("chai");
let expect = chai.expect;
let rewire = require("rewire");

let parser = require("../lib/parser.js");

describe('Parser', function(){
   describe("#parse()", function(){
       it("should parse long formed tags", function(){
           var args = ["--depth=4", "--hello=world"];
           var results = tags.parse(args);
 
           expect(results).to.have.a.property("depth", 4);
           expect(results).to.have.a.property("hello", "world");
       });
   });
});
