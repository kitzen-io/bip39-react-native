[![npm version](https://img.shields.io/npm/v/@kitzen/react-native-bip39.svg)](https://www.npmjs.com/package/@kitzen/react-native-bip39) 
[![from kitzen with Love](https://img.shields.io/badge/from%20kitzen%20with-%F0%9F%A4%8D-red)](https://kitzen.io/) 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kitzen-io/bip39-react-native/blob/master/LICENSE)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/kitzen-io/bip39-react-native/issues/new)
![test](https://github.com/kitzen-io/bip39-react-native/workflows/build-publish/badge.svg) 
[![Known Vulnerabilities](https://snyk.io/test/github/kitzen-io/react-native-bip39/badge.svg)](https://snyk.io/test/github/kitzen-io/react-native-bip39)

# Bip39 with android support
[Bip39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) is a BTC proposal for improval on BTC network that allows to generate a private key using 12-24 mneumonic words.

### Why we need this instead of npm's bip39?
Original [bip39](https://github.com/bitcoinjs/bip39) js library requires runtime implementation of crypto, e.g. [v8](https://v8.dev/) provides [globalThis.crypto](https://developer.mozilla.org/en-US/docs/Web/API/crypto_property), but [Hermes](https://reactnative.dev/docs/hermes) doesn't.
So this library comes with polyfills for
 - [buffer](https://developer.mozilla.org/en-US/docs/Glossary/Buffer)
 - [react-native-crypto](https://www.npmjs.com/package/react-native-crypto)
 - [react-native-random-bytes](https://www.npmjs.com/package/react-native-randombytes)

As native implementation for both from Android and IOS.
It was forked from [react-native-bip39](https://github.com/valora-inc/react-native-bip39), but original version have issues with
 - Dependencies, which are resolved here. E.g. require changed from original code.
 - Installation tips
 - Typescript support

# Installation
1. Copy paste this block to your package.json:
```json
{  
  "dependencies": {
    "react-native-crypto": "*",
    "react-native-randombytes": "*"
  },
  "resolutions": {
    "@kitzen/react-native-bip39/react-native-crypto/pbkdf2": "3.1.2",
    "@kitzen/react-native-bip39/react-native-crypto/public-encrypt/parse-asn1/pbkdf2": "3.1.2",
    "@kitzen/react-native-bip39/react-native-random-bytes/buffer": "^6.0.3"
  }
}
```
This is required! 
 - Resolutions are not applied from nested modules. So manual setup is required
 - Duplicating dependencies is required so react could pull up list of packages it needs to check as native modules, otherwise you'll get [undefined RNRandomBytes.seed](https://stackoverflow.com/questions/67019573/typeerror-null-is-not-an-object-evaluating-rnrandombytes-seed-react-native/76767229#76767229)

2. Install the library
```bash
yarn add @kitzen/react-native-bip39
yarn add buffer ^6.0.3
# You must run this manually before running MetroJs server
# Otherwise you'll get: "Cannot read properties of undefined (reading 'seed')"
cd ./android
./gradlew build
cd .. && npm start
# metro will not automatically apply native changes. Thus please press 'A' to deploy android
```
3. Open your `yarn.lock` file and make sure that dependencies are resolved according to [package.json](https://www.npmjs.com/package/@kitzen/react-native-bip39?activeTab=code) resolutions section.

# Contributing
We deeply appreciate the valuable contributions made by our community. 
To provide feedback or report bugs, [kindly open a GitHub issue](https://github.com/kitzen-io/bip39-react-native/issues/new).
For code contributions, explore our "Contributing" guidelines and become part of our open-source community. 

Thank you to all the dedicated individuals who contribute; your passion drives our success. Together, we shape the future of web3 industry.

<a href="https://github.com/kitzen-io/bip39-react-native/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kitzen-io/bip39-react-native&max=400&columns=20" />
  <img src="https://us-central1-tooljet-hub.cloudfunctions.net/github" width="0" height="0" />
</a>
