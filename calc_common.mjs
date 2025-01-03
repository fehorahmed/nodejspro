import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';


const rl = readline.createInterface({ input, output });


function question(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}


let answer = await question('Enter the equation : ');

while (answer != 'quit') {
    try {
        const value = eval(answer);
        console.log(`${value}`);
    } catch (exception) {
        console.log("I don't know how to do that.");

    }

    answer = await question('Enter the equation : ');
}

rl.close();



