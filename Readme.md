<p align="center">
«-(¯`v´¯)-« <a href="https://www.npmjs.com/package/multi-encoder">【🇲​🇺​🇱​🇮​🇹​-🇪​🇳​🇨​🇴​🇩​🇪​​】</a> »-(¯`v´¯)-»
<br /><a href="https://en.wikipedia.org/wiki/Base64">multi-encoder</a> string encode and decode
</p>
<p align="center">
<a href="https://travis-ci.org/Amourspirit/node-multi-encoder"><img src="https://travis-ci.org/Amourspirit/node-multi-encoder.svg?branch=master" /></a>
<a href="https://snyk.io/test/github/Amourspirit/node-multi-encoder?targetFile=package.json"><img src="https://snyk.io/test/github/Amourspirit/node-multi-encoder/badge.svg?targetFile=package.json" />
<img src="https://img.shields.io/github/package-json/v/Amourspirit/node-multi-encoder.svg" />
<img src="https://img.shields.io/github/license/Amourspirit/node-multi-encoder.svg" />
</a>
</p>

# multi-encoder

Encodes and Decodes to several formats:

* encode Base64
* decode Base64
* encode Uri
* decode Uri
* encode UriComponent
* decode UriComponent
* encode Javascript
* decode JavaScript
* encode TypeScript
* decode TypeStript

## Install

```sh
$ npm install --save base64-string
```

## Usage

```ts
import { codeString, eKind, eProcess } from 'multi-encoder';
// other code

// encodes hello world as base64
// result is aGVsbG8gd29ybGQ=
let str = codeString('hello world', eKind.base64, eProcess.encode);

// decodes base64 into hello world
let str = codeString('aGVsbG8gd29ybGQ=', eKind.base64, eProcess.decode);

let uriStr = 'my test.asp?name=ståle&car=saab';
// encodes as uri result: 'my%20test.asp?name=st%C3%A5le&car=saab'
const uriEnc = codeString(uriStr, eKind.uri, eProcess.encode);

// decodes uri value result: 'my test.asp?name=ståle&car=saab'
str = codeString(uriEnc, eKind.uri, eProcess.decode);

uriStr = 'https://someurl.com/my test.asp?name=ståle&car=saab';
// encodes as urlComponent
// result: 'https%3A%2F%2Fsomeurl.com%2Fmy%20test.asp%3Fname%3Dst%C3%A5le%26car%3Dsaab' 
uriEnc = codeString(uriStr, eKind.uriComponent, eProcess.encode);

// decodes urlComponent
// result: 'https://someurl.com/my test.asp?name=ståle&car=saab'
str = codeString(uriEnc, eKind.uriComponent, eProcess.decode);

// also encode / decode JavaScript or TypeScript for safe JavaScript or TypeScript string
str = codeString('some JavaScript code', eKind.jsString, eProcess.encode);
str = codeString('some encoded JavaScript code', eKind.jsString, eProcess.decode);

str = codeString('some TypeScript code', eKind.tsString, eProcess.encode);
str = codeString('some encoded TypeScript code', eKind.tsString, eProcess.decode);
```