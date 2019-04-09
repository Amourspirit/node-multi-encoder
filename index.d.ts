/**
 * Kind of encoding or decoding
 * @param uri Encode / decode uri
 * @param uriComponent Encode / decode uri component
 * @param base64 Encode / decode base64
 * @param base64Uri Encode / decode base64 uri
 * @param jsString Encode / decode to javascritp safe string.
 */
export declare enum eKind {
    /**
     * Encode / decode uri
     */
    uri = 0,
    /**
     * Encode / decode uri component
     */
    uriComponent = 1,
    /**
     * Encode / decode base64
     */
    base64 = 2,
    /**
     * Encode / decode base64 uri
     */
    base64Uri = 3,
    /**
     * Encode / decode as javascript string
     */
    jsString = 4,
    /**
     * Encode / decode as typescript string
     */
    tsString = 5
}
/**
 * Enumeration of decode or encode type
 * @param encode Encode value
 * @param decode Decode value
 */
export declare enum eProcess {
    /**
     * Encode value
     */
    encode = 0,
    /**
     * Decode value
     */
    decode = 1
}
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
export declare const codeString: (s: string, e?: eKind, p?: eProcess) => string;
