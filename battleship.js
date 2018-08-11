const model = {
  player1Board: [0,0,0,0,0,    // 0 = empty             
                  0,0,0,0,0,   // 1 = ship    
                  0,0,0,0,0,   // 2 = hit  
                  0,0,0,0,0,   // 3 = miss      
                  0,0,0,0,0],                
  player2Board: [0,0,0,0,0,
                  0,0,0,0,0,
                  0,0,0,0,0,
                  0,0,0,0,0,
                  0,0,0,0,0],
  player1Ships: 0,
  player2Ships: 0,
  player1LoadedShips: false,
  player2LoadedShips: false,
  player1Keys: [],
  player2Keys: [],
  playerAlreadyWon: false,
  turn: 'player1',
  alreadySunkTestBoolean1: false,
  alreadySunkTestBoolean2: false,
  alreadyMissTestBoolean1: false,
  alreadyMissTestBoolean2: false,
  winFromDeadTestBoolean: false,
}

const view = {
  displayMessage: msg => {
    const node = document.createElement("LI")
    const time = new Date()
    const timeStamp = time.toLocaleTimeString('en-US')
    const textnode = document.createTextNode(`${timeStamp}: ${msg}`)
    node.appendChild(textnode)
    document.getElementById("messages").appendChild(node)
    //scroll down after new message
    const elem = document.getElementById("message_area");
    elem.scrollTop = elem.scrollHeight;
  },
}

