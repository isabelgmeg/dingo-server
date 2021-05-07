
const basalMetabolicCaculus = (gender, height, weight, age) => {
    try {
      let tbm = 0;
      if (( gender) === 'male') {
        tbm =
          66.47 +
          13.75 * ( weight) +
          (5.003 * ( height) - 6.755 * ( age));
      } else if (( gender) === 'female') {
        tbm =
          655.1 +
          9.563 * ( weight) +
          1.85 * ( height) -
          4.676 * ( age);
      } else {
        tbm =
          300 +
          9.563 * ( weight) +
          3.85 * ( height) -
          5.676 * ( age);
      }
      return tbm;
    } catch (error) {
      console.error('data not retrieved');
    }
  };

  const bmrWithObjectives = (number, objective) =>{
    if(objective=== 'add-muscle'){
      return number* 1.2
    }else if(objective=== 'lose-weight'){
      return number* 0.8
    }else return number
  }

  module.exports = { basalMetabolicCaculus, bmrWithObjectives }