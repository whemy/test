/**
 * 商品详情 goods.js
 * */


;(function($,window){
	// ‘立即购买’0和‘加入购物车’1
	var jiagequjian = "";
	window.showBuy = function(type){
		fdgg();
		type = type || 0;
		
		/**
		 * 加载价格区间
		 */
		
		$('#buy').attr('data-type',type);
	}
	
	function fdgg(){
		var id = $("#goodid1").val();
		
		$.ajax({
            type: "GET",
            url: "index!getPriceRange",
            data: {"goodId":id},
            dataType: "json",
            success: function(data){
                if(data.data !=null&&data.data !=""){
                	jiagequjian = data.data;
                }
            }
        });
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
    		//loginWithUrl('m/login!loginUI');
    		Toast.alert(e.res.errMsg);
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
		
		for(var i=0;i<jiagequjian.length;i++){
			var obj = jiagequjian[i];
			if(count>=obj.minCount&&count<=obj.maxCount){
				oneprice = obj.price;
			}
		}
		
		total = count * oneprice;
		/**
		 * 实时刷新最单价
		 */
		$("#lowerPrices").html(oneprice);
		$count.val(count);
		if( typeof cb === 'function' ){
			cb(id, oneprice, count, total, max, promotion);
			window.isTest && alert(['测试结果：','1. 总价：'+total,'2. 单价：'+oneprice,'3. 当前数量：'+count,'4. 最大值：'+max,'5. 优惠：'+promotion].join('\n'))
		}
    }
    window.countRule = countRule;

    var MyDialog = {
        show: function(sel){$(sel).addClass('on');},
        hide: function(sel){$(sel||'.frame_block').removeClass('on active');},
        init: function(){
            $('.frame_block').click(function(e){
            	var cln = this.className;
                if( e.target.className == cln ){
                	if( /active/.test(cln) && location.hash ){
                		if(myhash.length>1){
                			history.go(-1);
                		}else{
                			location.hash='';
                		}
                	}else{
                		MyDialog.hide(this);
                	}
                }
            });
        }
    }
    $.mydialog = MyDialog;
    MyDialog.init();
    
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
	$('.box-selects a.gtab').click(function(){
		var ind = $(this).index();
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parent().next('.gview').find('.view').addClass('hide').eq(ind).removeClass('hide');
		return false;
	});

})(jQuery,window);