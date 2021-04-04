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
```
