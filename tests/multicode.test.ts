import { expect } from 'chai';
import * as fs from 'fs';
// import * as mocha from "mocha";
import { codeString, eKind, eProcess } from "../src/multicode";
const sampleJs = process.cwd() + '/tests/fixtures/sample.js';
const base64enc = process.cwd() + '/tests/fixtures/base64enc.txt';
const jsenc = process.cwd() + '/tests/fixtures/jsencode.txt';
const encodedUrlData = process.cwd() + '/tests/fixtures/encodedUrlData.txt';
const decodedUrlData = process.cwd() + '/tests/fixtures/decodedUrlData.txt'
const tsdecoded = process.cwd() + '/tests/fixtures/tsdecoded.txt';
const tsencoded = process.cwd() + '/tests/fixtures/tsencoded.txt'

// #region Encoding string
describe("Encode Strings", () => {
  it('should encode string to uri', (done) => {
    const uriStr = 'my test.asp?name=ståle&car=saab';
    const uriEnc = 'my%20test.asp?name=st%C3%A5le&car=saab';
    const str = codeString(uriStr, eKind.uri, eProcess.encode);
    expect(str).equal(uriEnc);
    done();
  });
  it('should encode string to uriComponent', (done) => {
    const uriStr = 'https://someurl.com/my test.asp?name=ståle&car=saab';
    const uriEnc = 'https%3A%2F%2Fsomeurl.com%2Fmy%20test.asp%3Fname%3Dst%C3%A5le%26car%3Dsaab';
    const str = codeString(uriStr, eKind.uriComponent, eProcess.encode);
    expect(str).equal(uriEnc);
    done();
  });
  it('should encode hello world to base64', (done) => {
    const str = codeString('hello world', eKind.base64, eProcess.encode);
    expect('aGVsbG8gd29ybGQ=').equal(str);
    done();
  });
  it('should base64 encode fixture sample.js into string and that string should match base64enc.txt fixture', (done) => {
    const src = fs.readFileSync(sampleJs).toString();
    const enc = codeString(src,eKind.base64, eProcess.encode);
    const dest = fs.readFileSync(base64enc).toString();
    expect(enc).equal(dest);
    done();
  });
  it('should base64 url encode fixture decodedUrlData.txt into string and that string should match encodedUrlData.txt fixture', (done) => {
    const src = fs.readFileSync(decodedUrlData).toString();
    const enc = codeString(src, eKind.base64Uri, eProcess.encode);
    const dest = fs.readFileSync(encodedUrlData).toString();
    expect(enc).equal(dest);
    done();
  });
  it('should js encode fixture sample.js into string and that string should match jsencode.txt fixture', (done) => {
    const src = fs.readFileSync(sampleJs).toString();
    const enc = codeString(src, eKind.jsString, eProcess.encode);
    const dest = fs.readFileSync(jsenc).toString();
    expect(enc).equal(dest);
    done();
  });
  it('should ts encode fixture tsdecoded.txt into string and that string should match tsencoded.txt fixture', (done) => {
    const src = fs.readFileSync(tsdecoded).toString();
    const dest = fs.readFileSync(tsencoded).toString();
    const enc = codeString(src, eKind.tsString, eProcess.encode);
    expect(enc).equal(dest);
    done();
  });
});
// #endregion
// #region Decoding String
describe("Decode Strings", () => {
  it('should decode string from uri', (done) => {
    const uriEnc = 'my test.asp?name=ståle&car=saab';
    const uriStr = 'my%20test.asp?name=st%C3%A5le&car=saab';
    const str = codeString(uriStr, eKind.uri, eProcess.decode);
    expect(str).equal(uriEnc);
    done();
  });
  it('should decode string from uriComponent', (done) => {
    const uriEnc = 'https://someurl.com/my test.asp?name=ståle&car=saab';
    const uriStr = 'https%3A%2F%2Fsomeurl.com%2Fmy%20test.asp%3Fname%3Dst%C3%A5le%26car%3Dsaab';
    const str = codeString(uriStr, eKind.uriComponent, eProcess.decode);
    expect(str).equal(uriEnc);
    done();
  });
  it('should decode base64 string to  hello world', (done) => {
    const str = codeString('aGVsbG8gd29ybGQ=', eKind.base64, eProcess.decode);
    expect('hello world').equal(str);
    done();
  });
  it('should base64 decode fixture base64enc.txt into string and that string should match sample.js fixture', (done) => {
    const dest = fs.readFileSync(sampleJs).toString();
    const src = fs.readFileSync(base64enc).toString();
    const enc = codeString(src, eKind.base64, eProcess.decode);
    expect(enc).equal(dest);
    done();
  });
  it('should base64 url decode encodedUrlData.txt fixture  into string and that string should match decodedUrlData.js fixture', (done) => {
    const src = fs.readFileSync(encodedUrlData).toString();
    const dest = fs.readFileSync(decodedUrlData).toString();
    const enc = codeString(src, eKind.base64Uri, eProcess.decode);
    expect(enc).equal(dest);
    done();
  });
  it('should js decode fixture jsencode.txt into string and that string should match sample.js fixture', (done) => {
    const src = fs.readFileSync(jsenc).toString();
    const dest = fs.readFileSync(sampleJs).toString();
    const enc = codeString(src, eKind.jsString, eProcess.decode);
    expect(enc).equal(dest);
    done();
  });
  it('should ts decode fixture tsencoded.txt into string and that string should match tsdecoded.txt fixture', (done) => {
    const dest = fs.readFileSync(tsdecoded).toString();
    const src = fs.readFileSync(tsencoded).toString();
    const enc = codeString(src, eKind.tsString, eProcess.decode);
    expect(enc).equal(dest);
    done();
  });
});
// #endregion