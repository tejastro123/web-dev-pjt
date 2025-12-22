let userscore = 0;
let compscore =0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userscorepara = document.querySelector("#user-score");
const compscorepara = document.querySelector("#comp-score");

const genCompchoice = () =>{
  const options = ["rock" , "paper" , "scissors"];
  const randix = Math.floor(Math.random() * 3);
  return options[randix];
}
 
const drawgame = () =>{
    console.log("game is draw.");
    msg.innerText = " game was draw,play again!";
    msg.style.backgroundColor = "#081b31";
}
 
const showWinner = (userwin) =>{
   if(userwin === true){
    console.log("you win");
    userscore++;
    userscorepara.innerText = userscore;
    msg.innerText = "you win!";
    msg.style.backgroundColor = "green";
   }
   else{
    console.log("you lose");
    compscore++;
    compscorepara.innerText = compscore;
    msg.innerText = "you lose!";
    msg.style.backgroundColor = "red";
   }
}

const playGame = (userchoice) =>{
   console.log("userchoice = ",userchoice);
   const compchoice = genCompchoice();
   console.log("compchoice = ",compchoice);

   if(userchoice === compchoice)
   {
      drawgame();
   }
   else{
    let userwin = true;
    if(userchoice === "rock")
    {
        userwin = compchoice === "paper" ? false : true ;
    }
    else if(userchoice === "paper")
    {
        userwin = compchoice === "scissors" ? false : true ;
    }
    else
    {
        userwin = compchoice === "rock" ? false : true ;
    }
 showWinner(userwin);

   }
}

choices.forEach((choice)=>{
    console.log(choice);
    choice.addEventListener("click",()=>{
        let userchoice = choice.getAttribute("id");
        playGame(userchoice);
    })
})

