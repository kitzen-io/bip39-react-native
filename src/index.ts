// @ts-ignore
import {nfkd} from 'unorm';
// @ts-ignore
import {pbkdf2Sync as pbkdf2, createHash} from 'react-native-crypto';
// @ts-ignore
import {randomBytes} from 'react-native-randombytes'
import DEFAULT_WORDLIST from 'bip39/src/wordlists/english.json';
// @ts-ignore
import {Buffer} from "buffer";


function assert(assertion: boolean, error: string) {
  if (!assertion) {
    throw Error(`assertion error ${error}`)
  }
}

export function mnemonicToSeed(mnemonic: string, password: string = '') {
  let mnemonicBuffer = new Buffer(mnemonic, 'utf8')
  let saltBuffer = new Buffer(salt(password), 'utf8')

  return pbkdf2(mnemonicBuffer, saltBuffer, 2048, 64, 'sha512')
}

function mnemonicToSeedHex(mnemonic: string, password: string) {
  return mnemonicToSeed(mnemonic, password).toString('hex')
}

function mnemonicToEntropy(mnemonic: string, wordlist: string[]) {
  wordlist = wordlist || DEFAULT_WORDLIST

  let words = mnemonic.split(' ')
  assert(words.length % 3 === 0, 'Invalid mnemonic')

  let belongToList = words.every(function (word) {
    return wordlist.indexOf(word) > -1
  })

  assert(belongToList, 'Invalid mnemonic')

  // convert word indices to 11 bit binary strings
  let bits = words.map(function (word) {
    let index = wordlist.indexOf(word)
    return lpad(index.toString(2), '0', 11)
  }).join('')

  // split the binary string into ENT/CS
  let dividerIndex = Math.floor(bits.length / 33) * 32
  let entropy = bits.slice(0, dividerIndex)
  let checksum = bits.slice(dividerIndex)

  // calculate the checksum and compare
  let entropyBytes = entropy.match(/(.{1,8})/g)!.map(function (bin) {
    return parseInt(bin, 2)
  })
  let entropyBuffer = new Buffer(entropyBytes)
  let newChecksum = checksumBits(entropyBuffer)

  assert(newChecksum === checksum, 'Invalid mnemonic checksum')

  return entropyBuffer.toString('hex')
}

function entropyToMnemonic(entropy: string, wordlist: string[] = DEFAULT_WORDLIST) {
  let entropyBuffer = new Buffer(entropy, 'hex')
  let entropyBits = bytesToBinary([].slice.call(entropyBuffer))
  let checksum = checksumBits(entropyBuffer)

  let bits = entropyBits + checksum
  let chunks = bits.match(/(.{1,11})/g)

  let words = chunks!.map(function (binary) {
    let index = parseInt(binary, 2)

    return wordlist[index]
  })

  return words.join(' ')
}

export function generateMnemonic(
  strength: number = 128,
  rng: (a: number, cb: (a: any, b: any) => any) => void = randomBytes,
  wordlist: string[] = DEFAULT_WORDLIST
): Promise<string> {
  return new Promise((resolve, reject) => {
    rng(strength / 8, (error, randomBytesBuffer) => {
      if (error) {
        reject(error)
      } else {
        resolve(entropyToMnemonic(randomBytesBuffer.toString('hex'), wordlist))
      }
    })
  })
}

function validateMnemonic(mnemonic: string, wordlist: string[]) {
  try {
    mnemonicToEntropy(mnemonic, wordlist)
  } catch (e) {
    return false
  }

  return true
}

function checksumBits(entropyBuffer: Buffer) {
  let hash = createHash('sha256').update(entropyBuffer).digest()

  // Calculated constants from BIP39
  let ENT = entropyBuffer.length * 8
  let CS = ENT / 32

  return bytesToBinary([].slice.call(hash)).slice(0, CS)
}

function salt(password: string) {
  return 'mnemonic' + (nfkd(password) || '') // Use unorm until String.prototype.normalize gets better browser support
}

//=========== helper methods from bitcoinjs-lib ========

function bytesToBinary(bytes: string[]) {
  return bytes.map(function (x) {
    // @ts-ignore
    return lpad(x.toString(2), '0', 8)
  }).join('');
}

function lpad(str: string, padString: string, length: number) {
  while (str.length < length) str = padString + str;
  return str;
}
