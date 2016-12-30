function href(url){
	window.location.href=url;
}

function chg2Vin(cb){
	$('.main').addClass('hide');
	$('.search-page').removeClass('hide');
	$('body').addClass('body-vin');
	if(cb){
		$('.head-search a[href*="?vin=1"]').off('click').click(cb);
	}
}
$('.head-search a[href*="?vin=1"]').click(function(){
	if( $('.search-page').is('.hide') ){
		chg2Vin();	
	}else{
		$('.main').removeClass('hide');
		$('.search-page').addClass('hide');
		$('body').removeClass('body-vin');
	}
	return false;
});

if(getQueryString('vin')){
	chg2Vin(function(){
		return false;
	});
}else{
	//swipe 1.0
	var swipe = new Swipe($('#swiper')[0],{
		speed: 500,
		auto: 3000,
		// for 1.0
		callback: function(index, elem){      
			$(this.element).next('ol').children().removeClass('on').eq(this.index).addClass('on');
		}
	});
	$('#swiper img').each(function(){
		$(this).attr('src',$(this).attr('data-url'));
	});

	$('#swiper ul li').each(function(i,o){
	      var cln = i==0?' class="on"':'';
	      $('#swiper ol').append('<li'+cln+'></li> ');
	});

	$('.search-btn').click(function(){
		$('.main').addClass('hide');
		$('.search-page').removeClass('hide');
	});

	$('.search-page .goback').click(function(){
		$('.search-page').addClass('hide');
		$('.main').removeClass('hide');
	});
	
	$('img[data-url]').scrollLoading({wrapper:'.main',offsetTop:78,callback:function(){
		$(this).css('opacity',0).load(function(){
			var $o = $(this);
			$o.addClass('fadeIn');
			this.timer = setTimeout(function(){
				$o.css('opacity',1).removeClass('fadeIn');
			},500);
		});
	}});
	
	// 平台信息&平台订单信息
	function platformReg(){
		// 平台信息
		$('.plat-info .platform').click(function(e){
			location.href = '/common!chooseSonPlatforms';
			//location.href = '/commonPage/system/chooseSonPlatforms.jsp';
		});
		// 订单走马灯
		var flagOrderRace = window.sessionStorage.getItem('orderRaceHide');
		
		if( $('.order-race li').length && !flagOrderRace ){
			var receTimer = null, raceTimout = null;
			var nRace = 0, nRaceLen = $('.order-race li').length,
				sRaceTrans = '-webkit-transition:-webkit-transform .5s ease;transition:transform .5s ease;',
				$ul = $('.order-race ul');
				$ul.find('li').addClass('fix').append('<span><img src="/images/demo/demo1.jpg" alt=""></span><b></b>')
			$ul.append($('.order-race li:first').clone());// 作为连续用
			function raceChg(){
				var top = 0, style, height = $('.order-race').height();
				nRace++;
				if( nRace>=nRaceLen+1 ){// 新增clone一个所以+1
					nRace = 1;
					top = -height+'px';
				}else{
					top = -height*nRace+'px';
					if( nRace==nRaceLen ){// 新增clone一个所以+1
						// 最后一个
						raceTimout = setTimeout(function(){
							$ul.attr('style','-webkit-transform: translate(0,0);transform: translate(0,0);');
						},500);
					}
				}
				
				$ul.attr('style',sRaceTrans+'-webkit-transform: translate(0,'+top+');transform: translate(0,'+top+');');
			}
			receTimer = setInterval(raceChg,4500);
			
			/*$('.order-race .close').click(function(){
				
				$('.order-race').addClass('hide');
				window.sessionStorage.setItem('orderRaceHide','true');
				
			});*/
		}else{
			$('.order-race').addClass('hide');
		}
	}

	function getPlatformInfo(){
		$.ajax({
			url: '/m/index!ajaxGetPf',
			dataType: 'json',
			success: function(data){
				if(data.res.status!=0){
					console.log(data);
					return false;
				}
				
				var inf = data.inf;
				// 订单信息
				var orders = inf.orders, aHtml = [];
				if(orders && orders.length){
					$.each(orders,function(i,o){
						aHtml.push('<li>'+o+'</li>');
					});
					$('.order-race ul').html(aHtml.join(''));
				}else{
					$('.order-race').hide();
				}
				
				// 平台信息
				var platforms = inf.pfs, aplatHtml = [], curPf = inf.curPf;
				if(platforms && platforms.length){
					$.each(platforms,function(i,o){
						aplatHtml.push('<li data-href="'+o.url+'">'+o.name+'</li>');
					});
					$('.plat-info .platform ul').html(aplatHtml.join(''));
				}else{
					// $('.plat-info .cor').hide();
				}
				$('.plat-info .platform em').html(curPf);
				
				$('.plat-info').removeClass('hide');
				
				platformReg();
			},
			error: function(){console.log(arguments)}
			
		});
	}
	getPlatformInfo();
}

/* 一级分类 */
(function(){
	var href = 'm/index!newGoodsTypeData';
	$.get('/common!ajaxGetNewTypeOfOne',function(data){
		if( data.res.status!=0 ){
			alert(data.res.errMsg||'接口调用出错');
			return false;
		}
		var inf = data.inf, aHtml = [];
		inf.arr && $.each(inf.arr,function(i,o){
			aHtml.push('<a href="'+href+'#'+o.index+'">'+o.name+'</a>');
		});
		$('#firstType').html(aHtml.join(''));
		console.log(data);
	},'json');
})();



/**
 * ScrollFix v0.1
 * http://www.joelambert.co.uk
 *
 * Copyright 2011, Joe Lambert.
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
/* ===============================================================================
************   ScrollFix   ************
=============================================================================== */

;+function($) {
    "use strict";
    //安卓微信中使用scrollfix会有问题，因此只在ios中使用，安卓机器按照原来的逻辑

    if(/iphone|ipad/.test(UA.career)){
        var ScrollFix = function(elem) {

            // Variables to track inputs
            var startY;
            var startTopScroll;

            elem = elem || document.querySelector(elem);

            // If there is no element, then do nothing
            if(!elem)
                return;

            // Handle the start of interactions
            elem.addEventListener('touchstart', function(event){
                startY = event.touches[0].pageY;
                startTopScroll = elem.scrollTop;

                if(startTopScroll <= 0)
                elem.scrollTop = 1;

            if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
                elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
            }, false);
        };

        var initScrollFix = function(){
            var scrollable = $(".main");
            new ScrollFix(scrollable[0]);
        };

        $(document).on('touchmove', ".bottom-nav, .head-search",function(event){
            event.preventDefault();
        });
        initScrollFix();
    }

}(jQuery);