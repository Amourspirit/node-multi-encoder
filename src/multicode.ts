import { Base64 } from 'base64-string';
// #region enums
/**
 * Kind of encoding or decoding
 * @param uri Encode / decode uri
 * @param uriComponent Encode / decode uri component
 * @param base64 Encode / decode base64
 * @param base64Uri Encode / decode base64 uri
 * @param jsString Encode / decode to javascritp safe string.
 */
export enum eKind {
  /**
   * Encode / decode uri
   */
  uri,
  /**
   * Encode / decode uri component
   */
  uriComponent,
  /**
   * Encode / decode base64
   */
  base64,
  /**
   * Encode / decode base64 uri
   */
  base64Uri,
  /**
   * Encode / decode as javascript string
   */
  jsString,
  /**
   * Encode / decode as typescript string
   */
  tsString
}
/**
 * Enumeration of decode or encode type
 * @param encode Encode value
 * @param decode Decode value
 */
export enum eProcess {
  /**
   * Encode value
   */
  encode,
  /**
   * Decode value
   */
  decode,
}
// #endregion
/**
 * Encode or Decodes a string and returns the result
 * @param s The string to be decoded / decoded
 * @param e (optional) The type of decoding to apply. Defaulats to Base64
 * @param p (optional) Determins if the s it to be encoded or decoded. Defaults to encode
 *
 * Encode or Decodes string can be:
 * * Base64 
 * * base64Uri
 * * jsString
 * * uri
 * * uriComponent
 * @example
 ```ts
  const b64 = codeString('hello world`, ekind.base, eProcess.encode);
  // b64 constains aGVsbG8gd29ybGQ=
 ```
 */
export const codeString = (s: string, e: eKind = eKind.base64, p: eProcess = eProcess.encode): string => {
  if (p === eProcess.decode) {
    return decodeString(s, e);
  }
  return encodeString(s, e);
};
/**
 * Encodes/escapes a string to be consumed by a javascript var
 * @param s The string to TypeScript encode/escape
 * @returns String that is TypeScript encoded
 */
const jsStringEncode = (s: string): string => {
  const result = s
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/`/g, '\\`')
    .replace(/(\$)/g, '\\$1')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
  return result;
};
const tsStringEncode = (s: string): string => {
  const result = s
    .replace(/(\\+)/g, '\\$1') // add two more \\
    .replace(/(\$)/g, '\\$1')
    .replace(/`/g, '\\`')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\\n/g, '\\\\n')
    .replace(/\n/g, '\\n')
    .replace(/\\r/g, '\\\\r')
    .replace(/\r/g, '\\r');
  return result;
};
/**
 * Decodes/unescape a string that is javascript encoded
 * @param s The string to decode/unescape
 * @returns String that has been decoded/unscapted
 */
const jsStringDecode = (s: string): string => {
  const result = s
    .replace(/\\+r/g, (value) => {
      if (value.length === 2) {
        return '\r';
      }
      return value.substring(2);
    })
    .replace(/\\+n/g, (value) => {
      if (value.length === 2) {
        return '\n';
      }
      return value.substring(2);
    })
    .replace(/\\+"/g, (value) => {
      if (value.length === 2) {
        return '"';
      }
      return value.substring(2);
    })
    .replace(/\\+'/g, (value) => {
      if (value.length === 2) {
        return "'";
      }
      return value.substring(2);
    })
    .replace(/\\+`/g, (value) => {
      if (value.length === 2) {
        return '`';
      }
      return value.substring(2);
    })
    .replace(/\\+\$/g, (value) => {
      if (value.length === 2) {
        return '$';
      }
      return value.substring(2);
    });
  return result;
};
/**
 * Decodes/unescape a string that is TypeScript encoded
 * @param s The string to decode/unescape
 * @returns String that has been decoded/unscapted
 */
const tsStringDecode = (s: string): string => {
  const result = s
    .replace(/\\+r/g, (value) => {
      if (value.length === 2) {
        return '\r';
      }
      return value.substring(2);
    })
    .replace(/\\+n/g, (value) => {
      if (value.length === 2) {
        return '\n';
      }
      return value.substring(2);
    })
    .replace(/\\+"/g, (value) => {
      if (value.length === 2) {
        return '"';
      }
      return value.substring(2);
    })
    .replace(/\\+'/g, (value) => {
      if (value.length === 2) {
        return "'";
      }
      return value.substring(2);
    })
    .replace(/\\+`/g, (value) => {
      if (value.length === 2) {
        return '`';
      }
      return value.substring(2);
    })
    .replace(/\\+\$/g, (value) => {
      if (value.length === 2) {
        return '$';
      }
      return value.substring(2);
    });
  return result;
};
/* // https://stackoverflow.com/questions/641407/javascript-negative-lookbehind-equivalent
const reverseString = (s: string): string => {
  return s.split('').reverse().join('');
}
const rxReveseTest = (stringToTests: string[], reversedRegexp: RegExp) => {
  stringToTests.map(reverseString)
    .forEach((s, i) => {
      const match = reversedRegexp.test(s);
      // console.log(stringToTests[i], match, 'token:', match ? reverse(reversedRegexp.exec(s)[0]) : 'Ø');
    });
} */
const base64Encode = (s: string) => {
  const b64 = new Base64();
  return b64.encode(s);
}
const base64EncodeUri = (s: string) => {
  const b64 = new Base64();
  return b64.urlEncode(s);
}
const base64Decode = (s: string) => {
  const b64 = new Base64();
  return b64.decode(s);
}
const decodeString = (s: string, e: eKind): string => {
  if (s.length === 0) {
    return '';
  }
  let result: string;
  switch (e) {
    case eKind.uri:
      result = decodeURI(s);
      break;
    case eKind.uriComponent:
      result = decodeURIComponent(s);
      break;
    case eKind.base64Uri:
    case eKind.base64:
      result = base64Decode(s);
      break;
    case eKind.tsString:
      result = tsStringDecode(s);
      break;
    case eKind.jsString:
      result = jsStringDecode(s);
      break;
    default:
      result = s;
      break;
  }
  return result;
};
const encodeString = (s: string, e: eKind): string => {
  if (s.length === 0) {
    return '';
  }
  let result: string;
  switch (e) {
    case eKind.uri:
      // This function encodes special characters,
      // except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
      result = encodeURI(s);
      break;
    case eKind.uriComponent:
      // This function encodes special characters. In addition, it encodes the following characters: , / ? : @ & = + $ #
      result = encodeURIComponent(s);
      break;
    case eKind.base64:
      result = base64Encode(s);
      break;
    case eKind.base64Uri:
      result = base64EncodeUri(s);
      break;
    case eKind.tsString:
      result = tsStringEncode(s);
      break;
    case eKind.jsString:
      result = jsStringEncode(s);
      break;
    default:
      result = s;
      break;
  }
  return result;
};