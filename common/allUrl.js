
const baseURL = 'http://193.112.16.196:8080';

const KTradeid_addVisit = '/zjzl/guard/saveForeignVisitors';
const KTradeid_visitList = '/zjzl/guard/getForeignVisitorsList';



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




module.exports = {
    ZJValidString: ZJValidString,
	ZJNoEmptyString:ZJNoEmptyString,
	baseURL:baseURL,
	KTradeid_addVisit:KTradeid_addVisit,
	KTradeid_visitList:KTradeid_visitList,
}


