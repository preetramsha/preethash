# HashManager

`HashManager` is a Node.js package that provides functions to generate, store, and validate unique hashes. It uses bcrypt for hashing and a CSV file to keep track of used hashes to ensure that each hash is unique.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Client Side](#client-side)
  - [Server Side](#server-side)
- [API](#api)
  - [HashManager](#hashmanager-class)
    - [constructor](#constructor)
    - [generateHash](#generatehash)
    - [checkAndStoreHash](#checkandstorehash)
- [Example](#example)
- [License](#license)

## Installation

Use the npm package manager to install HashManager.

```bash
npm install bcryptjs
npm install
```

## Usage

### Client Side

Initialize the `HashManager` class by providing a CSV filename (or don't to use the default `used_hashes.csv`) and the API/password key. Initialization must be done both on the client side (to generate a unique hash every time) and on the server side (to check the hash is unique, correct, and not previously used).

```javascript
import { HashManager } from "./app.js";

// Initialize the class with a password & optionally a CSV filename
const hm = new HashManager(undefined, 'followMeOnTwitter:@preetramsha');

// Generate a hash
const hash = await hm.generateHash();
```

### Server Side

```javascript
import { HashManager } from "./app.js";

// Initialize the class with the same password & optionally a CSV filename
const hm1 = new HashManager(undefined, 'followMeOnTwitter:@preetramsha');

// Check if the hash is valid and store it if it is new
hm1.checkAndStoreHash(hash).then(res => console.log(res));
```

## API

### `HashManager` Class

#### `constructor`

Create a new `HashManager`.

```javascript
new HashManager(csvfilename='used_hashes.csv', password)
```

- **csvfilename**: Optional. The CSV filename to store used hashes. Default is `used_hashes.csv`.
- **password**: Required. The password used to generate and validate hashes.

#### `generateHash`

Generate a new hash.

```javascript
generateHash(saltRounds = 5)
```

- **saltRounds**: Optional. The number of salt rounds for bcrypt hashing. Default is 5.
- **Returns**: A promise that resolves to a hashed string.

#### `checkAndStoreHash`

Check if a hash is valid and store it if it is not previously used.

```javascript
checkAndStoreHash(hash)
```

- **hash**: Required. The hash to validate and store.
- **Returns**: A promise that resolves to a boolean (true if hash is new and valid, false otherwise).

## Example

```javascript
import { HashManager } from "./app.js";

(async () => {
    const hashManager = new HashManager('usedhashes.csv', 'krishna');
    
    const hash1 = await hashManager.generateHash();
    // Or use an existing hash for testing
    // const hash1 = '$2a$05$IxqqzPUWRZDCaCCu3EWsnumIf4JftAD06.WH0lqQFD0XPfISvC7ki';
    
    try {
        const result = await hashManager.checkAndStoreHash(hash1);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
})();
```

## License

[MIT](LICENSE)