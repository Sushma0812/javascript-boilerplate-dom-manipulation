const isManagerHappy = false;

const willGetGoodHike = new Promise((resolve,reject) => {
    if(isManagerHappy){
        const phone = {
            brand : 'apple XR Max',
            color : 'GOLD'
        };
        resolve(phone)
    }
    else{
        const reason = new Error('Manager is not happy');
        reject(reason);
    }
    }
);
const postHike = function(phone){
    const message = `My new phone is ${phone.brand}. color is ${phone.color}.`;
    return Promise.resolve(message);
}

const yearEnd = function(){
    willGetGoodHike
    .then(postHike)
    .then(fulfilled => console.log(fulfilled))// resolved condition result
    .catch(error => console.log(error.message));// reject condition result
};

yearEnd();



// way 1
function add(a,b){
    return a+b;
}
// way 2  arrow function ES6
const add = (a,b) => {
    return a+b;
}

// way 3
const add = (a,b) => a+b;

// way 4
const add = a => a+2;






















