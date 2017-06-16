// 购物车
;(function($,window){
	var $all = $('.shopBox :checkbox:not([disabled])'),
		$goods = $('.goodsBox');
	
	var Cart = {};
	
	// 通过html获取单个商品情况
    Cart.getGoods = function(o){
    	var obj = {},
    		$o = $(o);
    	
    	obj.id = $o.attr('data-id');
    	obj.oneprice = $o.find('.price span').html()*1;
    	obj.count = $o.find('.count input').val()*1;
    	obj.count = isNaN(obj.count)?$o.find('.count').html()*1:obj.count;
    	obj.total = obj.count*obj.oneprice;
    	obj.checked = $o.find(':checkbox')[0].checked;
    	
    	return obj;
    }
    
    // 设置购物车页面内容
    function pageSetting(){
    	var flag = false, // 是否有已选
    		flagR = true, // 是否全选
    		dis  = 'disabled',
    		count = 0,
    		total = 0;
    	
    	$goods.each(function(i,o){
    		var goods = Cart.getGoods(o);
    		//console.log(goods)
    		goods.checked && (flag=true,count+=goods.count,total+=goods.total);
    		goods.checked || (flagR = false);
    	});
    	
    	$('.allCbx').prop('checked',flagR);
    	$('.bcbtn').toggleClass(dis,!flag);
    	$('.cartprice').html(total.toFixed(2));
    	$('.cartcount').html(count);
    }
    /**
     * 存放价格初始值
     */
    
    // ajax提交件数修改
    Cart.ajaxSetCount = function($input,cb){
    	var proCount = $input.attr('data-count'),
			nCount = $input.val(),
			id = $input.attr('data-id'),
    		isQp=$("[name='isQp']").val();
		if( !/^\d+$/.test(nCount) ){
			$input.val(proCount);
			return ;
		}
    	$.ajax({
			url:'wx/index!ajaxChangerCar',
			data:{
				carCount: nCount,
				carGoodsId: id,
				isQp:isQp
			},
			dataType:'json',
			error:function(e){$input.val(proCount);Toast.alert('更改购物车数量失败')},
			success:function(data){
				if(data.res && data.res.status==0){
					// set count
					var $goods = $input.parents('.goods-box');
					nCount = data.inf.carSize || nCount;
					$input.val(nCount).attr('data-count',nCount);
					
					
					if(data.inf.price != "null"){
						
						$("#"+id).html(data.inf.price);
					}else{
						
					}
					$goods.find('.count').html(nCount);
					pageSetting();
				}else{
					$input.val(proCount);
				}
				console.log(data)
			}
		});
    }
    
    Cart.reg = function(){
    	var _this = this;
    	// 全选cbx
	    $('.allCbx').click(function(){
	    	var flag = this.checked;
	    	$all.prop('checked',flag);
	    	pageSetting();
	    });
	    // 店铺cbx
	    $('.shopCbx').click(function(){
	    	var flag = this.checked;
	    	$(this).parents('.shopBox').find(':checkbox').prop('checked',flag);
	    	pageSetting();
	    });
	    // 商品cbx,:not(.gift)
	    $goods.find(':checkbox').click(function(){
	    	var $shop = $(this).parents('.shopBox'),
	    		len = $shop.find('.goods-box').length,
	    		checkedLen = $shop.find('.goods-box :checked').length,
	    		flag = len === checkedLen;
	    	$shop.find(':checkbox:not([disabled])')[0].checked = flag;
	    	pageSetting();
	    });
	    
	    /*$goods.find('.gift').click(function(){
	    	return false;
	    });*/
	    // 购物车提交
	    $('#cartForm').submit(function(){
	    	return !!$goods.find(':checked').length;
	    });
    }
    
    Cart.allCheck = function(){
    	$('.allCbx').eq(0).prop('checked',false).click();
    }
    Cart.remove = function(_this){
    	var url = $(_this).attr('href');
    	$.ajax({
    		url:url,
    		success:function(){location.reload();},
    		error:function(){alert('删除出错')}
    	});
    	return false;
    };
    Cart.removeMany = function(){
    	var data = $('#cartForm').serialize();
    	if( !data ){
    		Toast.alert('请先选择要删除的商品');
    		return false;
    	}
    	Toast.confirm('确认要批量删除吗？',function(){
    		var url = 'wx/index!deleteManyCar';
    		Toast.loading('show');
    		$.ajax({url:url,type:'post',data:data,success:function(){location.reload()}});
    	});
    }
    // 初始化
    Cart.init = function(){
    	window.Cart = this;
    	this.reg();
    	if( $goods.length ){
    		this.allCheck();
    	}else{
    		$('.allCbx').prop('disabled',true);
    		$('#bc').hide();
    	}
    }
    Cart.init();
	
	// 编辑全部
	$('#edit-all').click(function(){
		$('.editCart').removeClass('editCart');$('body').toggleClass('editCart');
	});
	// 完成全部
	$('#finish-all').click(function(){
		$('.editCart').removeClass('editCart');
	});
	// 编辑商店
	$('[id^="edit-shop-"]').click(function(){
		$(this).parents('.shopBox').toggleClass('editCart');$('#bc').addClass('editCart');
	});
	// 完成商店
	$('[id^="fin-shop-"]').click(function(){
		$(this).parents('.shopBox').toggleClass('editCart');$('#bc').removeClass('editCart');
	});
	// 自适应高度
	$('.order-leave textarea').off().on('keyup',function(){
		textareaAutoHeight(this,30);
	})
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
			val	= $(obj).val(),
			i = 0, len = val.length, totalWidth = 0, result = minHeight;
		width = isBorderBox ? width - paddingHorizontal : width;
		
		for(;i<len;i++){
			totalWidth += val.charCodeAt(i) > 128 ? fontSize : fontSize*0.5;
		}
		result = Math.ceil(totalWidth / width)*lineHeight + (isBorderBox ? paddingVertical : 0);
		result = Math.max(result, minHeight);
		obj.style.height = result+'px';
	}
	
	// 件数编辑
	$('.cartList .calc i').click(function(){
		var $this = $(this),
			isPlus = /\+/.test($this.html()),
			$input = $this.parents('.calc').find('input'),
			nCount = $input.val()*1,
			nIncrease = isPlus ? 1 : -1;
		nCount += nIncrease;
		nCount<1 && (nCount = 1);
		$input.val(nCount);
		// Cart.ajaxSetCount($input);
	});
	$('.cartList .calc [type=tel]').change(function(){
		// Cart.ajaxSetCount($(this));
	});
})(jQuery,window);