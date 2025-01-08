import { getLinks, saveLinks } from './feed-manager.mjs';
import { question, close } from './rl.mjs';
import https from 'https';

const feeds = await getLinks();

let input = await question('Enter command (list,add,del,read,quit): ');

while (input != 'quit') {
    let cmdParts = input.trim().split(' ');
    let cmd = cmdParts[0];
    //list
    if (cmd == 'list') {
        feeds.forEach((url, index) => {
            console.log(`${index}\t${url}`);
        });
    }
    //Add
    if (cmd == 'add') {
        if (cmdParts.length < 2) {
            console.log('Please include the URL with the add command.');
        } else {
            feeds.push(cmdParts[1]);
        }
    }
    //Del
    if (cmd == 'del') {
        if (cmdParts.length < 2) {
            console.log('Please include the Index with the delete command.');
        } else {

            let index = parseInt(cmdParts[1], 10);
            if (index > -1 && index < feeds.length) { // only splice array when item is found
                feeds.splice(index, 1); // 2nd parameter means remove one item only
            } else {
                console.log('The provided index is out of range.');
            }
        }
    }


    if(cmd == 'read'){
        https.get('https://www.reddit.com/r/node.rss',()=>{
        
        });
    }




    input = await question('Enter command (list,add,del,read,quit): ');
}


await saveLinks(feeds);

close();