const controller = {
  player1BoardKeyClick: num => {
    if ((model.turn === 'player1' && !model.player1LoadedShips) || (model.turn === 'player2' && model.player1LoadedShips && model.player2LoadedShips)) {
    // fire
    if (model.player1LoadedShips) {
      switch (model.player1Board[num]) {
        case 0:
          model.player1Board[num] = 3
          view.displayMessage('Player 2 missed!')
          document.getElementById(`player1_cell_${num}`).setAttribute("class", 'shipMiss')
          model.turn = 'player1'
          break;
        case 1:
          model.player1Board[num] = 2
          view.displayMessage('Player 2 hit a ship!')
          document.getElementById(`player1_cell_${num}`).setAttribute("class", 'shipHit')
          model.player1Ships -= 1
          if (model.player1Ships > 0) {
            if (model.player1Ships > 1) {
              view.displayMessage(`Player 2 has Sunk a Ship! Player 1 has ${model.player1Ships} ships left!`)
            } else {
              view.displayMessage(`Player 1's forces grow weak, they have 1 ship left!`)
            }
          } else {
            if (!model.playerAlreadyWon) {
              view.displayMessage(`Congratulations Player 2! You won!`)
              view.displayMessage(`To start a new game click the "new game" button at the top of the page`)
              createVictor()
              model.playerAlreadyWon = true
            } else {
              view.displayMessage(`Player 2 won from the dead!`)
              model.winFromDeadTestBoolean = true
            }
          }
          model.turn = 'player1'
          break;
        case 2:
          view.displayMessage('Sunk: They\'re already dead! Have mercy and attack somewhere else!')
          model.alreadySunkTestBoolean2 = true
          break;
        case 3:
          view.displayMessage('Already Taken: All ships in this war cannot move, rest assured that no one has moved here')
          model.alreadyMissTestBoolean2 = true
          break;
        default:
          console.log('error unknown case: battleship.js line 62')
      }
    }
    //loading ships
    if (!model.player1LoadedShips && model.player1Ships < 4) {
      if (model.player1Board[num] === 0) {
        model.player1Board[num] = 1
        model.player1Ships += 1
        if (model.player1Ships > 1) {
          view.displayMessage(`Player 1 has placed ${model.player1Ships} ships!`)
        } else {
          view.displayMessage(`Player 1 has placed 1 ship!`)
        }
      } else {
        view.displayMessage('Tile Occupied: Due to complaints from ship captains, we are no longer allowed to stack ships on top of each other. Please place your ship in an empty tile.')
      }
      if (model.player1Ships === 3) {
        model.player1LoadedShips = true
        model.turn = 'player2'
        view.displayMessage(`Player 1 has placed all ships, Player 2's turn to place ships`)
      }
    }
  } else {
    view.displayMessage('It is not your turn! Even in stressful times of war, we must not cheat.')
  }
    console.log('PASS: click on p1 tile: ',num)
  },
  player2BoardKeyClick: num => {
    if ((model.turn === 'player2' && !model.player2LoadedShips) || (model.turn === 'player1' && model.player2LoadedShips)) {
    //fire
    if (model.player2LoadedShips) {
      switch (model.player2Board[num]) {
        case 0:
          model.player2Board[num] = 3
          view.displayMessage('Player 1 missed!')
          document.getElementById(`player2_cell_${num}`).setAttribute("class", 'shipMiss')
          model.turn = 'player2'
          break;
        case 1:
          model.player2Board[num] = 2
          view.displayMessage('Player 1 hit a ship!')
          document.getElementById(`player2_cell_${num}`).setAttribute("class", 'shipHit')
          model.player2Ships -= 1
          if (model.player2Ships > 0) {
            if (model.player2Ships > 1) {
              view.displayMessage(`Player1 has Sunk a Ship! Player 2 has ${model.player2Ships} ships left!`)
            } else {
              view.displayMessage(`Player 2's forces grow weak, they have 1 ship left!`)
            }
          } else {
            if (!model.playerAlreadyWon) {
              view.displayMessage(`Congratulations Player 1! You won!`)
              view.displayMessage(`To start a new game click the "new game" button at the top of the page`)
              createVictor()
              model.playerAlreadyWon = true
            } else {
              view.displayMessage(`Player 1 won from the dead!`)
              model.winFromDeadTestBoolean = true
            }
          }
          model.turn = 'player2'
          break;
        case 2:
          view.displayMessage('Sunk: They\'re already dead! Have mercy and attack somewhere else!')
          model.alreadySunkTestBoolean1 = true
          break;
        case 3:
          view.displayMessage('Already Taken: All ships in this war cannot move, rest assured that no one has moved here')
          model.alreadyMissTestBoolean1 = true
          break;
        default:
          console.log('error unknown case: battleship.js line 62')
      }
    }
    //loading ships
    if (!model.player2LoadedShips && model.player2Ships < 4) {
      if (model.player2Board[num] === 0) {
        model.player2Board[num] = 1
        model.player2Ships += 1
        if (model.player2Ships > 1) {
          view.displayMessage(`Player 2 has placed ${model.player2Ships} ships!`)
        } else {
          view.displayMessage(`Player 2 has placed 1 ship!`)
        }
      } else {
        view.displayMessage('Tile Occupied: Due to complaints from ship captains, we are no longer allowed to stack ships on top of each other. Please place your ship in an empty tile.')
      }
      if (model.player2Ships === 3) {
        model.player2LoadedShips = true
        model.turn = 'player1'
        view.displayMessage(`Player 2 has placed all ships, Player 1 start by attacking Player 2's board!`)
      }
    }
  } else {
    view.displayMessage('It is not your turn! Even in stressful times of war, we must not cheat.')
  }
  console.log('PASS: click on p2 tile: ', num)
}
}

const bindBoardClickToKeys = () => {
  for (let i = 0; i < 25; i += 1) {
    //player 1
    let key = document.getElementById(`player1_cell_${i.toString()}`)
    model.player1Keys.push(key.addEventListener("click", () => controller.player1BoardKeyClick(i)))
    //player 2
    key = document.getElementById(`player2_cell_${i.toString()}`)
    model.player2Keys.push(key.addEventListener("click", () => controller.player2BoardKeyClick(i)))
  }
}

const createVictor = () => {
  const imgNode = document.createElement("IMG")
  const classAttr = document.createAttribute("src")
  classAttr.value = "stickFigure.png"
  imgNode.setAttributeNode(classAttr)
  imgNode.setAttribute("id", "victor")
  const imgTextNode = document.createElement("H4")
  const text = document.createTextNode("Victor")
  imgTextNode.appendChild(text)
  imgTextNode.setAttribute("id", "victor_title")
  document.getElementById("instruction_text").appendChild(imgNode)
  document.getElementById("instruction_text").appendChild(imgTextNode)
}

