<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%request.setAttribute("domain", com.cep.units.CepURLConfig.domain); %>
<!DOCTYPE html>
<html>
<head>
<%@include file="../common/head_meta.jsp" %>
<title>询价 - <s:property value="#webname"/></title>
<link rel="stylesheet" href="css/app-inquiry.css?1116">
<link rel="stylesheet" href="css/app-inquiry-add.css?1130">
<link rel="stylesheet" href="js/area/mobile-select-area.css">
<script src="js/area/dialog.js"></script>
<script src="js/area/mobile-select-area.js"></script>
</head>
  
<body>

<!-- 主页面 -->
<section id="page-index">
	<div class="inquiry-box" data-bind="css:{hide:!shop_id}">
		<div class="tabs" id="shopLink">
    		<a href="javascript:void(0)" class="cur">向他询价</a>
    		<a data-bind="attr:{href:'/m/shopIndex!shopIntro?id='+shop_id}">店铺介绍</a>
    	</div>
    	<div class="wh-box" style="padding-bottom:0">
    		<p class="hide" data-bind="css:{hide:!shop_id}"><s:property value="shop.shopName"/></p>
    	</div>
	</div>
	<!-- 店铺进来的显示 -->
	
	<section class="inquiry-seg">
		<div class="inquiry-car">
			<div class="line fix">
				<a class="line-item fl" data-bind="click: startChoose" data-type="0">选择车型</a>
				<div class="text fr">
					<span data-bind="visible: !ccvm.currentBrand() && !ccvm.carBrandName() && !ccvm.currentSeries()">必填</span>
					<span data-bind="text: ccvm.carBrandName"></span>
					<span data-bind="text: ccvm.carSeriesName"></span>
				</div>
			</div>
			<div class="line fix">
				<a class="line-item fl" data-bind="click: startChoose" data-type="1">排量、年款</a>
				<div class="text fr" data-bind="text: ccvm.carYearName">选填</div>
			</div>
			<div class="line fix df">
				<a class="line-item fl df-box">车架号</a>
				<div class="webpack line-input"><input type="text" placeholder="请输入17位车架号" style="width:90%;"></div>
				<div class="text fr df-box">图标</div>
			</div>
			<div class="line fix df">
				<a class="line-item fl df-box">车牌号</a>
				<div class="webpack line-input"><a>粤</a><input type="text" placeholder="请输入" style="width:70%;"></div>
				<div class="text fr df-box">图标</div>
			</div>
		</div>
	</section>
	<section class="inquiry-seg">
		<div class="add_parts">
			<a class="add_parts_title" data-bind="click: startParts">添加配件</a>
			<div class="add_parts_bg" data-bind="style: {height:inquiryPartsBgHeight()}">
				<span class="text text-parts" data-bind="foreach:inquiryParts">
					<a href="javascript:void(0);" data-bind="click: $root.removePart, text: ($index()+1)+'.'+$data"></a>
				</span>
			</div>
		</div>
	</section>
	<!-- 选择车型 -->
	
	<!-- 图片上传 S -->
	<section class="inquiry-seg">
		<div class="inquiry-photo">
			<div class="upload-label" data-bind="">添加照片（可上传车辆、产品、采购清单等照片）</div>
			<div class="img-box">
				<div class="img">
					<img src="/images/demo/demo1.jpg" alt="">
					<i class="del"></i>
				</div>
				<div class="img">
					<img src="/images/demo/demo2.jpg" alt="">
					<i class="del"></i>
				</div>
				<div class="img">
					<img src="/images/demo/demo3.png" alt="">
					<i class="del"></i>
				</div>
				<div class="img">
					<img src="/images/demo/demo1.jpg" alt="">
					<i class="del"></i>
				</div>
				<div class="img">
					<img src="/images/demo/demo1.jpg" alt="">
					<i class="del"></i>
				</div>
				<div class="img-box isOneImg" data-bind="click: chooseImage,css:{hide:isOne()},attr:{'data-type':labelAttr}">
					<img src="/images/wx/inquiry/camera.png" alt="">
				</div>
				<div class="img" data-type="vin" data-bind="css:{hide:!pics.vin()}">
					<img data-bind="attr:{src:pics.vin}">
					<i class="del" data-bind="click: removeImage, css:{hide:!pics.vin()}"></i>
				</div>
				<div class="img" data-type="car" data-bind="css:{hide:!pics.car()}">
					<img data-bind="attr:{src:pics.car}">
					<i class="del" data-bind="click: removeImage, css:{hide:!pics.car()}"></i>
				</div>
				<div class="img" data-type="goods" data-bind="css:{hide:!pics.goods()[0]}">
					<img data-bind="attr:{src:pics.goods()[0]}">
					<i class="del" data-bind="click: removeImage, css:{hide:!pics.goods()[0]}"></i>
				</div>
				<div class="img" data-type="list" data-bind="css:{hide:!pics.list()}">
					<img data-bind="attr:{src:pics.list}">
					<i class="del" data-bind="click: removeImage, css:{hide:!pics.list()}"></i>
				</div>
			</div>
			<!-- <div class="oh">
				<span class="btn" data-type="vin"   data-bind="click: chooseImage, css:{'btn-red':pics.vin()}">车架号</span>
				<span class="btn" data-type="car"   data-bind="click: chooseImage, css:{'btn-red':pics.car()}">车辆图片</span>
				<span class="btn" data-type="goods" data-bind="click: chooseImage, css:{'btn-red':pics.goods()[0]}">产品图片</span>
				<span class="btn" data-type="list"  data-bind="click: chooseImage, css:{'btn-red':pics.list()}">采购清单</span>
			</div> -->
			<%--<input type="file" id="instead">--%>
		</div>
	</section>
	<!-- 图片上传 E -->

	<!-- 留言 S -->
	<section class="">
		<div class="inquiry-message">
			<div class="record-btn fl" data-bind="click: startRecord"></div>
			<div class="msg-textarea">
				<textarea placeholder="给商家留言（不能添加配件）" data-bind="textInput: message,event:{keyup:textareaAutoHeight}" maxlength="255"></textarea>
			</div>
		</div>
		<div class="sound-box inquiry-sound-box">
			<!--ko foreach:voices-->
			<div class="sound-record" data-bind="attr:{style:'width:'+width()},click:$root.playVoice">
				<span data-bind="text: duration_tx"></span>
				<b></b>
				<i class="del" data-bind="click: $root.removeVoice"></i>
			</div>
			<!--/ko-->
		</div>
		<!-- 语音留言 -->
	</section>
	<!-- 留言 E -->
	
	<%-- <!--优化省略-->
	<section class="inquiry-seg">
		<div class="inquiry-type">
			<p class="mb10 fs15">配件类型</p>
			<div class="cbx-box" data-bind="foreach: typeList">
				<input type="checkbox" class="hide" data-bind="attr:{id:'type'+$index()}, checked:$root.typeCbx, value:value">
				<label data-bind="attr:{for:'type'+$index()},text:text"></label>
			</div>
		</div>
	</section>
	<!-- 配件类型 -->--%>
	
	

    <div class="inquiry-box">
    	<%--<div class="wh-box oh">
    		<p class="fr blue">拍照上传车架号 / 车辆 / 需采购产品图片</p>
    	</div>
		
		<div class="wh-box upload-box">
			<div class="upload-img" data-type="vin" data-bind="click: chooseImage">
				<p class="upload-title">车架号图片</p>
				<img data-bind="attr:{src:pics.vin},css:{hide:!pics.vin()}">
				<i class="del" data-bind="click: removeImage, css:{hide:!pics.vin()}"></i>
			</div>
			<div class="upload-img" data-type="car" data-bind="click: chooseImage">
				<p class="upload-title">车辆图片</p>
				<img data-bind="attr:{src:pics.car},css:{hide:!pics.car()}">
				<i class="del" data-bind="click: removeImage, css:{hide:!pics.car()}"></i>
			</div>
			<div class="upload-img" data-type="goods" data-bind="click: chooseImage">
				<p class="upload-title">购买产品图片</p>
				<img data-bind="attr:{src:pics.goods()[0]},css:{hide:!pics.goods()[0]}">
				<i class="del" data-bind="click: removeImage, css:{hide:!pics.goods()[0]}"></i>
			</div>
			
			<div class="upload-img upload-big" data-type="goods" data-bind="css:{hide:pics.goods().length>1},click: chooseImage"><p class="upload-title">一次性购买多个产品，请拍照上传产品清单</p></div>
			

			<div class="upload-img" data-type="goods" data-bind="css:{hide:pics.goods().length<2},click: chooseImage">
				<p class="upload-title">更多产品图片</p>
				<img data-bind="attr:{src:pics.goods()[1]},css:{hide:!pics.goods()[1]}">
				<i class="del" data-bind="click: removeImage, css:{hide:!pics.goods()[1]}"></i>
			</div>
			<div class="upload-img" data-type="goods" data-bind="css:{hide:pics.goods().length<2},click: chooseImage">
				<p class="upload-title">更多产品图片</p>
				<img data-bind="attr:{src:pics.goods()[2]},css:{hide:!pics.goods()[2]}">
				<i class="del" data-bind="click: removeImage, css:{hide:!pics.goods()[2]}"></i>
			</div>
			<div class="upload-img" data-type="goods" data-bind="css:{hide:pics.goods().length<3},click: chooseImage">
				<p class="upload-title">更多产品图片</p>
				<img data-bind="attr:{src:pics.goods()[3]},css:{hide:!pics.goods()[3]}">
				<i class="del" data-bind="click: removeImage, css:{hide:!pics.goods()[3]}"></i>
			</div>
			
		</div>
		<!-- 图片上传 -->--%>
		
		<%--<div class="wh-box sound-box">
			<div class="sound-line">
				<span class="sound-btn">留言</span>
				
				<a class="fr" data-bind="click: startRecord">
					<span class="blue sound-msg ar">点击录音留言<br>记得提供车型年款哦！</span></span><span class="sound-mic" ></span>
				</a>
			</div>
			<!--ko foreach:voices-->
			<div class="sound-record" data-bind="attr:{style:'width:'+width()},click:$root.playVoice">
				<span data-bind="text: duration_tx"></span>
				<b></b>
				<i class="del" data-bind="click: $root.removeVoice"></i>
			</div>
			<!--/ko-->
		</div>
		<!-- 语音留言 -->
		<div class="wh-box textarea-box">
			<textarea placeholder="也可选择文字留言..." data-bind="textinput:message" maxlength="255"></textarea>
		</div>
		<!-- 文本留言 -->
		--%>
		
		<%-- <!--优化省略-->
		<div class="wh-box c-box brand-box">
			<div class="box-table vm">
				<span class="wsn" style="padding-right:10px">送货时间</span>
				<strong class="wsn" style="padding: 6px 10px;">
					<input type="date" placeholder="送货时间" data-bind="value: date">
				</strong>
				<a class="btn btn-blue" onclick="location.hash='#page-brand'" style="line-height:1.4;padding:0 5px;" data-bind="text: brand_tx"></a>
			</div>
		</div>
	
		
		--%>
		<s:if test="userAddrs.size()<1">
		<div class="wh-box c-box inquiry-address-box">
			<div class="box-table vm">
				<span class="wsn" style="padding-right:10px">送货地址</span>
				<strong onclick="location.hash='#page-addr'"><span data-bind="text: addr_tx">读取送货地址</span></strong>
				<a onclick="location.hash='#page-addr'" class="wsn btn btn-blue">点击重选地址</a>
			</div>
		</div>
		</s:if>
		
		<div class="wh-box c-box">
			<a class="inquiry-submit wsn btn btn-red btn-block btn-large" data-bind="click: submit">发布询价</a>
		</div>
    </div>
