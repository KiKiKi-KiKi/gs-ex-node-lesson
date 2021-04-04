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

