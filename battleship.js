var model = {
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
  
}

var view = {
  displayMessage: msg => {
    const node = document.createElement("LI")
    const textnode = document.createTextNode(msg)
    node.appendChild(textnode)
    document.getElementById("messages").appendChild(node)
  },
  
}

var controller = {

}