let backpacks = [];
let matches = 0;
let matchArray = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', function (line) {
  let eachBackpackLength = line.length /2;
  let first = line.substring(0, eachBackpackLength);
  let second = line.substring(eachBackpackLength);

  let firstBackpack = [];
  let secondBackpack = [];

  for (let i = 0; i < first.length; i++) {
    let code = first.charCodeAt(i);
    if (code > 96) {
      firstBackpack.push(code - 96);
    } else {
      firstBackpack.push(code - 38);
    }
  }

  for (let i = 0; i < second.length; i++) {
    let code = second.charCodeAt(i);
    if (code > 96) {
      secondBackpack.push(code - 96);
    } else {
      secondBackpack.push(code - 38);
    }
  }

  backpacks.push([firstBackpack, secondBackpack]);
});

function calcResult() {
  for (let i = 0; i < backpacks.length; i++) {
    let backpack = backpacks[i];

    let currentMathes = [];
    for (let i = 0; i < backpack[0].length; i++) {
      let firstBackpackItem = backpack[0][i];
      for (let j = 0; j < backpack[1].length; j++) {
        let secondBackpackItem = backpack[1][j];
        if (firstBackpackItem === secondBackpackItem) {
          if (currentMathes.length === 0) {
            matches = matches + firstBackpackItem;
            currentMathes.push(firstBackpackItem);
            continue;
          }
          let anyMatch = currentMathes.reduce((prev, current, index) => current === firstBackpackItem);
          if (anyMatch === 0) {
            matches = matches + firstBackpackItem;

            currentMathes.push(firstBackpackItem);
          }
        }
      }
      
    }
  }

  console.log(matches);

}

lineReader.on('close', function () {
  calcResult();
});