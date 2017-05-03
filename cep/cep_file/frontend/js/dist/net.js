/**
 * Connection net figure
 * @authors Your Name (you@example.org)
 * @date    2017-05-02 22:22:24
 * @version $Id$
 */
var mockJSON = {
	'images':[
				'./images/op850/00.png',
				'./images/op850/01.png',
				'./images/op850/02.png',
				'./images/op850/03.png',
				'./images/op850/04.png',
				'./images/op850/05.png',
				'./images/op850/06.png',
				'./images/op850/07.png',
				'./images/op850/08.png',
				'./images/op850/09.png',
				'./images/op850/10.png',
				'./images/op850/11.png',
				'./images/op850/12.png',
				'./images/op850/13.png',
				'./images/op850/14.png',
				'./images/op850/15.png',
				'./images/op850/16.png',
				'./images/op850/17.png'
			 ]
}
;(function($){
	function Net(setting){
		var self = this;
		// default setting
		this.setting = {
			centerWidth: 100, //firstItem(side0) default width & height
			sideNum: 5, //box-side 个数
			maxSideNum: 35, //box-side 最多个数
			mixSideNum: 3 //box-side 最少个数
		};
		$.extend(this.setting, setting || {});

		// 保存body对象
		this.bodyNode = $(document.body);
		// 获取body高度
		this.bodyHeight = this.bodyNode.outerHeight();

		//所调用对象box
		this.boxTag = $('.box');

		// 获取box宽高
		this.boxWidth = this.boxTag.outerWidth();
		this.boxHeight = this.boxTag.outerHeight();

		// box与body顶部距离，即top值
		this.disItemSide = this.bodyHeight - this.boxHeight;

		this.lineTag = '<div class="line-c"></div>';
		this.img = mockJSON['images'];

		$(window).load(function(){
			self.init();
		})
	}

	Net.prototype = {
		init: function(){
			this.boxTag.css({
				'top': this.disItemSide/2
			})
			this.boxSideDOM();
		},
		boxSideDOM: function(){
			var n = this.setting.sideNum,dom = ''; 
			/*if(n>=this.setting.maxSideNum){
				n=this.setting.maxSideNum;
			}elseif(n<=this.setting.mixSideNum){
				n=this.setting.mixSideNum
			}else{
				n=this.setting.sideNum;
			}*/
			n=n>=this.setting.maxSideNum?this.setting.maxSideNum:n<=this.setting.mixSideNum?this.setting.mixSideNum:this.setting.sideNum;
			for(var i=1;i<=n;i++){
				dom+='<div class="box-item side'+i+'"><div class="box-side box-animate l50p border"><span data-src="'+this.img[i]+'"></span></div></div>';
			}
			this.boxTag.append(dom);

			// 获取box下各子元素
			this.boxItemTag = this.boxTag.find('.box-item');
			this.boxCenterTag = this.boxTag.find('.box-center');

			// 获取box-side元素
			this.boxSideTag = this.boxTag.find('.box-item').find('div');
			// 子元素box-item下的box-side的属性(宽/高/个数/向上取整/向下取整)
			this.sideHeight = this.boxSideTag.outerHeight(); //box-size宽高相等
			this.sideLength = this.boxSideTag.length;
			this.sideCeil = Math.ceil(this.sideLength/2);
			this.sideFloor = Math.floor(this.sideLength/2);
			this.boxSideCss();
		},
		boxSideCss:function(){
			var self = this;

			// box-item
			this.boxItemTag.each(function(i,o){
				// box-item height
				self.itemHeight = self.boxHeight-self.sideHeight;

				self._itemHeight = Math.random()/2*self.boxHeight+self.setting.centerWidth/2;
				/*if(self._itemHeight<self.setting.centerWidth+self.setting.centerWidth/2){
					self._itemHeight+=self.setting.centerWidth+self.setting.centerWidth/2;
				}*/
				// side1以上的盒子的高度不能小于side0的，小于的话填上side0的高度加系数
				self._itemHeight<self.setting.centerWidth+self.setting.centerWidth/2&&(self._itemHeight+=self.setting.centerWidth+self.setting.centerWidth/2);
				console.log(self._itemHeight);

				//box-center
				if(i==0){
					$(this).css({
						'width':self.itemHeight,
						'height':self.itemHeight,
						'position':'absolute',
						'top':self.sideHeight/2,
						'left':'50%',
						'marginLeft' : '-'+self.itemHeight/2+'px'
					});
					// 第一个item下的side0的位置关系
					$('.side'+i).find('.box-center').css({
						'width':self.setting.centerWidth,
						'height':self.setting.centerWidth
					}).animate({
						'opacity':1
					},500).addClass('tl50p').removeClass('l50p');
					$(this).find('span').data('src',self.img[i])
				}else{
					// box-side
					$(this).css({
						'width':self._itemHeight,
						'height':self._itemHeight,
						'position':'absolute',
						'top':(self.boxHeight - self._itemHeight)/2,
						'left':'50%',
						'marginLeft' : '-'+self._itemHeight/2+'px',
						'transform':'rotate('+ (i-1)*360/self.sideLength +'deg)',
					}).prepend(self.lineTag);
					$(this).find('.box-side').css({
						'transform':'rotate('+ -(i-1)*360/self.sideLength +'deg)',
						'marginLeft':'-'+ self.sideHeight/2 +'px',
						'top': '70px'
					}).animate({
						'top': '-50px',
						'opacity':1
					},500).attr('data-point',i);
				}
				// 将图片放入背景图片
				$(this).find('span').css({
					'backgroundImage': 'url('+$(this).find('span').data('src')+')'
				})
			})
		}

		//背景图比例关系
		//鼠标移过出现文字(名字)
	}
	// Net.init();

	window['Net'] = Net;
})(jQuery,window)