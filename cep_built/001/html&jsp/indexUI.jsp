<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="common/head_meta.jsp" %>
<s:set name="metakw" value="车E配 车E配官网 车E配网络汽配城 网络汽配城 汽配销售 汽配采购 汽配资讯 汽配网 车E配电商平台"/>
<s:set name="metadesc" value="车E配网络汽配城汇集了众多优秀汽车配件供应商,真正提供互联网汽配采购服务，建立车E配独有的汽车服务生态系统，立志打造中国汽配行业互联网标杆"/>
<%@include file="../front/common/meta_desc.jsp" %>
<title><s:property value="#webname_head"/>—互联网汽配行业新标杆</title>
<!-- <link rel="stylesheet" href="css/swiper.min.css"> -->
<link rel="stylesheet" href="css/app_index.css?1124">
</head>

<body>
<%@include file="common/search_banner.jsp" %>

<div class="main">
	<%--<div class="search-btn"><span class="search-icon"></span>搜索车型/全车件/用品/车架号</div>--%>
	
	
	<!-- swipe -->
	<div class="swipe swiper-container" id="swiper">
		<ul class="swiper-wrapper">
			<s:iterator value="ImgIndex" status="s" var="o">
				<li class="swiper-slide"><div class="swiper-img"><img data-url="<s:property value="img"/>" src="images/blank.gif" onclick="href('<s:property value="url"/>')" alt="<s:property value="title"/>" title="<s:property value="title"/>"></div></li>
			</s:iterator>
		</ul>
		<ol class="index swiper-pagination swipe-dot"></ol>			
	</div>
		
	<div class="main-ad">
		<!-- <div class="h-d-title">
			<i class="line-l">&nbsp;</i>
			<div class="title-block">
				<span class="recommend-icon"></span>
				<h4>精品展示</h4>
			</div>
			<i class="line-r">&nbsp;</i>
		</div> -->
		<div class="ad-img">
			<s:if test="indexIndex.size()<=5">
				<div class="row">
					<s:iterator value="indexIndex" status="s" var="o">
						<div class="item"><img data-url="<s:property value="img"/>" src="images/blank.gif" onclick="href('<s:property value="url"/>')" alt="<s:property value="title"/>" title="<s:property value="title"/>"></div>
					</s:iterator>
				</div>
			</s:if>
			<s:else>
				<s:iterator value="indexIndex" status="s" var="o">
					<s:if test="#s.index==0||#s.index==5">
						<div class="row">
					</s:if>
					<div class="item"><img data-url="<s:property value="img"/>" src="images/blank.gif" onclick="href('<s:property value="url"/>')" alt="<s:property value="title"/>" title="<s:property value="title"/>"></div>
					<s:if test="#s.index==4||#s.last">
						</div>
					</s:if>
				</s:iterator>
			</s:else>
		</div>
	</div>
	<!-- main-ad -->
	
	<!-- 一级分类 -->
	<!-- <div class="main-first-type" id="firstType"></div> -->
	<!-- platform info -->
	<div class="plat-info fix hide">
		<span class="platform">
			<em></em>
			<ul></ul>
		</span>
		
		<!-- 平台订单信息 -->
		<div class="order-race"><ul></ul><a class="close"></a></div>
	</div>

	<!-- 优惠活动 S -->
	<div class="time-adv fix">
		<div class="time-adv-img">
			<img src="/images/wx/index_adv.jpg" alt="">
		</div>
		<div class="time-adv-count">
			<p>仅剩</p>
			<span><b>5</b>天 <b>12</b>:<b>12</b>:<b>9.99</b></span>
		</div>
	</div>
	<!-- 优惠活动 E -->

	<div class="main-recommend">
		<div class="h-d-title">
			<i class="line-l">&nbsp;</i>
			<div class="title-block">
				<span class="recommend-icon"></span>
				<h4>优品推荐</h4>
			</div>
			<i class="line-r">&nbsp;</i>
		</div>
	
		<div class="recommend-img">
			<s:if test="GoodNumber<=3">
				<div class="row">
					<s:iterator value="GoodIndex" status="s" var="o">
						<div class="item"><img data-url="<s:property value="img"/>" src="images/blank.gif" onclick="href('<s:property value="url"/>')" alt="<s:property value="title"/>" title="<s:property value="title"/>"></div>
					</s:iterator>
				</div>
			</s:if>
			<s:else>
				<s:iterator value="GoodIndex" status="s" var="o">
					<s:if test="#s.index==0||#s.index==3">
						<div class="row">
					</s:if>
					<div class="item"><img data-url="<s:property value="img"/>" src="images/blank.gif" onclick="href('<s:property value="url"/>')" alt="<s:property value="title"/>" title="<s:property value="title"/>"></div>
					<s:if test="#s.index==2||#s.last">
						</div>
					</s:if>
				</s:iterator>
			</s:else>
		</div>
	</div>
	<!-- main-recommend -->


	<div class="main-ilike">
		<div class="h-d-title">
			<i class="line-l">&nbsp;</i>
			<div class="title-block">
				<span class="ilike-icon"></span>
				<h4>我爱</h4>
			</div>
			<i class="line-r">&nbsp;</i>
		</div>

		<div class="ilike-img">
			<div class="row"> 
				<s:iterator value="LoveIndex" status="s" var="o">
					<div class="item" ><img data-url="<s:property value="img"/>" src="images/blank.gif" onclick="href('<s:property value="url"/>')" alt="<s:property value="title"/>" title="<s:property value="title"/>"></div>
				</s:iterator>
			</div>
		</div>
	</div>
	<!-- main-ilike -->

	<div class="main-brand">
		<div class="h-d-title">
			<i class="line-l">&nbsp;</i>
			<div class="title-block">
				<span class="ilike-icon"></span>
				<h4>品牌特卖</h4>
			</div>
			<i class="line-r">&nbsp;</i>
		</div>

		<div class="brand-img">
			<div class="row"> 
				<s:iterator value="productsIndex" status="s" var="o">
					<div class="item" ><img data-url="<s:property value="img"/>" src="images/blank.gif" onclick="href('<s:property value="url"/>')" alt="<s:property value="title"/>" title="<s:property value="title"/>"></div>
				</s:iterator>
			</div>
		</div>
	</div>
	<!-- main-brand -->
