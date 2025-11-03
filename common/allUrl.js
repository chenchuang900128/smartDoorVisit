
// https://www.gzzjzl.com  http://193.112.16.196:8080
const baseURL = 'https://www.gzzj.com';
// 是否启用前端 Mock 拦截（后端未就绪时可开启）
const MOCK = true;

const KTradeid_addVisit = '/zjzl/guard/saveForeignVisitors';
const KTradeid_visitList = '/zjzl/guard/getForeignVisitorsList';



function ZJValidString(obj) {
	
	let str = '';
	if(typeof(obj) === 'undefined'){
		return str;
	}
	return obj;
}

function ZJNoEmptyString(obj) {
	
	let str = '--';
	if(typeof(obj) === 'undefined'){
		return str;
	}
	return obj;
}



module.exports = {
    ZJValidString: ZJValidString,
	ZJNoEmptyString:ZJNoEmptyString,
	baseURL:baseURL,
	MOCK:MOCK,
	KTradeid_addVisit:KTradeid_addVisit,
	KTradeid_visitList:KTradeid_visitList,
}


