

const GameBoard = (() => {
  this.board = [["0","0","0"],["0","0","0"],["0","0","0"]];
  const add = function(y,x){
    if(player1.myTurn()){
      board[y][x] = "1";
    }
    else{
      board[y][x] = "2";
    }
  };
  const checkWinner = function(){
    for (let x = 0; x <3; x++) {
      if(board[x][0]!=0 && board[x][0] == board[x][1] && board[x][0] == board[x][2]){
        return true;
      }
    }
    for (let y = 0; y <3; y++) {
      if(board[0][y]!=0 && board[0][y] == board[1][y] && board[0][y] == board[2][y]){
        return true;
      }
    }
    if(board[0][0]!=0 && board[0][0] == board[1][1] && board[0][0] == board[2][2]){
      return true;
    }
    if(board[2][0]!=0 && board[2][0] == board[1][1] && board[2][0] == board[0][2]){
      return true;
    }
    return false;
  };
  const checkTie = function(){
    let isTie = true;
    for(let i = 0; i < 3; i++){
      if(board[i].indexOf("0")>-1){
        isTie = false;
      }
    }
    return isTie;
  }
  const reset = () => board = [["0","0","0"],["0","0","0"],["0","0","0"]];
  const currentBoard = () => this.board;
  return {add,checkWinner,reset,currentBoard,checkTie};
})();

const Person = (name) => {
  let turn = false;
  let myName = name;
  const switchTurn = function(){
    if(turn){
      turn = false;
    }
    else{
      turn = true;
    }
  }; 
  const sayName = () => myName;
  const myTurn = () => turn;
  return {sayName,myTurn,switchTurn};
}


const render = function(){
  let view = document.getElementById("tictactoegrid");
  let ar = GameBoard.currentBoard();
  for (let i = 0; i<ar.length; i++) {
    let x = ar[i];
    for(let j = 0; j<x.length;j++){
      let element = document.createElement("div");
      element.className = "box";
      element.id = i + "_" + j;
      element.onclick = function(){
        addMark(i,j);
      }
      view.appendChild(element);
    }
  }
  nextPlayerCounter();
}

let addMark = function(y,x){
  let element = document.getElementById(y+"_"+x);
  console.log("the turn is "+ player1.myTurn());
  let turnP = player1.myTurn();
  if(turnP){
    element.innerHTML = "O";
  }
  else{
    element.innerHTML = "X";
  }
  element.onclick = function(){};
  GameBoard.add(y,x);
  if(GameBoard.checkWinner()){
    let winnerMessage = "";
    if(turnP){
      console.log("i am the winner " + player1.sayName());
      winnerMessage = player1.sayName() + " is the winner!";
    }
    else{
      winnerMessage = player2.sayName() + " is the winner!";
    }
    let winnercontainer = document.getElementById("winnermessage");
    winnercontainer.innerHTML = winnerMessage;
    for (let i = 0; i<3; i++) {
      for(let j = 0; j<3;j++){
        let element = document.getElementById(i+"_"+j);
        element.onclick = function(){};
      }
    }
  }
  else if(GameBoard.checkTie()){
    let winnercontainer = document.getElementById("winnermessage");
    winnercontainer.innerHTML = "It's a tie";
  }
  player1.switchTurn();
  nextPlayerCounter();
}

let resetgame = function(){
  let b = document.getElementById('tictactoegrid');
  let cNode = b.cloneNode(false);
  b.parentNode.replaceChild(cNode,b);
  let a = document.getElementById("winnermessage");
  a.innerHTML = "";
  GameBoard.reset();
  render();
}

let nextPlayerCounter = function(){
  let holder = document.getElementById("turnCounter");
  if(player1.myTurn()){
    holder.innerHTML = "It is " + player1.sayName() + "'s turn";
  }
  else{
    holder.innerHTML = "It is " + player2.sayName() + "'s turn";
  }
}

let player1;
let player2;


window.addEventListener("load", function(){
  
  
  let player1Name = prompt("Enter player 1 name");
  player1 = Person(player1Name);
  player1.switchTurn();
  console.log("THe start player is " +player1.myTurn());
  let player2Name = prompt("Enter player 2 name");
  player2 = Person(player2Name);
  render();
})