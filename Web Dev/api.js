const url = "https://cat-fact.herokuapp.com/facts ";

const factpara = document.querySelector("#fact");
const btn = document.querySelector("#btn");

const getfacts = async () =>{
    console.log("getting data...")
    let promise = await fetch(url);
    console.log(promise); 
  let data = await promise.json();
  factpara.innerText = data[2].text;
}

// function getfacts() {
//     fetch(url)
//     .then((response) =>{
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);
//         factpara.innerText = data[2].text;
//     });
// }
 
btn.addEventListener("click",getfacts);