</div>
<!-- main end -->

<div class="search-page hide">
	<div class="home">
	    
	    <div class="head-search head-search-index">
			<div class="box-table">
		    	<span class="back"><a href="javascript:void(0)" class="goback"></a></span>
		    	<div class="s-p-title">搜索查询</div>
		    	<span class="right"></span>
		    </div>
	    </div>
	    
	    
	    <div class="home-double-search" id="searchForm">
	    	<div id="home-search-div">
		    	<form action="m/index!goodsList" method="get">
		    		<input type="hidden" name="id" id="id">
			        <div class="c-box">
			            <div class="box-table">	
			            	<%--<span class="wsn vm pr9"><i class="w5em">配件查询</i></span>
			                --%><strong>
			                	<span class="goodsname-icon"></span>
			                	<input type="text" id="queryGoodsName" name="queryGoodsName" value="<s:property value="queryGoodsName"/>" placeholder="请输入车型/用品/配件名搜索" class="goodsname-pdr">
			                	<label class="close" for="queryGoodsName"></label>
			                </strong>
			                <span><button>查 询</button></span>
			            </div>
			        </div>
			    </form>
			    
			    <div class="search-page-text">
			    	<div><span>热搜：</span><a href="m/index!goodsList?queryGoodsName=刹车皮" class="">刹车皮</a><a href="m/index!goodsList?queryGoodsName=壳牌机油" class="">壳牌机油</a></div>
			    	<div>
						<p>1.搜用品：例如搜索“壳牌黄喜力HX5汽机油”，
						在上方搜索框输入“HX5”“黄壳”“壳牌黄喜”均可。</p>
						<p>2.搜配件：例如搜索“花冠下摆臂球头”，在上方搜索框
						输入“花冠球头”“花冠下球头”、原厂编码均可。</p>
			    	</div>
			    </div>
		    </div>
		    
		    <form action="m/index!vininfoUI" id="vininfoform">
			    <div class="c-box mt7">
		            <div class="box-table">
		            	<%--<span class="wsn vm pr9">车架号查询</span>
		                --%><strong>
		                	<input type="text" name="queryGoodsName" placeholder="请输入17位的车架号" id="more-vin" maxlength="17" class="upper bold">
		                	<label class="close" for="queryGoodsName"></label>
		                </strong>
		                <span class="wsn vm vincount">0/17</span>
		                <span><button id="more-vin-btn">查 询</button></span><%-- return morevin() --%>
		            </div>
		        </div>
	        </form>
	        
	        <div class="search-page-text">
	        	<p>请输入17位车架号，输入无须区分大小写</p>
	        	<p>车架号位于：</p>
				<p>a、前挡风玻璃左下角</p>
				<p>b、主驾驶车门铰链柱、门锁柱、门边上</p>
				<p>c、发动机舱</p>
				<p>d、在保险保单、机动车行驶证上</p>
	        </div>
	        
	        <%--<div class="btn btn-red btn-block mt10" onclick="$('.bn-choose:eq(0)').click()">手动选车型</div>--%>
	    </div>
	    <%--<form id="searchForm" action="m/index!goodsList" method="get">
	        <div class="c-box home-search">
	            <div class="box-table">
	                <strong>
	                	<input type="text" id="queryGoodsName" name="queryGoodsName" value="<s:property value="queryGoodsName"/>" placeholder="请输入车型/用品/配件名搜索">
	                	<label class="close" for="queryGoodsName"></label>
	                </strong>
	                <span><button onclick="$('#searchForm').submit()">搜一下</button></span>
	            </div>
	        </div>
	    </form>--%>
		<%-- <s:if test="#session.login_user!=Null">
			<p class="ac mb20 red"><s:if test="#session.login_user.shopName!=null&&#session.login_user.shopName!=''"><s:property value="#session.login_user.shopName"/></s:if><s:else><s:property value="#session.login_user.username"/></s:else>，感谢您的再次到来</p>
		</s:if>
	    <s:else>
	    	<p class="ac mb20 red">车E配感谢您的再次到来，<a href="m/index!loginUI" class="blue tdu">马上登录</a></p>
	    </s:else> --%>
	    
	     
	     
	    <%--<div class="home-desc">
	    	<p>搜索说明：</p>
			<p>1.搜用品：例如搜索“壳牌黄喜力HX5汽机油_SN_10W-40”，
			在上方搜索框输入“HX5”“黄壳”“壳牌黄喜”均可。</p>
			<p>2.搜配件：例如搜索“花冠下摆臂球头”，在上方搜索框
			输入“花冠球头”“花冠下球头”、原厂编码均可。</p>
	    </div>--%>
	</div>
</div>
<s:if test="getCouponSize()>0">
  	<%-- <p class="ac mb20"><a href="m/index!sonCouponList" class="red">你有一张优惠券，请点击领取</a></p> --%>
  	<a href="m/index!sonCouponList" class="red getcoupon"></a>
</s:if>
<!-- search-page -->

<s:set name="navindex" value="0"/>
<%@include file="common/index_foot.jsp" %>
<script src="js/jquery.scrollLoading-min.js"></script>
<script src="js/wx/indexUI.js?1122_1"></script>
<script>
if( wxkit ){
	wxkit.share_update({
		url: location.href,
		title: '<s:property value="#webname_head"/>-首页'
	});
}
</script>
</body>
</html>