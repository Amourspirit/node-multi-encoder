'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var base64_string_1 = require('base64-string');
var eKind;
(function(eKind) {
	eKind[(eKind['uri'] = 0)] = 'uri';
	eKind[(eKind['uriComponent'] = 1)] = 'uriComponent';
	eKind[(eKind['base64'] = 2)] = 'base64';
	eKind[(eKind['base64Uri'] = 3)] = 'base64Uri';
	eKind[(eKind['jsString'] = 4)] = 'jsString';
	eKind[(eKind['tsString'] = 5)] = 'tsString';
})((eKind = exports.eKind || (exports.eKind = {})));
var eProcess;
(function(eProcess) {
	eProcess[(eProcess['encode'] = 0)] = 'encode';
	eProcess[(eProcess['decode'] = 1)] = 'decode';
})((eProcess = exports.eProcess || (exports.eProcess = {})));
exports.codeString = function(s, e, p) {
	if (e === void 0) {
		e = eKind.base64;
	}
	if (p === void 0) {
		p = eProcess.encode;
	}
	if (p === eProcess.decode) {
		return decodeString(s, e);
	}
	return encodeString(s, e);
};
var jsStringEncode = function(s) {
	var result = s
		.replace(/"/g, '\\"')
		.replace(/'/g, "\\'")
		.replace(/`/g, '\\`')
		.replace(/(\$)/g, '\\$1')
		.replace(/\n/g, '\\n')
		.replace(/\r/g, '\\r');
	return result;
};
var tsStringEncode = function(s) {
	var result = s
		.replace(/(\\+)/g, '\\$1')
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
var jsStringDecode = function(s) {
	var result = s
		.replace(/\\+r/g, function(value) {
			if (value.length === 2) {
				return '\r';
			}
			return value.substring(2);
		})
		.replace(/\\+n/g, function(value) {
			if (value.length === 2) {
				return '\n';
			}
			return value.substring(2);
		})
		.replace(/\\+"/g, function(value) {
			if (value.length === 2) {
				return '"';
			}
			return value.substring(2);
		})
		.replace(/\\+'/g, function(value) {
			if (value.length === 2) {
				return "'";
			}
			return value.substring(2);
		})
		.replace(/\\+`/g, function(value) {
			if (value.length === 2) {
				return '`';
			}
			return value.substring(2);
		})
		.replace(/\\+\$/g, function(value) {
			if (value.length === 2) {
				return '$';
			}
			return value.substring(2);
		});
	return result;
};
var tsStringDecode = function(s) {
	var result = s
		.replace(/\\+r/g, function(value) {
			if (value.length === 2) {
				return '\r';
			}
			return value.substring(2);
		})
		.replace(/\\+n/g, function(value) {
			if (value.length === 2) {
				return '\n';
			}
			return value.substring(2);
		})
		.replace(/\\+"/g, function(value) {
			if (value.length === 2) {
				return '"';
			}
			return value.substring(2);
		})
		.replace(/\\+'/g, function(value) {
			if (value.length === 2) {
				return "'";
			}
			return value.substring(2);
		})
		.replace(/\\+`/g, function(value) {
			if (value.length === 2) {
				return '`';
			}
			return value.substring(2);
		})
		.replace(/\\+\$/g, function(value) {
			if (value.length === 2) {
				return '$';
			}
			return value.substring(2);
		});
	return result;
};
var base64Encode = function(s) {
	var b64 = new base64_string_1.Base64();
	return b64.encode(s);
};
var base64EncodeUri = function(s) {
	var b64 = new base64_string_1.Base64();
	return b64.urlEncode(s);
};
var base64Decode = function(s) {
	var b64 = new base64_string_1.Base64();
	return b64.decode(s);
};
var decodeString = function(s, e) {
	if (s.length === 0) {
		return '';
	}
	var result;
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
var encodeString = function(s, e) {
	if (s.length === 0) {
		return '';
	}
	var result;
	switch (e) {
		case eKind.uri:
			result = encodeURI(s);
			break;
		case eKind.uriComponent:
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
