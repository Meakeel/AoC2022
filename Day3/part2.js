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

// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!
function playHand(other, you) {
  switch (you) {
    // LOSE
    case "X":
      score = score + 0;
      score = score + losePlayedHand(other);
      break;
      // DRAW
    case "Y":
      score = score + 3;
      score = score + drawPlayedHand(other);
      break;
      // WIN
    case "Z":
      score = score + 6;
      score = score + winPlayedHand(other);
      break;

    default:
      break;
  }
}

function losePlayedHand(other) {
  // 1 for Rock, 2 for Paper, and 3 for Scissors
  switch (other) {
    // ROCK
    case "A":
      return 3;
      // PAPER
    case "B":
      return 1;
      // SCISSORS
    case "C":
      return 2;

    default:
      break;
  }
}

function drawPlayedHand(other) {
  // 1 for Rock, 2 for Paper, and 3 for Scissors
  switch (other) {
    // ROCK
    case "A":
      return 1;
      // PAPER
    case "B":
      return 2;
      // SCISSORS
    case "C":
      return 3;

    default:
      break;
  }
}

function winPlayedHand(other) {
  // 1 for Rock, 2 for Paper, and 3 for Scissors
  switch (other) {
    // ROCK
    case "A":
      return 2;
      // PAPER
    case "B":
      return 3;
      // SCISSORS
    case "C":
      return 1;

    default:
      break;
  }
}

lineReader.on('close', function () {
  calcResult();
});