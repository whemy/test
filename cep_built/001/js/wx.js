/**
 * wx*/

/**
 * 当前为非微信时*/

/*if(!UA.isWX && sessionStorage.getItem('wx_allowed')!='true'){
	location.href = '/htmls/qrcode/index.html?url='+encodeURI(location.href);
}*/

// js SHA
(function(D){function p(b,e,c){var a=0,d=[0],f="",g=null,f=c||"UTF8";if("UTF8"!==f&&"UTF16"!==f)throw"encoding must be UTF8 or UTF16";if("HEX"===e){if(0!==b.length%2)throw"srcString of HEX type must be in byte increments";g=v(b);a=g.binLen;d=g.value}else if("TEXT"===e)g=w(b,f),a=g.binLen,d=g.value;else if("B64"===e)g=x(b),a=g.binLen,d=g.value;else if("BYTES"===e)g=y(b),a=g.binLen,d=g.value;else throw"inputFormat must be HEX, TEXT, B64, or BYTES";this.getHash=function(b,f,c,e){var g=null,h=d.slice(),l=a,n;3===arguments.length?"number"!==typeof c&&(e=c,c=1):2===arguments.length&&(c=1);if(c!==parseInt(c,10)||1>c)throw"numRounds must a integer >= 1";switch(f){case "HEX":g=z;break;case "B64":g=A;break;case "BYTES":g=B;break;default:throw"format must be HEX, B64, or BYTES";}if("SHA-1"===b)for(n=0;n<c;n+=1)h=s(h,l),l=160;else throw"Chosen SHA variant is not supported";return g(h,C(e))};this.getHMAC=function(c,b,e,g,q){var h,l,n,r,p=[],t=[];h=null;switch(g){case "HEX":g=z;break;case "B64":g=A;break;case "BYTES":g=B;break;default:throw"outputFormat must be HEX, B64, or BYTES";}if("SHA-1"===e)l=64,r=160;else throw"Chosen SHA variant is not supported";if("HEX"===b)h=v(c),n=h.binLen,h=h.value;else if("TEXT"===b)h=w(c,f),n=h.binLen,h=h.value;else if("B64"===b)h=x(c),n=h.binLen,h=h.value;else if("BYTES"===b)h=y(c),n=h.binLen,h=h.value;else throw"inputFormat must be HEX, TEXT, B64, or BYTES";c=8*l;b=l/4-1;if(l<n/8){if("SHA-1"===e)h=s(h,n);else throw"Unexpected error in HMAC implementation";h[b]&=4294967040}else l>n/8&&(h[b]&=4294967040);for(l=0;l<=b;l+=1)p[l]=h[l]^909522486,t[l]=h[l]^1549556828;if("SHA-1"===e)e=s(t.concat(s(p.concat(d),c+a)),c+r);else throw"Unexpected error in HMAC implementation";return g(e,C(q))}}function w(b,e){var c=[],a,d=[],f=0,g;if("UTF8"===e)for(g=0;g<b.length;g+=1)for(a=b.charCodeAt(g),d=[],128>a?d.push(a):2048>a?(d.push(192|a>>>6),d.push(128|a&63)):55296>a||57344<=a?d.push(224|a>>>12,128|a>>>6&63,128|a&63):(g+=1,a=65536+((a&1023)<<10|b.charCodeAt(g)&1023),d.push(240|a>>>18,128|a>>>12&63,128|a>>>6&63,128|a&63)),a=0;a<d.length;a+=1)(f>>>2)+1>c.length&&c.push(0),c[f>>>2]|=d[a]<<24-f%4*8,f+=1;else if("UTF16"===e)for(g=0;g<b.length;g+=1)(f>>>2)+1>c.length&&c.push(0),c[f>>>2]|=b.charCodeAt(g)<<16-f%4*8,f+=2;return{value:c,binLen:8*f}}function v(b){var e=[],c=b.length,a,d;if(0!==c%2)throw"String of HEX type must be in byte increments";for(a=0;a<c;a+=2){d=parseInt(b.substr(a,2),16);if(isNaN(d))throw"String of HEX type contains invalid characters";e[a>>>3]|=d<<24-a%8*4}return{value:e,binLen:4*c}}function y(b){var e=[],c,a;for(a=0;a<b.length;a+=1)c=b.charCodeAt(a),(a>>>2)+1>e.length&&e.push(0),e[a>>>2]|=c<<24-a%4*8;return{value:e,binLen:8*b.length}}function x(b){var e=[],c=0,a,d,f,g,m;if(-1===b.search(/^[a-zA-Z0-9=+\/]+$/))throw"Invalid character in base-64 string";a=b.indexOf("=");b=b.replace(/\=/g,"");if(-1!==a&&a<b.length)throw"Invalid '=' found in base-64 string";for(d=0;d<b.length;d+=4){m=b.substr(d,4);for(f=g=0;f<m.length;f+=1)a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(m[f]),g|=a<<18-6*f;for(f=0;f<m.length-1;f+=1)e[c>>2]|=(g>>>16-8*f&255)<<24-c%4*8,c+=1}return{value:e,binLen:8*c}}function z(b,e){var c="",a=4*b.length,d,f;for(d=0;d<a;d+=1)f=b[d>>>2]>>>8*(3-d%4),c+="0123456789abcdef".charAt(f>>>4&15)+"0123456789abcdef".charAt(f&15);return e.outputUpper?c.toUpperCase():c}function A(b,e){var c="",a=4*b.length,d,f,g;for(d=0;d<a;d+=3)for(g=(b[d>>>2]>>>8*(3-d%4)&255)<<16|(b[d+1>>>2]>>>8*(3-(d+1)%4)&255)<<8|b[d+2>>>2]>>>8*(3-(d+2)%4)&255,f=0;4>f;f+=1)c=8*d+6*f<=32*b.length?c+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g>>>6*(3-f)&63):c+e.b64Pad;return c}function B(b){var e="",c=4*b.length,a,d;for(a=0;a<c;a+=1)d=b[a>>>2]>>>8*(3-a%4)&255,e+=String.fromCharCode(d);return e}function C(b){var e={outputUpper:!1,b64Pad:"="};try{b.hasOwnProperty("outputUpper")&&(e.outputUpper=b.outputUpper),b.hasOwnProperty("b64Pad")&&(e.b64Pad=b.b64Pad)}catch(c){}if("boolean"!==typeof e.outputUpper)throw"Invalid outputUpper formatting option";if("string"!==typeof e.b64Pad)throw"Invalid b64Pad formatting option";return e}function q(b,e){return b<<e|b>>>32-e}function r(b,e){var c=(b&65535)+(e&65535);return((b>>>16)+(e>>>16)+(c>>>16)&65535)<<16|c&65535}function t(b,e,c,a,d){var f=(b&65535)+(e&65535)+(c&65535)+(a&65535)+(d&65535);return((b>>>16)+(e>>>16)+(c>>>16)+(a>>>16)+(d>>>16)+(f>>>16)&65535)<<16|f&65535}function s(b,e){var c=[],a,d,f,g,m,p,u,k,s,h=[1732584193,4023233417,2562383102,271733878,3285377520];b[e>>>5]|=128<<24-e%32;b[(e+65>>>9<<4)+15]=e;s=b.length;for(u=0;u<s;u+=16){a=h[0];d=h[1];f=h[2];g=h[3];m=h[4];for(k=0;80>k;k+=1)c[k]=16>k?b[k+u]:q(c[k-3]^c[k-8]^c[k-14]^c[k-16],1),p=20>k?t(q(a,5),d&f^~d&g,m,1518500249,c[k]):40>k?t(q(a,5),d^f^g,m,1859775393,c[k]):60>k?t(q(a,5),d&f^d&g^f&g,m,2400959708,c[k]):t(q(a,5),d^f^g,m,3395469782,c[k]),m=g,g=f,f=q(d,30),d=a,a=p;h[0]=r(a,h[0]);h[1]=r(d,h[1]);h[2]=r(f,h[2]);h[3]=r(g,h[3]);h[4]=r(m,h[4])}return h}/*"function"===typeof define&&define.amd?define(function(){return p}):"undefined"!==typeof exports?"undefined"!==typeof module&&module.exports?module.exports=exports=p:exports=p:*/D.jsSHA=p})(this);

