function resolveAfter2Seconds(x){
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('inside resolve Ater 2 sec function');
            resolve(x);
        },2000);
    });
}
// async function add(x){
//     const a = await resolveAfter2Seconds(20);
//     const b = await resolveAfter2Seconds(30);
//     return x+a+b;
// }
function add(x){
    const a = resolveAfter2Seconds(20);
    const b = resolveAfter2Seconds(30);
    return x+a+b;
}
console.log(add(10));


// add(10).then(v => {
//     console.log("result = ",v);
    
// })

