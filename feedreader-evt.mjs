import { getLinks, saveLinks } from './feed-manager.mjs';
import { rl, close } from './rl.mjs';
import https from 'https';
import axios from 'axios';
import Parser from 'rss-parser';
import { EventEmitter } from 'events';

const feeds = await getLinks();
const parser = new Parser();
const emitter = new EventEmitter();


function prompt() {
    rl.setPrompt('Enter command (list,add,del,read,quit): ');
    rl.prompt();
}

rl.on('line', (input) => {
    let cmdParts = input.trim().split(' ');
    emitter.emit(cmdParts[0], cmdParts[1]);

});


emitter.on('quit', async () => {
    await saveLinks(feeds);
    close();
});

emitter.on('list', async () => {
    feeds.forEach((url, index) => {
        console.log(`${index}\t${url}`);
    });
    prompt();
});

emitter.on('add', async (url) => {
    if (url == undefined) {
        console.log('Please include the URL with the add command.');
    } else {
        feeds.push(url);
    }
    prompt();
});


emitter.on('del', async (index) => {
    if (index == undefined) {
        console.log('Please include the Index with the delete command.');
    } else {
        let index = parseInt(index, 10);
        if (index > -1 && index < feeds.length) { // only splice array when item is found
            feeds.splice(index, 1); // 2nd parameter means remove one item only
        } else {
            console.log('The provided index is out of range.');
        }
    }
    prompt();
});

emitter.on('read', async (index) => {
    if (index == undefined) {
        console.log('Please include the Index with the delete command.');
    } else {
         index = parseInt(index, 10);
        if (index > -1 && index < feeds.length) { // only splice array when item is found
            let { data } = await axios.get(feeds[index]);

            let feed = await parser.parseString(data);
            feed.items.forEach(item => console.log(item.title))
        } else {
            console.log('The provided index is out of range.');
        }
    }
    prompt();
});


prompt();

// let input = await question('Enter command (list,add,del,read,quit): ');

// while (input != 'quit') {
//     let cmdParts = input.trim().split(' ');
//     let cmd = cmdParts[0];
//     //list
//     if (cmd == 'list') {
//         feeds.forEach((url, index) => {
//             console.log(`${index}\t${url}`);
//         });
//     }
//     //Add
//     if (cmd == 'add') {
//         if (cmdParts.length < 2) {
//             console.log('Please include the URL with the add command.');
//         } else {
//             feeds.push(cmdParts[1]);
//         }
//     }
//     //Del
//     if (cmd == 'del') {
//         if (cmdParts.length < 2) {
//             console.log('Please include the Index with the delete command.');
//         } else {

//             let index = parseInt(cmdParts[1], 10);
//             if (index > -1 && index < feeds.length) { // only splice array when item is found
//                 feeds.splice(index, 1); // 2nd parameter means remove one item only
//             } else {
//                 console.log('The provided index is out of range.');
//             }
//         }
//     }


//     if (cmd == 'read') {

//         let { data } = await axios.get('https://www.reddit.com/r/node.rss');

//         console.log(data);
//         let feed = await parser.parseString(data);
//         feed.items.forEach(item => console.log(item.title))
//         // https.get('https://www.reddit.com/r/node.rss', (response) => {
//         // let content = '';
//         // response.on('data', (chunk) => {
//         //     content += chunk;
//         // });
//         // response.on('end', () => {
//         //     console.log(content);
//         // });
//         // });
//     }




//     input = await question('Enter command (list,add,del,read,quit): ');
// }


