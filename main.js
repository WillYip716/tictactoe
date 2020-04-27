

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
        break;
      }
    }
  }
  const reset = () => this.board = [[0,0,0],[0,0,0],[0,0,0]];
  const currentBoard = () => this.board;
  return {add,checkWinner,reset,currentBoard,checkTie};
})();

const Person = (name) => {
  this.turn = false;
  this.myName = name;
  const switchTurn = function(){
    if(turn){
      turn = false;
    }
    else{
      turn = true;
    }
  }; 
  const sayName = () => `${myName}`;
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
}

let addMark = function(y,x){
  let element = document.getElementById(y+"_"+x);
  console.log("the turn is "+ player1.myTurn());
  if(player1.myTurn()){
    element.innerHTML = "O";
  }
  else{
    element.innerHTML = "X";
  }
  element.onclick = function(){};
  GameBoard.add(y,x);
  if(GameBoard.checkWinner()){
    let winnerMessage = "";
    if(player1.myTurn()){
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
}

let player1 = Person("man");
let player2 = Person("woman");

window.addEventListener("load", function(){
  
  
  //let player1Name = prompt("Enter player 1 name");
  //player1 = Person(player1Name);
  player1.switchTurn();
  console.log("THe start player is " +player1.myTurn());
  //let player2Name = prompt("Enter player 2 name");
  //player2 = Person(player2Name);
  render();
})