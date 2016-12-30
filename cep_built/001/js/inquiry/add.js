;+function(window){
	/**
	 * 录音/声音类
	 * @param String localId 微信本地录音资源
	 * @param Number duration 录音时长，毫秒
	 * @param String src 录音线上资源链接
	 * 
	 * @method width 显示宽度
	 * */
	var Voice = function(localId, duration, src){
		this.localId = ko.observable(localId);
		this.duration = ko.observable(duration);
		this.duration_sec = ko.computed(function(){
			return parseInt((this.duration()||0)/1000);
		},this);
		this.src = ko.observable(src);

		this.duration_tx = ko.computed(function(){
			return this.duration_sec() ? this.duration_sec() + "''" : '';
		},this);

		this.width = ko.computed(function(){
			var dur = this.duration_sec();
			dur = dur > 8 ? 80 : dur*10;
			return dur+"%";
		},this);
	}
	
	/**
	 * 询价配件类
	 * @param Object opt 异步返回的json数组中的单个 json
	 * */
	/*var Part = function(opt){
		this.id = opt.id;
		this.name = opt.name;
	}*/
	
	/**
	 * textarea 自适应高度
	 * */
	function textareaAutoHeight(obj, minHeight){
		// styles
		var style = window.getComputedStyle ? window.getComputedStyle(obj,null) : obj.currentStyle;
		var fontSize = parseInt(style.fontSize),
			lineHeight = parseInt(style.lineHeight),
			isBorderBox = /border\-box/.test(style.boxSizing),
			paddingHorizontal = parseInt(style.paddingLeft) + parseInt(style.paddingRight);
			paddingVertical = parseInt(style.paddingTop) + parseInt(style.paddingBottom);
		
		// sizes
		var width  = $(obj).width(),
			val    = $(obj).val(),
			i = 0, len = val.length, totalWidth = 0, result = minHeight;
		width = isBorderBox ? width - paddingHorizontal : width;
		
		for(;i<len;i++){
			totalWidth += val.charCodeAt(i) > 128 ? fontSize : fontSize*0.5;
		}
		result = Math.ceil(totalWidth / width)*lineHeight + (isBorderBox ? paddingVertical : 0);
		result = Math.max(result, minHeight);
		obj.style.height = result+'px';
	}

	var ViewModel = function(){
		var self = this;
		this.pics = {
			vin: ko.observable() // 车架号图片
			, car: ko.observable() // 车辆图片
			, list: ko.observable() // 购买清单图片
			, goods: ko.observableArray([]) // 产品图片
		};
		
		// 判断类型是否单张图片，保留了商品图片最大4张的设计
		function isVinCar(str){
			return /vin|car|list/.test(str);
		}
		
		this.isAll = ko.computed(function(){
			var pics = this.pics;
			return  pics.vin() && pics.car() && pics.list() && pics.goods()[0];
		},this);
		this.labelAttr = ko.computed(function(){
			var arr = ['vin','car','goods','list'],
				type = arr[0],
				i = 0, len = arr.length;
			for(;i<len;i++){
				var chk = isVinCar(arr[i]);
				if( chk ? !this.pics[arr[i]]() : !this.pics[arr[i]]()[0] ){
					break;
				}else{
					type = arr[i<len-1?i+1:i];
				}
			}
			return type;
		},this);
		this.pics_serverIds = ko.observableArray([]);// 图片serverId，第一幅是 vin，第二幅是 car，其余 goods
		
		this.shop_id = getQueryString('shopId');// 商店id
		
		
		this.voices = ko.observableArray([]);// 录音
		this.voices_serverIds = ko.observableArray([]);// 录音serverId
		this.current_voice = ko.observable();

		this.message = ko.observable('');// 留言

		// 类型选择
		this.typeList = [
			{text: "原厂", value: "isOrigin"}
			, {text: "品牌", value: "isBrand"}
			, {text: "下线", value: "isStop"}
			, {text: "拆车", value: "isOld"}];
		this.typeCbx = ko.observableArray(["isOrigin","isBrand"]);
		// 品牌
		this.brand = ko.observable();
		this.brand_tx = ko.computed(function(){
			return this.brand() ? '已选：'+this.brand() : '选车品牌';
		},this);
		// 送货日期
		this.date = ko.observable(new Date().format('yyyy-MM-dd'));
		this.addr_$elem = ko.observable($('[name="userAddr.id"]:checked'));
		this.addr_tx = ko.computed(function(){
			var addr = this.addr_$elem().next().find('.p-addr').text();
			return addr;
		},this);

		
		// 选择需要询价的配件，暂时默认有测试数据
		this.inquiryParts = ko.observableArray();
		// 红框样式
		this.inquiryPartsErr = ko.observable(false);
		
		// 关键词联想
		this.kevm = new KeywordExpendViewModel();
		this.removePart = function(o){
			this.inquiryParts.remove(o);
		}.bind(this);
		this.addPart = function(o){
			var chk = true;
			$.each(this.inquiryParts(),function(i,part){
				if( o==part ){
					chk = false;
					return false;
				}
			});
			if( chk ){
				this.inquiryParts.push(o);
			}
			this.kevm.close();
			this.inquiryPartsErr(false);
		}.bind(this);
		this.textareaAutoHeight = function(view,e){
			textareaAutoHeight(e.target,30);
		}		// 获取图片
		this.chooseImage = function(vm, e){
			console.log('...')
			var type = e.target.getAttribute('data-type');
			var bVinCar = isVinCar(type);
			// var count = bVinCar ? 1 : 4-this.pics.goods().length;// 多张商品图片
			var count = 1;
			
			if( !window.wxkit ){
				// demo
				$('#instead').off('change').change(function(e){
					var reader = new FileReader();
					var file = e.target.files[0],
						_self = this;
			        reader.onload = function(e){
			        	if( count==1 ){
							self.pics[type]( this.result );
						}else{
							self.pics[type].push(this.result);
						}
						_self.value = '';
			        }
			        reader.readAsDataURL(file);
				});
				$('#instead').click();
				console.log(this.pics)
				return false;
			}

			wxkit.chooseImage(count, function(localIds){
				console.log('xyz');
				if( bVinCar ){
					self.pics[type]( localIds[0] );
				}else{
					$.each(localIds,function(i,o){
						self.pics[type].push(o);
					});
				}
			});

		};

		// 删除图片
		this.removeImage = function(vm, e){
			var _this = e.target;
			var type = _this.parentNode.getAttribute('data-type');
			if(isVinCar(type)){
				self.pics[type](undefined);
			}else{
				self.pics[type].remove($(_this).prev().attr('src'));
			}
			e.stopPropagation();
		}
		
		// 弹框
		this.toastRecord = new Toast.record({
			title: '正在录音'
			, selector: '#toastRecord'
			, timeSelector: '#toastRecord .time'
			, complete: function(){
				//self.stopRecord(null)
				// 自动结束，不需要执行
			}
			, btns:{
				ok: {
					text: '说完了'
					, selector: '.ok'
					, callback: function($dialog, duration){
						self.stopRecord(null, duration);
					}
				}
				, cancel:{
					text: '取消'
					, selector: '.cancel'
					, callback: function($dialog, duration){
						self.stopRecord('cancel');
					}
				}
			}
		});

		// 开始录音
		this.startRecord = function(){
			//demo
			/*if( !window.wxkit ){
				this.voices.push(new Voice('1','1000'));
				return;
			}*/
			wxkit.startRecord();
			wxkit.onRecordEnd(function(localId, duration){
				self.toastRecord.hide();
				self.stopRecord(localId, duration);
			});
			this.toastRecord.show();
		}.bind(this);

		// 停止录音
		this.stopRecord = function(localId, duration){
			var isCancel = localId == 'cancel';
			if( localId && !isCancel ){
				// end用
				this.voices.push(new Voice(localId, duration));
			}else{
				wxkit.stopRecord(function(localId, duration){
					_duration = duration || _duration;// 优先使用来自ui的计时
					!isCancel && self.voices.push(new Voice(localId, duration));	
				});
			}
		}.bind(this);

		var arrLeft = [14,17,22];
		// 停止播放
		this.stopVoice = function(obj, e){
			obj = obj || this.current_voice();
			var _this = e.target
			clearInterval(_this.timer);
			_this.timer = null;
			$(_this).removeClass('playing');
			this.current_voice(undefined);
			
			wxkit.stopVoice({localId:obj.localId()});
		}.bind(this);
		
		
		
		// 播放语音
		this.playVoice = function(obj, e){
			var _this = e.target,
				$this = $(_this);
			$this.toggleClass('playing');
			if($this.is('.playing')){
				// 播放中动画
				_this.soundIndex = 0;
				_this.timer = setInterval(function(){
					_this.soundIndex++;
					_this.soundIndex>=arrLeft.length && (_this.soundIndex = 0);
					$this.find('b').css('left',arrLeft[_this.soundIndex]);
				},400);
				this.current_voice(obj);
				wxkit.playVoice({localId:obj.localId()});
				
			}else{
				this.stopVoice(obj,e);
			}
		}.bind(this);

		// 删除语音
		this.removeVoice = function(obj, e){
			this.voices.remove(obj);
			this.stopVoice(obj,e);
			e.stopPropagation();
		}.bind(this);

		// 上传图片
		this.uploadImage = function(cb){
			var aPics = [];
			this.pics.vin() && aPics.push(this.pics.vin());
			this.pics.car() && aPics.push(this.pics.car());
			aPics = aPics.concat(this.pics.goods());
			this.pics.list() && aPics.push(this.pics.list());
			if( aPics.length ){
				wxkit.multiUpload("Image", aPics, function(serverId, left){
					self.pics_serverIds.push(serverId);
					if( !left ){
						// 已上传全部图片，开始上传录音
						typeof cb==='function' && cb();
					}
	
				});
			}else{
				typeof cb==='function' && cb();
			}

		}.bind(this);
		
		// 上传录音
		this.uploadVoice = function(cb){
			if( this.voices().length ){
				var arr = [];
				this.voices().map(function(obj){
					arr.push(obj.localId());
				});
				wxkit.multiUpload("Voice", arr, function(serverId, left){
					self.voices_serverIds.push(serverId);
					if( !left ){
						// 已上传全部录音，开始执行submit
						typeof cb==='function' && cb();
					}
				});
			}else{
				typeof cb==='function' && cb();
			}

		}.bind(this);

		this.submit = function(){
			// ① 判断
			var arrTips = [];
			var chkPic = !this.pics.vin()&&!this.pics.car()&&!this.pics.goods().length;
			
			if( !this.ccvm.carBrandName() ){
				arrTips.push('请选择车型');
			}
			
			if( chkPic && !this.message() && !this.voices().length ){
				//arrTips.push('必须选择车架号图片');
				arrTips.push('请选择图片，或留言录音，或填写留言');
			}
			
			if( !this.typeCbx().length ){
				arrTips.push('请至少选择一种配件类型');
			}
			
			if( arrTips.length ){
				Toast.alert(arrTips.join('<br>'));
				return false;
			}


			var ajaxSubmit = function(){
				var data = {}, i = 0, len = this.pics_serverIds().length;
				data.imageIds = [];
				for(;i<len;i++){
					var pic_serverId = this.pics_serverIds()[i]
					if( i==0 ) data.vinImgId = pic_serverId;
					else if( i==1 ) data.carImgId = pic_serverId;
					else if( i==2 ) data.productImgId = pic_serverId;
					else data.imageIds.push(pic_serverId);
				}
				// 录音
				data.soundIds = this.voices_serverIds();

				// 地址
				var $addr = this.addr_$elem(),
					$box = $addr.next();
				data.userAddrId = $addr.val();
				data.company = $box.find('.company').html();
				data.consignee = $box.find('.name').html();
				data.tel = $box.find('.tel').html();
				data.province = $box.find('.province').html();
				data.city = $box.find('.city').html()
				data.area = $box.find('.zone').html();
				data.detail = $box.find('.addr').html();
				
				data.message = this.message();
				// data.brandName = this.brand();
				data.arriveTime = this.date();
				// 配件类型
				var chosen = this.typeCbx().join();
				for(i=0,len=this.typeList.length;i<len;i++){
					var key = this.typeList[i].value
					data[key] = chosen.indexOf( key )>-1 ? 1 : 0;
				}
				
				// 产品
				data.names = this.inquiryParts().join();
				// 车品牌、车系、排量、年份
				data.carTypeTwo  = this.ccvm.carBrandName();
				data.carTypeFour = this.ccvm.carSeriesName() || '';
				data.carTypePl   = this.ccvm.carOutputName() || '';
				data.carTypeYear = this.ccvm.carYearName() || '';
				
				
				if(this.shop_id){
					data.shopId = this.shop_id;
				}
				
				
				var callback = function(){
					/*var str = ''
					$.each(data,function(k,v){
						str += k+'=';
						if( typeof v==='object' ){
							str+= v.join();
						}else{
							str += v;
						}
						str+='&';
					});
					
					alert('测试中，本次点击不会提交')
					alert(str);
					return false;*/
					Toast.loading('show');
					
					cep.commAjax({url:'wx/qp!addQrApply',data:data,traditional:true},function(_data){
						sessionStorage.setItem('afterQpApply',JSON.stringify(_data.inf));
						location.href = 'wx/qp!afterQpApply';// 
						// {"inf":{"arry":[{"consignee":"邓天侯","shopName":"养护品-寮步-车呦呦店","tel":"076982232019 15220140040","id":"8aacc4ef56a232320156c59ed78a1a06"},{"consignee":"","shopName":"","tel":"","id":"8ab7ad9d51ebda760151ebf3d2fe065d"}]},"res":{"status":0}}
					},function(_data){
						Toast.loading('hide');
					});
				}
				
				
				
				
				// 没有选择配件时
				if( !data.names ){
					this.inquiryPartsErr(true);
					Toast.confirm('请添加报价配件再做提交吧', null, true, '补充配件', '直接提交',callback);
				}else{
					callback();
				}
				
			}.bind(this);
			
			
			// ① 图片上传，先调用图片上传、录音上传，再执行异步
			this.uploadImage(function(){
				// ② 录音上传
				self.uploadVoice(function(){
					ajaxSubmit();
				});
			});

		}.bind(this);

		this.reg = function(){
			$('#page-brand a:not(.goback,.letter-nav a)').click(function(){
				if(location.hash) history.go(-1);
				vm.brand($(this).find('strong').html());
				return false;
			});
			$('#page-addr').on('click',':radio',function(){
				if(location.hash) history.go(-1);
				self.addr_$elem($(this));
			});
			if($('.addr-list .default').length){
				$('.addr-list .default').prev().click();
			}else{
				$('.addr-list :radio:eq(0)').click();
			}
			
			wxkit.onVoicePlayEnd({
				isWx: true,
				callback: function(){
					self.stopVoice(null,{target:$('.playing')[0]});
				}
			});
		}.bind(this);
		
		// 选择车型
		this.ccvm = new ChooseCarSizeViewModel(null, this.shop_id);
		this.startChoose = function(o, e){
			var ccvm = this.ccvm;
			if( e.target.dataset.type==0 ){
				if( !ccvm.isInit() ){
					ccvm.isInit(true);
					if( this.shop_id ){// 来自店铺
						ccvm.getSecondShopList();
					}else{
						ccvm.getFirstList();
					}
				}
				location.hash = '#filter';
			}else{
				if( this.shop_id ){// 来自店铺
					if( !ccvm.currentBrandNameFromShop() ){
						Toast.show('请先选择车系','warn');
						return false;
					}else{
						ccvm.thirdShopList([]);
						ccvm.getThirdShopList();
					}
				}else{
					if( !ccvm.currentSeries() ){
						Toast.show('请先选择车系','warn');
						return false;
					}else{
						ccvm.thirdList([]);
						ccvm.getThirdList();
					}
				}
				location.hash = '#filter-2';
			}
		}.bind(this);
		
		this.startParts = function(){
			location.hash = '#filter-parts';
		}.bind(this);
		// 选择配件确定
		this.part_ok = function(){
			if( location.hash ){
				history.go(-1);
			}
		}
		// 选择配件关闭
		this.part_close = function(){
			this.inquiryParts([]);
			if( location.hash ){
				history.go(-1);
			}
		}.bind(this);
		
		this.init = function(){
			this.reg();
			
			// wxkit && wxkit.init();
		}.bind(this);
		
		this.init();
	}

	var vm = new ViewModel();
	ko.applyBindings(vm);
	window.vm = vm;
}(this);