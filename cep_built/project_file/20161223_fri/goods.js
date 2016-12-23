/**
 * 商品详情 goods.js
 * */
myhash.init();

;(function($,window){
	// ‘立即购买’0和‘加入购物车’1
	window.showBuy = function(type){
		type = type || 0;
		$('#buy').attr('data-type',type);
	}
	
	// 购买通用 id:表单id,type单个(1)或多个(0),cb回调
    function addCart(formId,type,cb){
    	var formsel = '#'+formId,
    		$form = $(formsel),
    		url  = $form.attr('action'),
    		arr  = type
    		     ? [{sel:formsel+' [name=carGoodsId]',pattern:'notnull'},{sel:formsel+' [name=carCount]',pattern:'notnull'}]
    			 : [],
    		data = $form.serialize(),
    		carCount = getQueryString('carCount',data);
    	
    	if(type && carCount < 1) return false;
    	data = type ? '' : data;
    	Toast.loading('show');
    	cep.ajaxSubmit(arr, null, null,{
    		url: url, data: data
    		//errorable: true
    	},function(_data){
    		console.log(_data);
    		typeof cb === 'function' && cb(_data,carCount);
    	},function(e){
    		//location.href='m/login!loginUI';
    		loginWithUrl('m/login!loginUI');
    	});
    }
	// 加入购物车/立即购买
	window.goodsSubmit = function(){
		var type = location.hash.split('?')[1];
		addCart('goodsDetail',1,function(_data,carCount){
			if( type==0 ){
				location.href = 'wx/index!carList';//购物车
			}else{
				Toast.confirm('已加入'+carCount+'件商品购物车，<br>现在去确认订单吗？',function(){
					Toast.loading('show');
					location.href = 'wx/index!carList';
				},false,'去购物车','继续购物',function(){
					history.go(-2);
				});
			}
		});
	}
	window.goodsCombo = function(){
		addCart('comboDetail',0,function(_data){
			location.href = 'wx/index!carList';
		});
	}
	
	// 按数量规则计算总价.
	// 20160407 由三价格区间，更改为单价格
    function countRule($obj,increase,cb){
    	var $count   = $obj.find('input'),
			id       = $count.attr('id').split('-')[1],
			count    = parseInt($count.val()) + increase,
			max      = $count.attr('data-max'),
			oneprice = $count.attr('data-lowprice'),
			total,
			arrprice = $count.attr('data-arr')
					 ? $count.attr('data-arr').split('|') : [],
			len      = arrprice.length,
			promotion = $count.attr('data-promotion');
		max = max ? max*1 : 0;
		if( isNaN(count) || count<1 ){
			count = 1;
		}else if(max && count > max){
			count = max;
			Toast && Toast.alert('商品库存不足');
		}
		
		
		//if( !max ){
			//$count.val(0).prop('disabled',true);
			//count = 0;
			//oneprice = arrprice.length ? arrprice[0].split(',')[0]*1 : $count.attr('data-oneprice');
		//}else{
			/*if( max ) count = count ? (count > max ? max : count) : 1;
			count = count || 1;
			$.each(arrprice,function(i,o){
				var attr  = o.split(','),
				price = attr[0]*1,
				min   = attr[1]*1,
				max   = attr[2]*1;
				if( (len-1==i && count>=min) || (count>=min && count<=max) ){
					oneprice = price;
					return false;
				}
			});
			if( typeof oneprice === 'undefined' ){
				oneprice = arrprice.length ? arrprice[0].split(',')[0]*1 : $count.attr('data-oneprice');
				console.log('arrprice为空');
			}*/
		//}
		total = count * oneprice;
		
		$count.val(count);
		if( typeof cb === 'function' ){
			cb(id, oneprice, count, total, max, promotion);
			window.isTest && alert(['测试结果：','1. 总价：'+total,'2. 单价：'+oneprice,'3. 当前数量：'+count,'4. 最大值：'+max,'5. 优惠：'+promotion].join('\n'))
		}
    }
    window.countRule = countRule;
    
    $('.buy-block .handle i').click(function(){
    	var increase = $(this).index()? 1:-1;
    	countRule($(this).parent(), increase, function(id, oneprice, count, total, max, promotion){
    		$('#buyTotal').html(total.toFixed(2));
    		if( !isNaN(promotion) ){
    			$('#buyTotal-pro').html((total*promotion).toFixed(2));
    		}
    	});
    });
    $('#buyInput').on('keyup blur',function(e){
    	var kc = e.which||window.event.keyCode;
    	if( kc==8 ){return false;}
    	countRule($(this).parent(), 0, function(id, oneprice, count, total, max, promotion){
    		$('#buyTotal').html(total.toFixed(2));
    		if( !isNaN(promotion) ){
    			$('#buyTotal-pro').html((total*promotion).toFixed(2));
    		}
    	});
    }).focus(function(){
    	$(this).select();
    }).attr('autocomplete','off');
    // 判断是否无库存
    $('#buyInput').each(function(){
    	countRule($(this).parent(), 0, function(id, oneprice, count, total, max, promotion){
    		$('#buyTotal').html(total.toFixed(2));
    		if( !isNaN(promotion) ){
    			$('#buyTotal-pro').html((total*promotion).toFixed(2));
    		}
    		/*if( !max ){
    			$('.bottom-handle,#buy').find('.btn').addClass('disabled');
    			$('#buy').find('.btn-buy').html('暂无库存').removeAttr('onclick');
    		}*/
    	});
    });
    $('#goodsDetail,#comboDetail').submit(function(){return false;})
	
    /* 详情切换 */
    $('#detail-selects a').click(function(){
        var ind = $(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.gview .view').addClass('hide').eq(ind).removeClass('hide');
        return false;
    });
    
    $('.gpara .name').click(function(){
    	$(this).toggleClass('on').next().toggleClass('hide');
    });

	//促销倒数20161223
	function countTime(){
		var a = '2017/1/1,12:20:12';
		var overTime = new Date(a);
		var newTime = new Date();
		var leftTime = parseInt((overTime.getTime() - newTime.getTime())/1000);
		d=parseInt(leftTime/3600/24);
		h=parseInt((leftTime/3600)%24);
		m=parseInt((leftTime/60)%60);

		var nowTime = '<nav><span><b>'+d+'</b>天</span><span><b>'+h+'</b>时</span><span><b>'+m+'</b>分</span></nav>';
		if(leftTime < 0){
			$('.sales_off_time').find('p').after('<nav><span>活动已结束</span></nav>')
		}else{
			$('.sales_off_time').find('p').after(nowTime);
		}
	}
	countTime();

	//成交记录20161223
	function upScroll(){
		var headerHeight = $('.grecord_head').outerHeight(),
			listsHeight = $('.grecord_list').find('li').outerHeight(),
			ulHeight = listsHeight * 4,
			allHeight = headerHeight + ulHeight - 1,
			timer = null,
			nameLength = $('.grecord_name').length;
		console.log(nameLength);
		for(var i = 0; i < nameLength; i++){
			$('.grecord_name').eq(i).text($('.grecord_name').eq(i).text().slice(0,1)+'***'+$('.grecord_name').eq(i).text().slice(-1));
		}
		$('.grecord_head').height(headerHeight);
		$('.grecord_list').find('.grecord_div').height(ulHeight);
		$('.grecord_table').height(allHeight);
		if($('.grecord_list').find('li').length < 5){
			return false;
		}else{
			clearInterval(timer);
			var timer = setInterval(function(){
				$('.grecord_list').animate({marginTop: -listsHeight}, 500,function(){  
					$(this).css({marginTop : "-1px"}).find("li:first").appendTo(this);  
				});
			},2000);
		}
	}
	upScroll();
    
    // 重新自定义分享
    wxkit.share_update({
		url: location.href,
		title: window.Js_global.platname + '-' + $('.gallary img').attr('alt'),
		imgUrl: $('.gallary img').length && $('.gallary img')[0].src,
		desc: $('.gallary img').attr('alt')
	});
})(jQuery,window);