export const host = 'https://xcx.shuofangquan.com';
const hostapi = host + '/api/base/';
const upload = host + '/api/base/uploadsum';

export const wxid = [];
export const isuser = false;
export const mainlist = {};
export const userid='';

export const userInfo = {};
export const askitem = {};
export const theme = {};
export const askconut = 3;





function GET(url, params = {}, handler = {}) {
	return request('GET', url, params, handler)
}

// POST请求
function POST(url, params = {}, handler = {}) {
	return request('POST', url, params, handler)
}

function request(method, url, params = {}, handler = {}) {
	handler.url = hostapi + url
	console.log(handler.url, params);

	handler.data = params
	handler.header = {
		'custom-header': 'hello' //自定义请求头信息
		//	'Authorization': 'Bearer ' + db.Get('token')
	}
	handler.method = method
	if (method === 'POST') {
		handler.header['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
	}

	//uni.showLoading && uni.showLoading({
	//title: '加载中...'
	//})

	return new Promise((resolve, reject) => {
		handler.success = res => {
			if (res.data.code === 1 || res.data.code === 0) {
				resolve(res.data)
			};
			//console.log(res,'xxxx')

		}
		handler.fail = err => {
			uni.showModal({
				title: '网络错误',
				content: JSON.stringify(err),
				showCancel: false
			})
			reject(err)
		}
		// console.log(handler)
		//handler.complete = () => uni.hideLoading && uni.hideLoading()
		uni.request(handler)
	})
}


function delobj(obj) {
	let arr = [];
	for (var i = 0; i < obj.length; i++) {
		console.log(obj[i]);
		arr.push(obj[i]);


	}
	return arr;

}



function msg(title, time = 2000) {
	uni.showToast({
		title: title,
		icon: 'none',
		duration: time
	})

}

function Modal(title) {
	uni.showModal({
		title: '',
		content: title,
		showCancel: false,
		success: function(res) {

		}
	});
}

/**
 * 将本地图片文件地址数组变为上传后的在线图片url数组
 * @param array filePaths
 */




function localImgs2webImgs(localImgs = []) {
	// 上传的后端url
	const url = upload;


	// 因为多张图片且数量不定，这里遍历生成一个promiseList
	uni.showLoading({
		title: '图片上传中...'
	})
	let promiseList = localImgs.map((item) => {
		return new Promise(resolve => {
			uni.uploadFile({
				url,
				filePath: item,
				name: 'image',
				success: (res) => {
					const data = JSON.parse(res.data);
					//	console.log(data);

					if (data.code == 1) {
						//	console.log(data.msg);
						resolve(data.msg)
					};


				},



			});
		});
	});
	// 使用Primise.all来执行promiseList
	const result = Promise.all(promiseList).then((res) => {
		// 返回的res是个数据，对应promiseList中请求的结果，顺序与promiseList相同
		// 在这里也就是在线图片的url数组了
		uni.hideLoading && uni.hideLoading();
		return res;
	}).catch((error) => {
		uni.hideLoading && uni.hideLoading();
		uni.showToast({
			title: error,
			icon: 'none',
			duration: 2000
		})

	});

	// uni.hideLoading();
	return result;
};

function RndNum(j) {
	var sNow = '';
	var random_no = "";
	for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
	{
		random_no += Math.floor(Math.random() * 10);
	}
	var vNow = new Date();
	sNow += String(vNow.getFullYear());
	sNow += String(vNow.getMonth() + 1);
	sNow += String(vNow.getDate());
	sNow += String(vNow.getHours());
	sNow += String(vNow.getMinutes());
	sNow += String(vNow.getSeconds());
	sNow += String(vNow.getMilliseconds());

	random_no = sNow + random_no;
	return random_no;

}




export {
	GET,
	POST,
	msg,
	Modal,
	delobj,
	localImgs2webImgs,
	RndNum,
}