const init = () => {
  bindBoardClickToKeys()
  view.displayMessage('Welcome! Please read instructions..')
  console.log('finish init render')
  return 'complete'
}

window.onload = init

// Testing with Vanilla JS
// Check Developer Console after running

const runTestingSuite = () => {
  const Board = [0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0,
                      0, 0, 0, 0, 0]
  //make sure all models load correctly at start
  assertArraysEqual(model.player1Board, Board, 'Expect player1 empty board to render on start')
  assertArraysEqual(model.player2Board, Board, 'Expect player2 empty board to render on start')
  assertEquals(model.player1Ships, 0, 'Expect player1 to have 0 ships placed on start')
  assertEquals(model.player2Ships, 0, 'Expect player2 to have 0 ships placed on start')
  assertEquals(model.player1LoadedShips, false, 'Expect player1 to have not loaded any ships on start')
  assertEquals(model.player2LoadedShips, false, 'Expect player2 to have not loaded any ships on start')
  assertEquals(model.player1Keys.length, 25, 'Expect player1 to have all click binded keys on start')
  assertEquals(model.player2Keys.length, 25, 'Expect player2 to have all click binded keys on start')
  assertEquals(model.playerAlreadyWon, false, 'Expect playerAlreadyWon to be false')
  assertEquals(model.turn, 'player1', 'Expect first turn to be player1')
  //check if message function works
  view.displayMessage('testing... Please check Developer Console for information')
  assertEquals(document.getElementById("messages").childNodes.length, 3, 'Expect view.displayMessage to display messages')
  //check place ships work player 1
  controller.player1BoardKeyClick(0)
  controller.player1BoardKeyClick(1)
  controller.player1BoardKeyClick(2)
  if (model.player1LoadedShips) {
    console.log('PASS: Expect Player1 ship placements to work')
  } else {
    console.log('FAIL: Expect Player1 ship placements to work')
  }
  //check player turn works after player1 places ships
  if (model.turn === "player2") {
    console.log(`PASS: Expect turn to switch after player1 places ships`)
  } else {
    console.log(`FAIL: Expected turns to switch after player1 places ships`)
  }
  //check place ships work player 2
  controller.player2BoardKeyClick(0)
  controller.player2BoardKeyClick(1)
  controller.player2BoardKeyClick(2)
  if (model.player2LoadedShips) {
    console.log('PASS: Expect Player2 ship placements to work')
  } else {
    console.log('FAIL: Expect Player2 ship placements to work')
  }
  //check player turn works after player2 places ships
  if (model.turn === "player1") {
    console.log(`PASS: Expect turn to switch after player2 places ships`)
  } else {
    console.log(`FAIL: Expected turns to switch after player2 places ships`)
  }
  //player 2 click to miss
  controller.player2BoardKeyClick(5)
  if (model.player2Board[5] === 3) {
    console.log(`PASS: Expect Player2 Board click from empty to miss`)
  } else {
    console.log(`FAIL: Expected Player2 Board click on empty spot does not equal miss`)
  }
  //Check Turn Swap Works
  if (model.turn === "player2") {
    console.log(`PASS: Expect turn to switch after player1 miss fire`)
  } else {
    console.log(`FAIL: Expected turn to switch after player1 miss fire`)
  }
  //check if miss/click working properly for player 1
  controller.player1BoardKeyClick(5)
  if (model.player1Board[5] === 3) {
    console.log(`PASS: Expect Player1 Board click from empty to miss`)
  } else {
    console.log(`FAIL: Expeceted Player1 Board click on empty spot to equal miss`)
  }
  //Check Turn Swap Works
  if (model.turn === "player1") {
    console.log(`PASS: Expect turn to switch after player2 miss fire`)
  } else {
    console.log(`FAIL: Expected turn to switch after player2 miss fire`)
  }
  //player1 hit
  controller.player2BoardKeyClick(0)
  if (model.player2Board[0] === 2) {
    console.log('PASS: Expect Player2 Board click to go from empty to hit')
  } else {
    console.log('FAIL: Expected player2 Board click to go from empty to hit')
  }
  //Check Turn Swap Works
  if (model.turn === "player2") {
    console.log(`PASS: Expect turn to switch after player2 hit fire`)
  } else {
    console.log(`FAIL: Expected turn to switch after player2 hit fire`)
  }
  //player2 hit
  controller.player1BoardKeyClick(0)
  if (model.player1Board[0] === 2) {
    console.log('PASS: Expect Player1 Board click to go from empty to hit')
  } else {
    console.log('PASS: Expected Player1 Board click to go from empty to hit')
  }
  //Check Turn Swap Works
  if (model.turn === "player1") {
    console.log(`PASS: Expect turn to switch after player1 miss fire`)
  } else {
    console.log(`FAIL: Expected turn to switch after Player1 miss fire`)
  }
  //Check already hit player 2 board
  controller.player2BoardKeyClick(0)
  if (model.alreadySunkTestBoolean1) {
    console.log('PASS: Expect already sunk to work for player2 board')
  } else {
    console.log('FAIL: Expected already sunk to have work for player2 board')
  }
  // check turn still same player
  if (model.turn === "player1") {
    console.log('PASS: Expected turn to stay on Player1')
  } else {
    console.log('FAIL: Expected turn to still be Player1')
  }
  //check already miss player 2 board
  controller.player2BoardKeyClick(5)
  if (model.alreadyMissTestBoolean1) {
    console.log('PASS: Expect already miss to work on player2 board')
  } else {
    console.log('FAIL: Expected already miss to work on player2 board')
  }
  //check turn still same player
  if (model.turn === "player1") {
    console.log('PASS: Expected turn to stay on Player1')
  } else {
    console.log('FAIL: Expected turn to still be player1')
  }
  model.turn = 'player2'
  //check already hit player 1 board
  controller.player1BoardKeyClick(0)
  if (model.alreadySunkTestBoolean2) {
    console.log('PASS: Expect already sunk test to work Player1 board')
  } else {
    console.log('FAIL: Expected already sunk test to work on Player1 board')
  }
  //check turn still same player
  if (model.turn === "player2") {
    console.log('PASS: Expected turn to stay on Player2')
  } else {
    console.log('FAIL: Expected turn to still be Player2')
  }
  // check already miss player 1 board
  controller.player1BoardKeyClick(5)
  if (model.alreadyMissTestBoolean2) {
    console.log('PASS: Expect already miss test to work Player1 board')
  } else {
    console.log('FAIL: Expected already miss test to work on Player1 board')
  }
  // check turn still player2
  if (model.turn === "player2") {
    console.log('PASS: Expected turn to stay on Player2')
  } else {
    console.log('FAIL: Expected turn to still be Player2')
  }
  controller.player1BoardKeyClick(1)
  model.turn = 'player2'
  controller.player1BoardKeyClick(2)
  // check if win works
  if (model.playerAlreadyWon) {
    console.log('PASS: Expect win to work')
  } else {
    console.log('FAIL: Expected win to work')
  }
  // check if win from dead works
  controller.player2BoardKeyClick(1)
  model.turn = 'player1'
  controller.player2BoardKeyClick(2)
  if (model.winFromDeadTestBoolean) {
    console.log('PASS: Expect After death win to work')
  } else {
    console.log('FAIL: Expected After death win to work')
  }
  console.log('All Tests completed')
  view.displayMessage('Testing complete, please check log for more information..')
}

// check if a = b
const assertEquals = (a, b, string) => {
if (a == b) {
  console.log(`PASS: ${string}`)
  return true
} else {
    console.log(`FAIL ${string}: Expected ${a} to equal ${b}`)
    return false
  }
}

// arrays have to be same order to pass
const assertArraysEqual = (arr1, arr2, string) => {
  if (arr1.length !== arr2.length) {
    console.log(`FAIL ${string}: Expected ${arr1} to equal ${arr2}`)
    return false
  }
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      console.log(`FAIL ${string}: Expected ${arr1} to equal ${arr2}`)
      return false
    }
  }
  console.log(`PASS ${string}`)
  return true
}