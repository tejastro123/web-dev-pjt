let boxes=document.querySelectorAll(".smallBoxes");

let xturn=true;

let markFunc =() =>{
    if(xturn){
        boxes.innerHTML=X;
        xturn=false;
    }
    else{
        boxes.innerhtml=O;
        xturn=true;
    }
}


let winningPatters=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

