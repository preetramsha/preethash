import { HashManager } from "./app.js";

//init the class by giving csv filename or don't and the API/pass key
//init have to be dont both at client side (to generate unique hash everytime)
// and server side (to check the unique hash is correct and not previously used)
const hm = new HashManager(undefined,'preet');

//done at client side. RAW API KEY↓↓↓
const h = await hm.generateHash('preet', 5);
//done at serverside. returns true if hash is new and ok. 
//else returns false if hash is used or wrong rawtext is given
hm.checkAndStoreHash(h).then(res => console.log(res));