// 随机数
function GetRndCode(a,b){a=a||6;var d="";b=b||new Array(0,1,2,3,4,5,6,7,8,9);for(var c=0;c<a;c++){var e=Math.floor(Math.random()*10);d+=b[e]}return d};

var Wxkit = function(){
	this.flags = {};
	this.historyState = {};// 单页面用的历史
	// this.appId = 'wx5b3cd1d36cdaa27c'
	this.appId = 'wx1c2a3c7f271d4c23'
};
Wxkit.prototype.getTicket = function(cb){
	cep.commAjax({url:'init!getJsToken',breakrule:true},function(_data){
		if( window.sessionStorage ){
			if(_data.ticket){
				sessionStorage.setItem('jsapi_ticket', _data.ticket)
			}else{
				Toast.alert(_data.errmsg);
			}
		}
		typeof cb === 'function' && cb();
	});
}

Wxkit.prototype.sign = function(){
	var self = this,
		timestamp = ((new Date()).getTime()+'').substr(0,10),
		nonceStr = GetRndCode(8)+'',
		url = window.jsOldUrl || location.href.split('#')[0], // head_ua.jsp 中用了replaceState方法，并记录了 jsOldUrl
		jsapi_ticket = sessionStorage.getItem('jsapi_ticket'),
		str = "jsapi_ticket="+jsapi_ticket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+url,
		signature = new jsSHA(str,"TEXT").getHash("SHA-1","HEX");
	
	var config = {
		debug: false,
	    appId: this.appId,
	    timestamp: 0,
	    nonceStr: "",
	    signature: "",
	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareWeibo','getNetworkType','hideOptionMenu','showOptionMenu','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem','showAllNonBaseMenuItem','closeWindow','chooseImage','previewImage','uploadImage','uploadVoice','startRecord','stopRecord','onVoiceRecordEnd','playVoice','stopVoice','pauseVoice']
	}
	config.timestamp = timestamp;
	config.nonceStr  = nonceStr;
	config.signature = signature;
    
    if( !jsapi_ticket ){
    	self.getTicket(function(){self.sign()});
    	return ;
    }
	if( !this.historyState[url] ){
		this.historyState[url] = 1;
	}else{
		// 该链接已经签过名
		return ;
	}
	wx.config(config);
	wx.error(function(res){
		if(self.getTicket){
			self.getTicket(function(){self.sign()});
		}else{
			alert(res.errMsg);
		}
	});
    
        
    // this.share();
}

