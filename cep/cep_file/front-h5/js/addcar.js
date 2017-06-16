$(function(){
		var Initials=$('.initials');
		var LetterBox=$('#letter');
		Initials.find('ul').append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li><li>#</li>');
		initials();

		$(".initials ul li").click(function(){
			var LetterHtml=$(this).html();
			LetterBox.html(LetterHtml).fadeIn();

			Initials.css('background','rgba(145,145,145,0.6)');
			
			setTimeout(function(){
				Initials.css('background','rgba(145,145,145,0)');
				LetterBox.fadeOut();
			},1000);

			var _index = $(this).index();
			if(_index==0){
				$('html,body').animate({scrollTop: '0px'}, 300);
			}else if(_index==26){
				var DefaultTop=$('#default').position().top;
				$('html,body').animate({scrollTop: DefaultTop+'px'}, 300);
			}else{
				var letter = $(this).text();
				if($('#'+letter).length>0){
					var LetterTop = $('#'+letter).position().top;
					$('html,body').animate({scrollTop: LetterTop-45+'px'}, 300);
				}
			}
		})

		var windowHeight=$(window).height();
		var InitHeight=windowHeight-45;
		Initials.height(InitHeight);
		var LiHeight=InitHeight/28;
		Initials.find('li').height(LiHeight).css({
			'textAlign':'center',
			'fontSize':'12px'
		});

		$('#choosecar').click(function(){
			$('.carBrand').show();
		});
		$('#goback').click(function(){
			$('.carBrand').hide();
		});
		$('#right_closed').click(function(){
			$('.right_menu').css({transform: 'translateX(100%)'});
			$('.right_mask').fadeOut();
			$('.list_maker').find('dl a').removeClass('cur');
		});
		$(".list_brand,.hotBrand li").on('click',function(){
			var _this = $(this);
			$('.right_mask').show();
			$('#car_series').val($(this).find('span').text()+' ');
			$("#twoName").text($(this).find("span").text());

			$(this).addClass("cur").siblings(".list_brand").removeClass("cur");
			
			$('.right_menu').css('transform','translateX(0%)');
			$('.list_maker').on('click','dl a',function(){
				$(this).addClass('cur').parent('dd').siblings('dd').find('a').removeClass('cur');
				$('#car_series').val(_this.find('span').text()+' '+$(this).text());
				$('.carBrand').fadeOut();
			})
		});
})


function initials() {
	var SortList=$(".list_brand");
	var SortBox=$(".list_type");
	SortList.sort(asc_sort).appendTo('.list_type');
	function asc_sort(a, b) {
		return makePy($(b).find('span').text().charAt(0))[0].toUpperCase() < makePy($(a).find('span').text().charAt(0))[0].toUpperCase() ? 1 : -1;
	}

	var initials=[];
	var num=0;
	SortList.each(function(i) {
		var initial = makePy($(this).find('span').text().charAt(0))[0].toUpperCase();
		if(initial>='A'&&initial<='Z'){
			if (initials.indexOf(initial) === -1)
				initials.push(initial);
		}else{
			num++;
		}
		
	});

	$.each(initials, function(index, value) {
		SortBox.append('<h1 id="'+ value +'">' + value + '</h1>');
	});
	if(num!=0){SortBox.append('<h1 id="default">#</h1>');}

	for (var i=0;i<SortList.length;i++) {
		var letter=makePy(SortList.eq(i).find('span').text().charAt(0))[0].toUpperCase();
		switch(letter){
			case "A":
				$('#A').after(SortList.eq(i));
				break;
			case "B":
				$('#B').after(SortList.eq(i));
				break;
			case "C":
				$('#C').after(SortList.eq(i));
				break;
			case "D":
				$('#D').after(SortList.eq(i));
				break;
			case "E":
				$('#E').after(SortList.eq(i));
				break;
			case "F":
				$('#F').after(SortList.eq(i));
				break;
			case "G":
				$('#G').after(SortList.eq(i));
				break;
			case "H":
				$('#H').after(SortList.eq(i));
				break;
			case "I":
				$('#I').after(SortList.eq(i));
				break;
			case "J":
				$('#J').after(SortList.eq(i));
				break;
			case "K":
				$('#K').after(SortList.eq(i));
				break;
			case "L":
				$('#L').after(SortList.eq(i));
				break;
			case "M":
				$('#M').after(SortList.eq(i));
				break;
			case "N":
				$('#N').after(SortList.eq(i));
				break;
			case "O":
				$('#O').after(SortList.eq(i));
				break;
			case "P":
				$('#P').after(SortList.eq(i));
				break;
			case "Q":
				$('#Q').after(SortList.eq(i));
				break;
			case "R":
				$('#R').after(SortList.eq(i));
				break;
			case "S":
				$('#S').after(SortList.eq(i));
				break;
			case "T":
				$('#T').after(SortList.eq(i));
				break;
			case "U":
				$('#U').after(SortList.eq(i));
				break;
			case "V":
				$('#V').after(SortList.eq(i));
				break;
			case "W":
				$('#W').after(SortList.eq(i));
				break;
			case "X":
				$('#X').after(SortList.eq(i));
				break;
			case "Y":
				$('#Y').after(SortList.eq(i));
				break;
			case "Z":
				$('#Z').after(SortList.eq(i));
				break;
			default:
				$('#default').after(SortList.eq(i));
				break;
		}
	};
}
function province(){
	var proLi = $('.inquiry-province ul').find('li');
	if(!proLi.length){
		var provinceUl = '<section><div></div><ul><li>京</li><li>津</li><li>沪</li><li>渝</li><li>冀</li><li>晋</li><li>辽</li><li>吉</li><li>黑</li><li>苏</li><li>浙</li><li>皖</li><li>闽</li><li>赣</li><li>鲁</li><li>豫</li><li>鄂</li><li>湘</li><li>粤</li><li>琼</li><li>川</li><li>贵</li><li>云</li><li>陕</li><li>甘</li><li>青</li><li>桂</li><li>蒙</li><li>藏</li><li>宁</li><li>新</li></ul></section>';
		$('.inquiry-province').append(provinceUl);
		var proLi = $('.inquiry-province ul').find('li');
		$('.inquiry-province').on('click','section',function(event){
			event.preventDefault();
			$(this).remove();
		});
		$(proLi).each(function(index, el) {
			$(this).on('click', function(event) {
				event.preventDefault();
				$('.province').text($(this).text());
				$(this).parent('ul').prev('div').remove();
				$(this).parent('ul').remove();
			});
		});
	}
};