</section>


<%--<section class="page-box" id="page-brand" data-effect="slideRight">
	<div class="head-title">
        <div class="c-box">
            <div class="box-table">
                <span>
                    <a href="javascript:history.go(-1)" class="goback"></a>
                </span>
                <strong>选择品牌</strong>
                <span><a class="right"></a></span>
            </div>
        </div>
    </div>
    
    <div class="container has-fixed">
	    <s:set name="topShows" value="topCarBrands"/>
		<s:set name="brandMaps" value="carBrandMaps"/>
		<s:set name="hideRe" value="true"/>
		<s:set name="hideRe" value="true"/>
		<%@include file="../common/brand_top_maps.jsp" %>
	</div>
</section>--%>

<div id="filter-parts" class="f-block filter-block" style="top:0;z-index:502">
	<div class="frame">
		<div>
			<div class="head-search pl9 noright">
				<div class="c-box">
					<div class="box-table left">
	                    <strong data-bind="css:{expend: kevm.isShow() && kevm.cacheKwList().length}">
	                        <input type="text" placeholder="添加需报价配件" autocomplete="off" data-bind="event: {focus: kevm.getExpend}" id="queryGoodsName">
	                        <div class="searchword-expend">
	                			<span class="bclose" data-bind="click: kevm.close"></span>
	                			<!-- ko foreach: kevm.cacheKwList -->
	                			<a href="javascript:void(0)" data-bind="text: $data, click: $root.addPart"></a>
	                			<!-- /ko -->
	                		</div>
	                    </strong>
	                    <span>
	                        <button>搜索</button>
	                    </span>
					</div>
				</div>
			</div>
		</div>
		<!-- 搜索 -->
		<div class="type-nav has-fixed">
			<div class="right" style="top:40px;left:0">
				<section class="">
					<div class="inquiry-parts" data-bind="css:{error: inquiryPartsErr()}">
						<span>已选：</span>
						<%--<p data-bind="visible: !inquiryParts().length">可在顶部输入框搜索需报价配件</p>--%>
						<!-- ko foreach:inquiryParts -->
						<a href="javascript:void(0);" data-bind="click: $root.removePart, text: ($index()+1)+'.'+$data"></a>
						<!-- /ko -->
					</div>
				</section>
				<!-- 选择商品 -->
			</div>
			<div class="clear">
				<a href="javascript:void(0)" data-bind="click: part_ok">确定</a>
            	<a href="javascript:void(0)" data-bind="click: part_close" style="background:#fff;color:#2e61bc">取消</a>
            </div>
		</div>
	</div>
