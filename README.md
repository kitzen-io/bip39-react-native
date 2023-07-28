## bip39 with android support
[Bip39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) is a BTC proposal for improval on BTC network that allows to generate a private key using 12-24 mneumonic words.


## Why we need this instead of npm's bip39?
Original [bip39](https://github.com/bitcoinjs/bip39) js library requires runtime implementation of crypto, e.g. [v8](https://v8.dev/) provides [globalThis.crypto](https://developer.mozilla.org/en-US/docs/Web/API/crypto_property), but [Hermes](https://reactnative.dev/docs/hermes) doesn't.
So this library comes with polyfills for
 - [buffer](https://developer.mozilla.org/en-US/docs/Glossary/Buffer)
 - [react-native-crypto](https://www.npmjs.com/package/react-native-crypto)
 - [react-native-random-bytes](https://www.npmjs.com/package/react-native-randombytes)

As native implementation for both from Android and IOS.
It was forked from [react-native-bip39](https://github.com/valora-inc/react-native-bip39), but original version have issues with
 - Dependencies, which are resolved here. E.g. require changed from original code.
 - Installation tips
 - Proper subdependency graph resolution.  E.g. Buffer should be a version 6.x.x, but original library resolves it to 4.9.1, which causes runtime crashes.

## Installation
```bash
yarn add @kitzen/react-native-bip39
yarn add buffer ^6.0.3
// You must run this manually before first Metro setup
cd ./android
./gradlew build
```
Open your `yarn.lock` file and make sure that dependencies are resolved according to [package.json](https://www.npmjs.com/package/@kitzen/react-native-bip39?activeTab=code) resolutions section.

