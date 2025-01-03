import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { access } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonFile = join(__dirname, 'feeds.json');

// console.log(jsonFile);
export async function getLinks(){
    
}

export async function saveLinks(){

}