function selectBox (obj) {
	var brand_arr = [];
	var data_arr = [];
	var pop = '<div class="win_mask"><div class="mask"></div><div class="pop">';
	var name;
	var subpop = '<div><h1 class="name">请输入'+name+'</h1><div><input type="text" value=""></div><p></p></div>';
	var subpop_btn = {
		"enter":"<a>确定</a>",
		"cancel":"<a>取消</a>"
	}
	var t = obj.find('.pop').children('span');
	if(obj.data('type') == '1'){
		for(var i = 0;i < brand_arr.length;i++){
			pop += '<span>'+brand_arr[i]+'</span>';
			name = '品牌名';
		}
	}else{
		for(var i = 0;i < data_arr.length;i++){
			pop += '<span>'+data_arr[i]+'</span>'
			name = '预约期';
		}
	}
	pop += '</div></div>';
	obj.after(pop);
	$('.mask').on('click',function(){
		$('body').css('overflow','');
		$(this).parent().remove();
	});
	t.each(function(i,o){
		$(this).on('click',function(){
			$('body').css('overflow','hidden');
			if(/自定义/.test(t.text())){
				$(this).parent().remove();
				obj.append(subpop);
			}else{
				if(/品牌/.test(t.text())){
					$(this).parents('ul').next().find('.fr').text('1');
				}else if(/保/.test(t.text())){
					$(this).parents('ul').next().find('.fr').text('2');
				}else{
					$(this).parents('ul').next().find('.fr').text('0');
				}
				$(this).parents('.win_mask').remove();
				obj.text($(this).text());
			}
		});
	})
}