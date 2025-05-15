const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    suite('Number convertHandler.getNum(input)', function () {
        test('whole number input', function () {
            let input = "10L";
            assert.equal(convertHandler.getNum(input), 10);
        });

        test('decimal number input', function () {
            let input = "10.1L";
            assert.equal(convertHandler.getNum(input), 10.1);
        });

        test('fractional input no decimal', function () {
            let input = "3/7L";
            assert.equal(convertHandler.getNum(input), 3 / 7);
        });

        test('fractional input with a decimal', function () {
            let input = "3.1/7L";
            assert.equal(convertHandler.getNum(input), 3.1 / 7);
        });

        test('error on a double-fraction (i.e. 3/2/3)', function () {
            let input = "3/7.2/4kg";
            assert.isNull(convertHandler.getNum(input), 'invalid number');
        });

        test('default to a numerical input of 1 when no numerical', function () {
            let input = "L";
            assert.equal(convertHandler.getNum(input), 1);
        });
    });

    suite('Unit input, return, conversion ', function () {
        test('correctly read each valid input unit convertHandler.getUnit(input)', function () {
            let inputUnits = ['gal', 'GAL', 'l', 'L', 'mi', 'MI', 'km', 'KM', 'lbs', 'LBS', 'kg', 'KG'];
            let expectedUnits = ['gal', 'gal', 'L', 'L', 'mi', 'mi', 'km', 'km', 'lbs', 'lbs', 'kg', 'kg'];
            inputUnits.forEach(function (inputUnit, i) {
                assert.equal(convertHandler.getUnit(10 + inputUnit), expectedUnits[i]);
            });
        });


        test('correctly return an error for an invalid input unit', function () {
            assert.isNull(convertHandler.getUnit("32g"), 'invalid unit');
        });


        test(' return the correct return unit for each valid input unit convertHandler.getReturnUnit(initUnit)', function () {
            let inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            let expectedUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs']
            inputUnits.forEach(function (inputUnit, i) {
                assert.equal(convertHandler.getReturnUnit(inputUnit), expectedUnits[i]);
            });
        });

        test('Unit correctly return the spelled-out string unit for each valid input convertHandler.spellOutUnit(initUnit)', function () {
            let inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            let expectedUnits = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']
            inputUnits.forEach(function (inputUnit, i) {
                assert.equal(convertHandler.spellOutUnit(inputUnit), expectedUnits[i]);
            });
        });
    });


    suite('Unit conversion', function () {
        test('correctly convert gal to L', function () {
            let input = [10, "gal"];
            let expectedResult = 37.85412;
            assert.approximately(convertHandler.convert(input[0], input[1]), expectedResult, 0.1);
        });
        test('correctly convert L to gal', function () {
            let input = [10, "L"];
            let expectedResult = 2.64172;
            assert.approximately(convertHandler.convert(input[0], input[1]), expectedResult, 0.1);
        });
        test('correctly convert mi to km', function () {
            let input = [10, "mi"];
            let expectedResult = 16.09344;
            assert.approximately(convertHandler.convert(input[0], input[1]), expectedResult, 0.1);
        });
        test('correctly convert km to mi', function () {
            let input = [10, "km"];
            let expectedResult = 6.213712;
            assert.approximately(convertHandler.convert(input[0], input[1]), expectedResult, 0.1);
        });
        test('correctly convert lbs to kg', function () {
            let input = [10, "lbs"];
            let expectedResult = 4.53592;
            assert.approximately(convertHandler.convert(input[0], input[1]), expectedResult, 0.1);
        });
        test('correctly convert kg to lbs', function () {
            let input = [10, "kg"];
            let expectedResult = 22.04623;
            assert.approximately(convertHandler.convert(input[0], input[1]), expectedResult, 0.1);
        });
    });
});