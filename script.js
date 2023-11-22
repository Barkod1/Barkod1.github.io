let ticketsSum = [0,1,3,6,10,15,21,27,36,45]

function getInputData() {
  let inputList = [];
  for (let i = 1; i <= 10; i++) {
    
    let input = document.getElementById("input" + i).value;
    if(input){
    let checked = document.getElementById("check" + i).checked;
    inputList.push({ number: input, check: checked });
    }
  }
  return inputList;
}

function calcDoublesBets(firstObject, inputList, profit, betNumber) {
  if(!betNumber) return 0;
  if (inputList.length == 0){ 
    console.log("list empty")

    return profit;}
  if (firstObject.check == false) {
    console.log("this unit is empty")

    return calcDoublesBets(inputList[0], inputList.slice(1), profit, betNumber);
  }
  if (!firstObject.number || firstObject.number <= 0) {
    console.log("number is not valid")

    return calcDoublesBets(inputList[0], inputList.slice(1), profit, betNumber);
  }
  console.log("still calculating..." + " " + inputList.length)
  
  for (let i = 0; i <= inputList.length; i++) {
    if(inputList[i]){
      if (inputList[i].check == true) {
        profit += inputList[i].number * betNumber * firstObject.number;
      }
    }

  }
  if (inputList.length == 1) return profit;
  return calcDoublesBets(inputList[0], inputList.slice(1), profit, betNumber);
}

function makeCalc() {
  let bet = document.getElementById('bet').value;
  let inputList = getInputData();
  let profitText = document.getElementById('profit');
  let singlesBet = document.getElementById('singles').value;
  let profitSingles = calcSinglesBets(inputList);
  if(inputList.length > 1){
  profitText.innerText = calcDoublesBets(inputList[0], inputList.slice(1), 0, bet) - bet * ticketsSum[inputList.length - 1] + profitSingles;
    
  }
  else{
     profitText.innerText = - bet * ticketsSum[inputList.length - 1]
       +profitSingles;
  }
  let cost = document.getElementById('cost');
  cost.innerText = bet * ticketsSum[inputList.length - 1] + inputList.length * singlesBet;
}

function calcSinglesBets(inputList) {
  let betNumber = document.getElementById('singles').value;
  if(!betNumber) return 0;
  let profit = 0;
  if (inputList.length == 0){ 
    return 0
  }
  for(let i = 0; i < inputList.length; i++){
    if(inputList[i].check == true)
    profit += inputList[i].number * betNumber;
  }
  return profit - betNumber*inputList.length;
}