Wxkit.prototype.previewImage = function(cur, urls){
	cur  = encodeURI(cur);
	urls = urls || [cur];
	for(var i=0;i<urls.length;i++){
		urls[i] = encodeURI(urls[i]);
	}
	wx.previewImage({current: cur, urls: urls});
	console.log('previewImage',cur,urls);
}

Wxkit.prototype.chooseImage = function(count, cb){
	count = count || 1;
	wx.chooseImage({
	    count: count,
	    sizeType: ['original', 'compressed'],
	    sourceType: ['album', 'camera'],
	    success: function (res) {
	    	typeof cb === 'function' && cb(res.localIds);
	    }
	});
}

Wxkit.prototype.uploadImage = function(localId, cb){
	wx.uploadImage({
		localId: localId,
		isShowProgressTips: 1,
		success: function (res) {
			typeof cb === 'function' && cb(res.serverId);
	    }
	});
}

/**
 * 上传录音
 * @param cb Function 回调
 * */
Wxkit.prototype.uploadVoice = function(localId, cb){
	wx.uploadVoice({
	    localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
	    isShowProgressTips: 1, // 默认为1，显示进度提示
	        success: function (res) {
	        var serverId = res.serverId; // 返回音频的服务器端ID
	        typeof cb === 'function' && cb(res.serverId);
	    }
	});
}

/**
 * 上传复数图片/录音
 * @param type String "Image" 或 "Voice"，请注意大写
 * @param arr Array localId 数组
 * @param cb  Function 每次上传完成之后的回调函数，带 serverId 和 剩余上传图片数量
 * */
Wxkit.prototype.multiUpload = function(type, arr, cb){
	var len = arr.length,
		self = this,
		key_left = "upload"+type+"Left",
		key_func = "upload"+type,
		callback = function(serverId){
			var localId = arr[ len - self[key_left] ];
			self[key_left]--;
			typeof cb === 'function' && cb(serverId, self[key_left], localId);
			if( self[key_left] ){
				self[key_func](arr[ len - self[key_left] ], callback);
			}
		};
	
	this[key_left] = len;// 剩下多少幅图要上传
	
	this[key_func](arr[0], callback);
}

/**
 * 开始录音
 * @param cb Function 回调
 * */
Wxkit.prototype.startRecord = function(cb){
	
	if(this.flags.record=='recording'){
		Toast.show('已经正在录音');
		return ;
	}
	
	wx.startRecord();
	var self = this;
	this.RECORD_START = new Date().getTime();
	// this.recordTime = 0;// 记录秒数
	// this.recordTimer = setInterval(function(){self.recordTime++},1000);
	this.flags.record = 'recording';
	
	typeof cb === 'function' && cb();
}
/**
 * 停止录音
 * @param cb Function 回调
 * */
