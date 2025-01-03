process.stdin.on('data',(chunk)=>{
    // console.log(chunk.toString().trim());
    const input = chunk.toString().trim();
    if(input === 'quit'){
        process.exit(0);
    }

    try{
        const value = eval(input);
        console.log(`${value}`);
    }catch(exception){
        console.log("I don't know how to do that.");

    }

process.stdout.write('Enter your simple equation: ');

});


process.stdout.write('Enter your simple equation: ');