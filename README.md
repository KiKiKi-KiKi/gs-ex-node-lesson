# G's ex node hands-on

## Set up firebase

### install firebase tools

https://github.com/firebase/firebase-tools

```sh
$ npm install -g firebase-tools
```

> 重要: Node.js バージョン 10、12、14（ベータ版）がサポートされています。これらのバージョンの Node.js の継続的なサポートに関する重要な情報については、ランタイム オプションを設定するをご覧ください。  
> https://firebase.google.com/docs/functions/get-started?hl=ja

- node ~~`v14.16.0`~~ `v12.21.0`
- firebase-tools `v9.8.0`

Check version `npm list -g --depth=0`

### firebase init

```sh
# login
$ firebase login
# project init
$ firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.
x Functions

? Please select an option:
x Use an existing project

? What language would you like to use to write Cloud Functions?
  JavaScript
  TypeScript

? Do you want to use ESLint to catch probable bugs and enforce style? (Y/n) Y

? Do you want to install dependencies with npm now? (Y/n) Y
```

## Development

### Start local server

```sh
$ firebase serve
i  functions: Watching "/Users/kikiki/Documents/local/hands-on/gs-ex-node-lesson/functions" for Cloud Functions...
⚠  Error: Cannot find module '/Users/kikiki/Documents/local/hands-on/gs-ex-node-lesson/functions/lib/index.js'. Please verify that the package.json has a valid "main" entry
```

:point_down:

```sh
$ cd functions
$ npm run serve
...
✔  functions[helloWorld]: http function initialized (http://localhost:5001/gs-hands-on/us-central1/helloWorld).
```

:tada:

### How to test running function

```sh
$ curl http://localhost:5001/<path>/<to>/<function_name>
```

## How to deploy

```sh
$ firebase deploy --only functions
```

or

```sh
$ cd functions
$ npm run deploy
...
✔  Deploy complete!
Project Console: https://console.firebase.google.com/project/gs-hands-on/overview
```

:tada: Access firebase console to check deployed URL!

---

## :tractor: Hello Express

### install

```sh
$ npm install express
$ npm install -D @types/express
```

## Express with Firebase Cloud functions!

```ts
import * as functions from "firebase-functions";
import express = require("express");

const app: express.Express = express();

app.get("/hello", (req: express.Request, res: express.Response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  res.send("Hello Express!");
});

export const api = functions.https.onRequest(app);
```

cf. https://qiita.com/karak/items/29ff148788f5abb15331

## Async

- request https://www.npmjs.com/package/request
- request-promise-native https://www.npmjs.com/package/request-promise-native

:warning: These packages are deprecated!

> As of Feb 11th 2020, request is fully deprecated. No new changes are expected to land. In fact, none have landed for some time.  
> For more information about why request is deprecated and possible alternatives refer to [this](https://github.com/request/request/issues/3142) issue.  
> https://github.com/request/request

> As of Feb 11th 2020, [request](https://github.com/request/request) is fully deprecated. No new changes are expected to land. In fact, none have landed for some time. This package is also deprecated because it depends on request.  
> https://github.com/request/request-promise-native

cf. https://qiita.com/hide2018/items/0507e488d91e28592ca4

- node-fetch https://www.npmjs.com/package/node-fetch
- axios https://www.npmjs.com/package/axios

### node-fetch with TypeScript

```sh
$ npm install node-fetch
$ npm install -D @types/node-fetch
```

### cors

```sh
$ npm install cors
$ npm install -D @types/cors
```

---

## Connect Cloud Firestore

### install firebase-admin

```sh
$ npm install firebase-admin
```

### Generate Secret key

1. Access firebase console
2. Go project page
3. Project settings
4. Service account tab
5. Generate new secret key
6. Download `serviceAccountKey.json`
7. Put `serviceAccountKey.json` in project

### Connect firebase

```js
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
```

