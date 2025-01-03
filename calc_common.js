const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question() {

    rl.question("Enter the equation : ", (input) => {
        if (input === 'quit') {
            rl.close();
        } else {
            try {
                const value = eval(input);
                console.log(`${value}`);
            } catch (exception) {
                console.log("I don't know how to do that.");

            }
            question();
        }


    });
}
question();

