import bcrypt from "bcryptjs";
import fs from 'fs';
import readline from 'readline';

class HashManager {
    constructor(csvfilename='used_hashes.csv',password) {
        this.password = password;
        this.filename = csvfilename;
        if (!fs.existsSync(this.filename)) {
            fs.writeFileSync(this.filename, 'hash\n');
        }
    }
    async generateHash(rawText,salt) {
        return bcrypt.hashSync(rawText.toString(), parseInt(salt));
    }
    writeUsedHash(hash) {
        fs.appendFileSync(this.filename, `${hash}\n`);
    }

    async doesHashExist(hash) {
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: fs.createReadStream(this.filename),
                crlfDelay: Infinity
            });

            let found = false;
            rl.on('line', (line) => {
                if (line.trim() === hash) {
                    found = true;
                    rl.close();
                }
            });

            rl.on('close', () => {
                resolve(found);
            });

            rl.on('error', (err) => {
                reject(err);
            });
        });
    }

    async checkAndStoreHash(hash) {
        if (await this.doesHashExist(hash)) {
            console.log('Hash already exists:', hash);
            return false;
        }

        const ok = await bcrypt.compare(this.password, hash);
        if (ok) {
            console.log('Valid hash, writing to file:', hash);
            this.writeUsedHash(hash);
            return true;
        } else {
            console.log('Invalid hash:', hash);
            return false;
        }
    }
}

export{
    HashManager
}

// // Example usage
// (async () => {
//     const hashManager = new HashManager('usedhashes.csv','krishna');
//     let hash1 = await hashManager.generateHash("krishna", 5);
//     //let hash1 = '$2a$05$IxqqzPUWRZDCaCCu3EWsnumIf4JftAD06.WH0lqQFD0XPfISvC7ki'
//     try {
//         const result = await hashManager.checkAndStoreHash(hash1);
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// })();