Wxkit.prototype.stopRecord = function(cb){
	var self = this;
	
	// clearInterval(this.recordTimer);
	this.RECORD_END = new Date().getTime();
	var duration = this.RECORD_END - this.RECORD_START;
	this.RECORD_END = 0;
	this.RECORD_START = 0;
	self.flags.record = 'pre-finish';
	wx.stopRecord({
		success: function(res){
			self.flags.record = 'finish';
			typeof cb === 'function' && cb(res.localId, duration);
		}
	});
}
/**
 * 录音自动结束
 * @param cb Function 回调
 * 注意wx事件需要在 ready 调用
 * */
Wxkit.prototype.onRecordEnd = function(cb){
	var self = this;
	if( !this.flags.onRecordEnd ){
		this.flags.onRecordEnd = true;
		wx.ready(function(){
			wx.onVoiceRecordEnd({
				complete: function(res){
					// clearInterval(self.recordTimer);
					this.RECORD_START = 0;
					self.flags.record = 'finish';
					typeof cb === 'function' && cb(res.localId, 60000);// 默认60s
				}
			});
		});
	}
}

/**
 * 播放音频
 * @param param    Object
 * @key   localId  String 本地微信音频id
 * @key   selector String 音频dom选择器或dom
 * */
Wxkit.prototype.playVoice = function(param){
	if( param && param.localId ){
		wx.playVoice(param);
	}else{
		var audio = $(param.selector)[0];
		audio.play();
	}
}

/**
 * 暂停音频
 * @param param    Object
 * @key   localId  String 本地微信音频id
 * @key   selector String 音频dom选择器或dom
 */
Wxkit.prototype.pauseVoice = function(param){
	if( param && param.localId ){
		wx.pauseVoice(param);
	}else{
		var audio = $(param.selector)[0];
		audio.pause();
	}
}

/**
 * 停止音频
 * @param param    Object
 * @key   localId  String 本地微信音频id
 * @key   selector String 音频dom选择器或dom
 */
Wxkit.prototype.stopVoice = function(param){
	if( param && param.localId ){
		wx.stopVoice(param);
	}else{
		var audio = $(param.selector)[0];
		audio.pause();
		audio.currentTime = 0;
	}
}

/**
 * 注册音频播放完毕
 * @param param    Object
 * @key   isWx     Boolean 是否微信
 * @key   selector String 音频dom选择器或dom
 * 注：
 * ① 注意wx事件需要在 ready 调用
 * ② 若页面需要调用录音模块，本方法必须在开始时被调用，确保第一次录音时用户是否授权录音功能
 */
Wxkit.prototype.onVoicePlayEnd = function(param){
	if( param.isWx ){
		if( !this.flags.onVoicePlayEnd ){
			// 全局绑定wx的playend
			this.flags.onVoicePlayEnd = true;
			wx.ready(function(){
				// 注册事件
				wx.onVoicePlayEnd({
					success: function(res){
						typeof param.callback === 'function' && param.callback(res.localId);
					}
				});
				// 通过一段废弃录音来触发用户首次录音时授权的弹框
				if( !sessionStorage.getItem('allowRecord') ){
					wx.startRecord({
						success: function(){
							sessionStorage.setItem('allowRecord','1');
							wx.stopRecord();
						},cancel: function(){
							alert('用户拒绝授权录音');
						}
					});
				}
			});
		}
	}else{
		var $audio = $(param.selector);
		$(function(){
			$audio.on('ended',function(e){
				typeof param.callback === 'function' && param.callback(e);
			});
		});
	}
}

/**
 * 自定义分享（使用ready，只需调用一次）
 * */
Wxkit.prototype.share = function(opt){
	
	var shareData = {
        imgUrl:  opt.imgUrl,
        link:    opt.link,
        title:   opt.title,
        desc:    opt.desc,
        success: opt.success
    };
	wx.ready(function(){
		wx['onMenuShareTimeline'](shareData);
	    wx['onMenuShareAppMessage'](shareData);
	    //wx['onMenuShareQQ'](shareData);
	    //wx['onMenuShareWeibo'](shareData);
	});
}
/**
 * 更新自定义分享
 * */
Wxkit.prototype.share_update = function(opt){
	
	if(opt.url.indexOf("index_sonId")==-1){//没有这个值
		opt.url += (opt.url.indexOf("?")==-1 ? '?' : '&') + 'index_sonId='+Js_global.index_sonId;
	}
	
	var code = getQueryString('code',opt.url);
	if( code ){
		opt.url = opt.url.replace(new RegExp('code='+code+'(\&)?'), '');
	}
	
	var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appId+'&redirect_uri='+encodeURIComponent(opt.url)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
	
	var optImg = opt.imgUrl || '';
	
	if(optImg.indexOf('images')==-1){//因为有些图片的路劲是无效的，所以加个判断
		optImg = 'http://mm.ep59.cn/images/1logo.png';
	}
	var title = (opt.title || document.title).replace(/\&mdash\;/g,'-')
	var setting = {
		imgUrl: optImg,
		link: url || location.href,
		title: title,
		desc: opt.desc || '',
		success: opt.success || function(){
			//Toast.show('分享成功',1);
		}
	}
	
	this.share(setting);
}

