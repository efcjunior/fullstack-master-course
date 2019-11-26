const sleep = function (ms) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){resolve('After 2 seconds...')},ms)
    })
};

const start = async function (){
    console.log('Hi!')
    let response = await sleep(2000);
    console.log(response)
}

start()