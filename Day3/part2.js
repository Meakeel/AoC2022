let backpacks = [];
let matches = 0;
let matchArray = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', function (line) {
  let lineBackpack = [];

  for (let i = 0; i < line.length; i++) {
    let code = line.charCodeAt(i);
    if (code > 96) {
      lineBackpack.push(code - 96);
    } else {
      lineBackpack.push(code - 38);
    }
  }

  backpacks.push(lineBackpack);
});

function calcResult() {
  let groups = backpacks.length / 3;
  let count = 0;

  for (let i = 0; i < groups; i++) {
    let firstBackpack = backpacks[count++];
    let secondBackpack = backpacks[count++];
    let thirdBackpack = backpacks[count++];

    let currentMathes = [];

    for (let i = 0; i < firstBackpack.length; i++) {
      let firstBackpackItem = firstBackpack[i];
      
      for (let j = 0; j < secondBackpack.length; j++) {
        let secondBackpackItem = secondBackpack[j];

        for (let k = 0; k < thirdBackpack.length; k++) {
          let thirdBackpackItem = thirdBackpack[k];

          if (firstBackpackItem === secondBackpackItem && secondBackpackItem === thirdBackpackItem) {
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
  }


  // for (let i = 0; i < backpacks.length; i++) {
  //   let backpack = backpacks[i];

  //   let currentMathes = [];
  //   for (let i = 0; i < backpack[0].length; i++) {
  //     let firstBackpackItem = backpack[0][i];
  //     for (let j = 0; j < backpack[1].length; j++) {
  //       let secondBackpackItem = backpack[1][j];
  //       if (firstBackpackItem === secondBackpackItem) {
  //         if (currentMathes.length === 0) {
  //           matches = matches + firstBackpackItem;
  //           currentMathes.push(firstBackpackItem);
  //           continue;
  //         }
  //         let anyMatch = currentMathes.reduce((prev, current, index) => current === firstBackpackItem);
  //         if (anyMatch === 0) {
  //           matches = matches + firstBackpackItem;

  //           currentMathes.push(firstBackpackItem);
  //         }
  //       }
  //     }

  //   }
  // }

  console.log(matches);

}

lineReader.on('close', function () {
  calcResult();
});