Wxkit.prototype.init = function(){
	var self = this;
	if(UA.isWX){
		this.sign();
		/**分享组拼链接*/
		var oldUrl = location.href;
		
		var url = oldUrl;
		if(oldUrl.indexOf("index_sonId")==-1){//没有这个值
			url += (oldUrl.indexOf("?")==-1 ? '?' : '&') + 'index_sonId='+Js_global.index_sonId;
		}
		
		// code参数去重，本链接必定带有 index_sonId 参数，因此不考虑去除code之前的&字符
		var code = getQueryString('code',url);
		if( code ){
			url = url.replace(new RegExp('code='+code+'(\&)?'), '');
		}
		
		
		//alert(encodeURIComponent(url))
		url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appId+'&redirect_uri='+encodeURIComponent(url)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
		/*cep.commAjax({url:'/common!getShortUrl',data:{longUrl:url}}, function(data){
			//alert(data.inf.short_url);
			self.share({
				imgUrl: 'http://mm.ep59.cn/images/1logo.png',// 图标
				link: data.inf.short_url,// 路径
				title: document.title,// 标题
				desc: '',// 描述
				success: function(){// 成功回调
					Toast.show('分享成功',1);
				}
			});
		});*/
		
		this.share({
			imgUrl: 'http://mm.ep59.cn/images/1logo.png',// 图标
			link: url,// 路径
			title: document.title.replace(/\&mdash\;/g,'-'),// 标题
			desc: '',// 描述
			success: function(){// 成功回调
				// Toast.show('分享成功');
			}
		});
	}
}

var wxkit = new Wxkit();
wxkit.init();

/* Toast 扩展 */
if( Toast ){
	/**
	 * @param opt Object
	 * @key title String
	 * @key selector String
	 * @key timeSelector String
	 * @key complete Function(Number duration)
	 * @key btns Object
	 * 		@key ok: text\callback\selector
	 * 		@key cancel
	 * */
	Toast.record = function(opt){
		var $dialog = $(opt.selector),
			$timeSelecor = $(opt.timeSelector);
		
		var //MaxCln = 3,
			MaxSec = 60,
			//MinCln = 1,
			MinSec = 1;
		
		var self = this,
			result = {recordReg:false,timer:null,second:0,$ok:null,$cancel:null};
		
		var hide = function(){
			$dialog.addClass('hide').removeClass('animate');
			// self.unlock();
			clearInterval(result.timer);
			result.timer = null;
		}
		
		var show = function(){
			$dialog.removeClass('hide').addClass('animate');
			// self.lock();
			result.second = MaxSec;
			$timeSelecor.html('01:00');
			// result.cln = MaxCln;
			result.START = new Date().getTime();
			result.timer = setInterval(function(){
				result.second--;
				// result.cln--;
				//if( result.cln<MinCln ){
				//	result.cln = MaxCln;
				//}
				if( result.second<MinSec ){
					// 自动结束
					hide();
					typeof opt.complete === 'function' && opt.complete(MaxSec-result.second);
				}else{
					$timeSelecor.html('00:'+( result.second<10?'0'+result.second:result.second ));
				}
			},1000);
		}
		
		result.show = show;
		result.hide = hide;
		
		if(!result.recordReg){
			result.recordReg = true;
			if( !opt.btns ){
				return;
			}
			var oOk = opt.btns.ok,
				oCancel = opt.btns.cancel
			
			result.$ok = $dialog.find(oOk.selector);
			result.$cancel = $dialog.find(oCancel.selector);
			
			result.$ok.on('click',function(e){
				console.log('ok')
				hide();
				//new Date().getTime() - result.START
				//, (MaxSec-result.second)*1000
				typeof oOk.callback === 'function'
					&& oOk.callback($dialog);
				return false;
			})
			result.$cancel.on('click',function(e){
				console.log('cancel')
				hide();
				typeof oCancel.callback === 'function'
					&& oCancel.callback($dialog);
				return false;
			});
			
			result.$ok.html(oOk.text||'确定');
			result.$cancel.html(oCancel.text||'取消');
		}
		
		return result;
	}
}
