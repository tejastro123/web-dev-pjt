
function getdata(dataid){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(" data",dataid);
            resolve("success");
        },2000);
    });
}

//async-await
async function getalldata(){
    console.log("getting data1...");
    await getdata(1);
    console.log("getting data2...");
    await getdata(2);
    console.log("getting data3...");
    await getdata(3);
}


//promise-chain
console.log("getting data1...");
getdata(1)
       .then((res)=>{
        console.log("getting data2...");
        return getdata(2);
       })
       .then((res)=>{
        console.log("getting data3...");
        return getdata(3);
       })
       .then((res) => {
        console.log(res);
       });


// callback-hell
console.log("getting data1...");
getdata(1, () => {
    console.log("getting data2...");
    getdata(2, () => {
        console.log("getting data3...");
        getdata(3);
    });
});