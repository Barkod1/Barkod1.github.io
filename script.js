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
  if(inputList.length > 1){
  profitText.innerText = calcDoublesBets(inputList[0], inputList.slice(1), 0, bet) - bet * ticketsSum[inputList.length - 1];
    
  }
  else{
     profitText.innerText = - bet * ticketsSum[inputList.length - 1];
  }
}
