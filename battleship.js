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
  boardKeyClick: () => {
    console.log('click')
  }
}

const bindBoardClickToKeys = () => {
  let num1 = 0
  let num2 = 25
  //player1
  for (let i = 0; i < 25; i += 1) {
    //player 1
    let key = document.getElementById(`player1_cell_${num1}`)
    model.player1Keys.push(key.addEventListener("click", () => controller.boardKeyClick(num1.toString())))
    num1 += 1
    //player 2
    key = document.getElementById(`player2_cell_${num2.toString()}`)
    model.player2Keys.push(key.addEventListener("click", () => controller.boardKeyClick(num2.toString())))
    num2 += 1
  }

}

init = () => {
  view.displayMessage('Player 1 - Place your ships')
  bindBoardClickToKeys()
  console.log('finish init render')
}

window.onload = init