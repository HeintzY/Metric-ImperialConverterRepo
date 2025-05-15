function splitNumberUnit(input) {
  let indexOfFirstUnitLetter = input.search(/[a-zA-z]/);
  let number = input.slice(0, indexOfFirstUnitLetter);
  let unit = input.slice(indexOfFirstUnitLetter);
  return [number, unit];
}


function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    result = splitNumberUnit(input)[0];
    if (result === "") {
      return 1;
    }
    if (result.toString().includes('/')) {
      let numbers = result.split('/');
      if (numbers.length != 2) {
        return null;
      }
      else {
        return parseFloat(numbers[0]) / parseFloat(numbers[1]);
      }
    }
    if (isNaN(result)) {
      return null;
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    result = splitNumberUnit(input)[1].toLowerCase();
    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(result)) {
      return null;
    }
    else if (result === 'l') {
      return result.toUpperCase();
    }
    else if (result) {
      return result;
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    if (initUnit === 'gal') {
      result = 'L';
    }
    else if (initUnit === 'L') {
      result = 'gal';
    }
    else if (initUnit === 'lbs') {
      result = 'kg';
    }
    else if (initUnit === 'kg') {
      result = 'lbs';
    }
    else if (initUnit === 'mi') {
      result = 'km';
    }
    else if (initUnit === 'km') {
      result = 'mi';
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    if (unit === 'gal') {
      result = 'gallons';
    }
    else if (unit === 'L') {
      result = 'liters';
    }
    else if (unit === 'lbs') {
      result = 'pounds';
    }
    else if (unit === 'kg') {
      result = 'kilograms';
    }
    else if (unit === 'mi') {
      result = 'miles';
    }
    else if (unit === 'km') {
      result = 'kilometers';
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === 'gal') {
      result = initNum * galToL;
    }
    else if (initUnit === 'L') {
      result = initNum / galToL;
    }
    else if (initUnit === 'lbs') {
      result = initNum * lbsToKg;
    }
    else if (initUnit === 'kg') {
      result = initNum / lbsToKg;
    }
    else if (initUnit === 'mi') {
      result = initNum * miToKm;
    }
    else if (initUnit === 'km') {
      result = initNum / miToKm;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = initNum + " " + this.spellOutUnit(initUnit) + " " + "converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    return result;
  };

}

module.exports = ConvertHandler;
