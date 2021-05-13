
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

  const checkRecipeQuantityLimits = (data) =>{
    const returnData = {
        "mealQuantityLimit":0,
        "snackQuantityLimit":0,
    }
      if(data.userMealsPerDay === 2){
        returnData.mealQuantityLimit = data.userMealsPerDay,
        returnData.snackQuantityLimit = 0
      }
      
      else if(data.userMealsPerDay <= 6){

          if(data.userMealsPerDay%2 == 0){
              returnData.snackQuantityLimit= Math.round(0.33* data.userMealsPerDay)
              returnData.mealQuantityLimit =  Math.round(0.66* data.userMealsPerDay)
          }else{
            returnData.snackQuantityLimit= 0.4* data.userMealsPerDay
            returnData.mealQuantityLimit = 0.6* data.userMealsPerDay
          }
      }return returnData
  }


  module.exports = { basalMetabolicCaculus, bmrWithObjectives, checkRecipeQuantityLimits }