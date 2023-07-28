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

## Installation
1. Copy paste this block to your package.json:
```json
{  
  "resolutions": {
    "react-native-crypto/pbkdf2": "3.1.2",
    "react-native-crypto/public-encrypt/parse-asn1/pbkdf2": "3.1.2",
    "react-native-random-bytes/buffer": "^6.0.3"
  }
}
```
2. Install the library
```bash
yarn add @kitzen/react-native-bip39
yarn add buffer ^6.0.3
# You must run this manually before running MetroJs server
# Otherwise you'll get: "Cannot read properties of undefined (reading 'seed')"
cd ./android
./gradlew build
cd .. && npm start
# metro will not automatically apply native changes so press A to deploy
```
Open your `yarn.lock` file and make sure that dependencies are resolved according to [package.json](https://www.npmjs.com/package/@kitzen/react-native-bip39?activeTab=code) resolutions section.

