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
          view.displayMessage('Player 2 Missed!')
          document.getElementById(`player1_cell_${num}`).setAttribute("class", 'shipMiss')
          model.turn = 'player1'
          break;
        case 1:
          model.player1Board[num] = 2
          view.displayMessage('Player 2 Hit!')
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
              alert(`Congratulations Player 2! You won!`)
              view.displayMessage(`Player 2 Won!`)
              createVictor()
              model.playerAlreadyWon = true
            } else {
              view.displayMessage(`Player 2 won from the dead!`)
            }
          }
          model.turn = 'player1'
          break;
        case 2:
          alert('Sunk: They\'re already dead! Have mercy and attack somewhere else!')
          break;
        case 3:
          alert('Already Taken: All ships in this war cannot move, rest assured that no one has moved here')
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
        alert('Tile Occupied: Due to complaints from ship captains, we are no longer allowed to stack ships on top of each other. Please place your ship in an empty tile.')
      }
      if (model.player1Ships === 3) {
        model.player1LoadedShips = true
        model.turn = 'player2'
        view.displayMessage(`Player 1 has placed all ships, Player 2's turn to place ships`)
      }
    }
  } else {
    alert('It is not your turn! Even in stressful times of war, we must not cheat.')
  }
    console.log('click on p1 tile: ',num)
  },
  player2BoardKeyClick: num => {
    if ((model.turn === 'player2' && !model.player2LoadedShips) || (model.turn === 'player1' && model.player2LoadedShips)) {
    //fire
    if (model.player2LoadedShips) {
      switch (model.player2Board[num]) {
        case 0:
          model.player2Board[num] = 3
          view.displayMessage('Miss!')
          document.getElementById(`player2_cell_${num}`).setAttribute("class", 'shipMiss')
          model.turn = 'player2'
          break;
        case 1:
          model.player2Board[num] = 2
          view.displayMessage('Hit!')
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
              alert(`Congratulations Player 1! You won!`)
              view.displayMessage(`Player 1 Won!`)
              createVictor()
              model.playerAlreadyWon = true
            } else {
              view.displayMessage(`Player 1 won from the dead!`)
            }
          }
          model.turn = 'player2'
          break;
        case 2:
          alert('Sunk: They\'re already dead! Have mercy and attack somewhere else!')
          break;
        case 3:
          alert('Already Taken: All ships in this war cannot move, rest assured that no one has moved here')
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
        alert('Tile Occupied: Due to complaints from ship captains, we are no longer allowed to stack ships on top of each other. Please place your ship in an empty tile.')
      }
      if (model.player2Ships === 3) {
        model.player2LoadedShips = true
        model.turn = 'player1'
        view.displayMessage(`Player 2 has placed all ships, Player 1 start!`)
      }
    }
  } else {
    alert('It is not your turn! Even in stressful times of war, we must not cheat.')
  }
  console.log('click on p2 tile: ', num)
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
  document.getElementById("victor_container").appendChild(imgNode)
  document.getElementById("victor_container").appendChild(imgTextNode)
}

init = () => {
  bindBoardClickToKeys()
  view.displayMessage('Hello! Please read instructions..')
  console.log('finish init render')
  return 'complete'
}

window.onload = init