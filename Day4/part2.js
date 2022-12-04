let assignments = [];
let count = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', function (line) {
  let firstAssignment = line.split(",")[0];
  let secondAssignment = line.split(",")[1];

  assignments.push([firstAssignment.split("-").map(Number), secondAssignment.split("-").map(Number)]);
});

function calcResult() {
  console.log(assignments.length);

  for (let i = 0; i < assignments.length; i++) {
    let firstAssignment = assignments[i][0];
    let secondAssignment = assignments[i][1];

    if (checkContains(firstAssignment, secondAssignment) || checkContains(secondAssignment, firstAssignment)) {
      console.log(`true ${firstAssignment}|${secondAssignment}`);
      count++;
      
    } else {
      console.log(`false ${firstAssignment}|${secondAssignment}`);
    }
    
  }

  console.log(count);

}

function checkContains(firstAssignment, secondAssignment) {
  let startContains = false;
  let endContains = false;


  if (firstAssignment[0] >= secondAssignment[0] && firstAssignment[0] <= secondAssignment[1]) {
    startContains = true;
  }

  if (firstAssignment[1] <= secondAssignment[1] && firstAssignment[1] >= secondAssignment[0]) {
    endContains = true;
  }

  return startContains || endContains;
}

lineReader.on('close', function () {
  calcResult();
});