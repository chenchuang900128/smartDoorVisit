
const baseURL = 'http://193.112.16.196:8080';

function ZJValidString(obj) {
	
	let str = '';
	if(typeof(obj) == "undefined"){
		return str;
	}
	return obj;
}

function ZJNoEmptyString(obj) {
	
	let str = '--';
	if(typeof(obj) == "undefined"){
		return str;
	}
	return obj;
}


export default{
	
	ZJValidString: ZJValidString,
	ZJNoEmptyString:ZJNoEmptyString,
	baseURL
}
