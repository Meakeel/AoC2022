let commands = [];
let tree = [{
  size: 0,
  files: []
}];
let directories = [];

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});

lineReader.on('line', function (line) {
  commands.push(line);
});

function printResult() {
  let results = Object.keys(directories).map(function(key) {
    if (directories[key] < 100000) {
      return [key, directories[key]];
    }
    return [key, 0]
  });
  
  results.sort(function(a, b){return a[1] - b[1]});
  results.reverse();
  
  console.log(results.map((value) => value[1]).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  ));
}

function calcResult() {
  tree = tree;
  let currentPath = "/";
  directories["/"] = 0;

  for (let i = 1; i < commands.length; i++) {
    let command = commands[i];
    
    if (command[0] == "$") {
      let something = command.substring(2);

      if (something.substring(0,2) == "cd") {
        if (something.split(" ")[1] == "..") {
          currentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
          currentPath = currentPath.substring(0, currentPath.lastIndexOf("/")) + "/";
        } else {
          currentPath = currentPath + something.split(" ")[1] + "/";
        }
      }

      if (something.substring(0,2) == "ls") {
        // do nothing
      }
    } else {
      // add to results
      let something = command.substring(0, 4);

      if (something == "dir ") {
        // let dirToAdd = "/" + command.split(" ")[1];
        let dirToAdd = command.split(" ")[1];
        let target = currentPath + dirToAdd;

        if (directories[target] === undefined ) {
          directories[target] = 0;
        }
      } else {
        let size = Number(command.split(" ")[0]);
        let file = command.split(" ")[1];

        tree[0].files.push({
          size: size,
          file: currentPath + file
        });

        updateDirectorySize(currentPath, file, size);
      }
    }
  }
}

function updateDirectorySize (currentPath, file, size) {
  let pathsDeep = currentPath.split("/").length - 1;
  let tempCurrentPath = JSON.parse(JSON.stringify(currentPath));
  if (pathsDeep > 1) {
    tempCurrentPath = tempCurrentPath.substring(0, tempCurrentPath.length -1)
  }

  for (let i = 0; i < pathsDeep; i++) {
    if (tempCurrentPath == "") {
      directories["/"] = directories["/"] + size;
    } else {
      directories[tempCurrentPath] = directories[tempCurrentPath] + size;
    }
    // remove trailing slash
    // tempCurrentPath = tempCurrentPath.substring(0, tempCurrentPath.length -1 );
    tempCurrentPath = tempCurrentPath.substring(0, tempCurrentPath.lastIndexOf("/"));    
  }

}

lineReader.on('close', function () {
  calcResult();
  printResult();
});