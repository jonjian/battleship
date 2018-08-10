const model = {
  /* 0 = empty
     1 = ship
     2 = hit
     3 = miss
  */
  player1Board: [0,0,0,0,0,
                  0,0,0,0,0,
                  0,0,0,0,0,
                  0,0,0,0,0,
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
}

const view = {
  displayMessage: msg => {
    const node = document.createElement("LI")
    const time = new Date()
    const timeStamp = time.toLocaleTimeString('en-US')
    const textnode = document.createTextNode(`${timeStamp}: ${msg}`)
    node.appendChild(textnode)
    document.getElementById("messages").appendChild(node)
  },
}

const controller = {
  player1BoardKeyClick: num => {
    // fire
    if (model.player1LoadedShips) {
      switch (model.player1Board[num]) {
        case 0:
          model.player1Board[num] = 3
          view.displayMessage('Miss!')
          break;
        case 1:
          model.player1Board[num] = 2
          view.displayMessage('Hit!')
          model.player1Ships -= 1
          if (model.player1Ships > 0) {
            if (model.player1Ships > 1) {
              view.displayMessage(`You have Sunk a Ship! Player 1 has ${model.player2Ships} ships left!`)
            } else {
              view.displayMessage(`Their forces grow weak, Player 1 has 1 ship left!`)
            }
          } else {
            alert(`Congratulations Player 2! You won!`)
          }
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
          view.displayMessage(`${model.player1Ships} Ships Placed!`)
        } else {
          view.displayMessage(`1 Ship Placed!`)
        }
      } else {
        alert('Tile Occupied: Due to complaints from ship captains, we are no longer allowed to stack ships on top of each other. Please place your ship in an empty tile.')
      }
      if (model.player1Ships === 3) {
        model.player1LoadedShips = true
      }
    }
    console.log('click on p1 tile: ',num)
  },
  player2BoardKeyClick: num => {
    //fire
    if (model.player2LoadedShips) {
      switch (model.player2Board[num]) {
        case 0:
          model.player2Board[num] = 3
          view.displayMessage('Miss!')
          break;
        case 1:
          model.player2Board[num] = 2
          view.displayMessage('Hit!')
          model.player2Ships -= 1
          if (model.player2Ships > 0) {
            if (model.player1Ships > 1) {
              view.displayMessage(`You have Sunk a Ship! Player 2 has ${model.player2Ships} ships left!`)
            } else {
              view.displayMessage(`Their forces grow weak, Player 2 has 1 ship left!`)
            }
          } else {
            alert(`Congratulations Player 1! You won!`)
          }
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
          view.displayMessage(`${model.player2Ships} Ships Placed!`)
        } else {
          view.displayMessage(`1 Ship Placed!`)
        }
      } else {
        alert('Tile Occupied: Due to complaints from ship captains, we are no longer allowed to stack ships on top of each other. Please place your ship in an empty tile.')
      }
      if (model.player2Ships === 3) {
        model.player2LoadedShips = true
      }
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

init = () => {
  bindBoardClickToKeys()
  view.displayMessage('Hello! Please read instructions..')
  console.log('finish init render')
}

window.onload = init