</div>

<%@include file="qp_carsize.jsp" %>

<%@include file="../common/addr_choose.jsp" %>

<%@include file="../common/addr_mgm.jsp" %>

<div id="toastRecord" class="toast-record hide">
	<div class="container">
		<div class="title">正在录音</div>
		<div class="mic"><b></b></div>
		<div class="ac blue time">00:00</div>
		<div class="btns">
			<a class="cancel">取消</a>
			<a class="ok">说完了</a>
		</div>
	</div>
</div>
<script>
if(!UA.isWX && sessionStorage.getItem('wx_allowed')!='true'){
	location.href = '/htmls/qrcode/index.html?url='+encodeURI(location.href);
}
</script>
<%@ include file="../common/js_foot.jsp" %>
<script src="js/wx/myhash.js"></script>
<script src="js/wx/addr.js"></script>
<script>Addr.needReload = false;Addr.init();var letterNavScroll = $('#page-brand .container')[0];$('.letter-nav').appendTo('#page-brand');</script>

<script src="js/wx/inquiry/carSize.js?1122"></script>
<script src="js/wx/inquiry/keywordExpend.js?1121_3"></script>
<script src="js/wx/inquiry/add.js?1222"></script>

<script src="js/jquery.scrollLoading-min.js"></script>
<%--<script>$('img[data-url]').scrollLoading({wrapper:'#page-brand .container'});</script>--%>
<script>
if(wxkit){
	wxkit.share_update({
		url: location.href,
		title: Js_global.platname+'-<s:property value="shop.shopName"/>',//店铺列表
		imgUrl: '${domain}/<s:property value="shop.shopImg"/>',
		desc: '主营业务：<s:property value="shop.businesses"/>'
	});
}
</script>

</body>
</html>