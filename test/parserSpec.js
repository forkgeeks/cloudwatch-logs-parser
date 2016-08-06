/* eslint-env mocha */

'use strict'

let chai = require('chai')
let expect = chai.expect
let should = chai.should() // eslint-disable-line
let rewire = require('rewire')

let parser = rewire('../lib/parser.js')

describe('Parser', function () {
  describe('#isJsonInString()', () => {
    let isJsonInString = parser.__get__('isJsonInString')
    it('should not detect JSON in simple string', () => {
      let falseCases = ['Simple String', '', '{string', 'string}']

      for (let str in falseCases) {
        isJsonInString(falseCases[str]).should.equal(false)
      }
    })

    it('should detect JSON in string starts with { and ends with }', () => {
      let trueCases = ['{application:test}', '{application=test}']
      for (let str in trueCases) {
        isJsonInString(trueCases[str]).should.equal(true)
      }
    })
  })

    // TODO
    // describe("#fixJsonString()", () => {
    //  // TODO
    //  // it("should fix json with no special character", () => {});
    //  // TODO
    //  // it("should fix json str with with comma in values", () => {});
    //  // TODO
    //  // it("should fix json str with with quotes in values", () => {});
    //  // TODO
    //  // it("should fix json str with special character in values", () => {});
    // });

  describe('#parser()', () => {
        // TODO
        // it("should validate input schema of string", () => {});
        // TODO
        // it("should correct invalid json in message string", () => {});

    it('should parse correct json by JSON.parse', () => {
      let jsonStr = [
                {'logEvents': [{'message': 'some key: {"someKey2":"string"}'}]},
                {'logEvents': [{'message': 'some key: {"someKey2":80}'}]},
                {'logEvents': [{'message': 'some key: {"someKey2":true}'}]}
      ]

      let jsonStrResp = [
                {'someKey': {'someKey2': 'string'}},
                {'someKey': {'someKey2': 80}},
                {'someKey': {'someKey2': true}}
      ]

      for (let str in jsonStr) {
        let value = parser(jsonStr[str])
        expect(value).to.eql(jsonStrResp[str])
      }
    })
  })
})
