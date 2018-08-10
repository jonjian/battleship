const model = {
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
    console.log(num)
  },
  player2BoardKeyClick: num => {
    console.log(num)
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
  view.displayMessage('Player 1 - Place your ships')
  bindBoardClickToKeys()
  console.log('finish init render')
}

window.onload = init