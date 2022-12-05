let crates = [];
let moves = [];
let processingMoves = false;
let line_counter = 0;
let columns = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', function (line) {

  if (line == "") {
    processingMoves = true;
    return;
  }

  if (processingMoves) {
    moves.push(line);
  } else {
    if (line_counter === 0) {
      let rowCount = line.split("");
      columns = Math.floor(rowCount.length / 3);
      crates = Array.from({
        length: columns
      }, () => ([]))
      line_counter++;
    }

    let lineArray = line.split("");
    for (let i = 0; i < columns; i++) {
      let columnString = "";

      if (i === columns) {
        const array = lineArray.slice(i * 3);
        columnString = array.join("");

      } else {
        const array = lineArray.slice(i * 4, (i * 4) + 3);
        columnString = array.join("");
      }

      if (columnString[0] === "[") {
        crates[i].unshift(columnString[1]);
      }

    }
  }
});

function calcResult() {
  console.log(crates);
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    runMove(move);
  }

  let result = "";

  for (let i = 0; i < columns; i++) {
    result = result + "" + crates[i].slice(-1);
  }
  console.log("Answer is " + result);
}

function runMove(move) {
  let current = move.replace("move ", "");
  let count = parseInt(current.split(" ")[0]);
  current = current.split("from ");
  let source = parseInt(current[1].split(" ")[0]) - 1;
  current = current[1].split("to ");
  let destination = parseInt(current[1]) - 1;

  let newCrateConfig = []; 
  for (let i = 0; i < count; i++) {
    newCrateConfig.push(crates[source].pop());
  }

  crates[destination].push(...newCrateConfig.reverse());

}

lineReader.on('close', function () {
  calcResult();
});