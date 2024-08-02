//client side
import { HashManager } from "./index.js";
//init the class by giving csv filename (or don't to use default used_hashes.csv) and the API/pass key
//init have to be dont both at client side (to generate unique hash everytime)
// and server side (to check the hash is unique, correct and not previously used)
const hm = new HashManager(undefined,'followMeOnTwitter:@preetramsha');
const hash = await hm.generateHash();
//use ↑↑↑ this instead of raw API key

//server side
//import { HashManager } from "./app.js";
const hm1 = new HashManager(undefined,'followMeOnTwitter:@preetramsha');
//if hash is new and ok returns true 
// else if hash is used or wrong rawtext is given returns false 
hm1.checkAndStoreHash(hash).then(res => console.log(res));