const { strictEqual } = require('assert');
//var assert = require('assert');
const chai = require('chai')
    , assert = chai.assert
    , expect = chai.expect
    , should = chai.should()


var FlagFinder = require('../js/flagGuesser/flagGuesser')

let countries = [];

describe('Test de flagGuesser', function () {

    describe('createQuestion', function () {

        it('should return a question', function () {

            expect(createQuestion(countries)).to.be.a('object')

        })
    })
})