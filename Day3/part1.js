let rounds = [];
let score = 0;

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});


lineReader.on('line', function (line) {
  let split = line.split(" ");
  rounds.push([split[0], split[1]]);
});

function calcResult() {
  for (let i = 0; i < rounds.length; i++) {
    let round = rounds[i];
    playHand(round[0], round[1]);
  }

  console.log(score);
}

function playHand(other, you) {
  switch (you) {
    // ROCK
    case "X":
      score = score + 1;

      switch (other) {
        // ROCK
        case "A":
          score = score + 3;
          break;
          // PAPER
        case "B":
          score = score + 0;

          break;
          // SCISSORS
        case "C":
          score = score + 6;
          break;

        default:
          break;
      }
      break;
      // PAPER
    case "Y":
      score = score + 2;
      switch (other) {
        // ROCK
        case "A":
          score = score + 6;
          break;
          // PAPER
        case "B":
          score = score + 3;

          break;
          // SCISSORS
        case "C":
          score = score + 0;
          break;

        default:
          break;
      }
      break;
      // SCISSORS
    case "Z":
      score = score + 3;

      // (0 if you lost, 3 if the round was a draw, and 6 if you won)
      switch (other) {
        // ROCK
        case "A":
          score = score + 0;
          break;
          // PAPER
        case "B":
          score = score + 6;

          break;
          // SCISSORS
        case "C":
          score = score + 3;
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
}

lineReader.on('close', function () {
  calcResult();
});