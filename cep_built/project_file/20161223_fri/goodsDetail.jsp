<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%@include file="../common/head_meta.jsp" %>
<title><s:property value="#webname"/></title>
</head>

<body class="bg-gray">
<a href="wx/index!carList" class="dcart"><i></i> 进入购物车</a>
<div class="gallary">
	<img src="<s:property value="goods.img"/>" alt="<s:property value="goods.name"/>">
	<!-- 促销信息 S -->
	<div class="sales_off">
		<ul class="df">
			<li class="sales_off_info">
				<a href="javascript:;">
					<h1 class="webpack"><span>&yen;</span>822</h1>
					<div class="flexdd">
						<h2>赶快下单</h2>
						<h3>&yen;&nbsp;999.00</h3>
					</div>
				</a>
			</li>
			<li class="sales_off_time">
				<div>
					<p>距结束仅剩</p>
				</div>
			</li>
		</ul>
	</div>
	<!-- 促销信息 E -->

    <a href="javascript:history.go(-1)" class="dback"><i></i> 后退</a>
    <!-- <a onclick="location.hash='#buy'" class="dcart"><i></i> 加入购物车</a> -->
</div>

<div class="gbox ginfo mb10">
    <div class="name bk mb10"><s:property value="goods.place"/>_<s:property value="goods.name"/></div>
    <div class="price mb10">
    <s:if test="#session.login_front_sonPlatform.isLoginShowPrice==1 && #session.login_user==null">
    	<span>价格需<a class="blue" href="m/login!loginUI">登录</a>后才可见</span>
    </s:if><s:else>
    	<%-- <s:if test="goods.promotion!=null&&goods.promotion.status==0&&goods.promotion.isEnd==0">
	    	<span>￥<s:property value="formatDouble(goods.lowPrice*goods.promotion.discount)"/>/<s:property value="goods.unit"/></span> <!--如果是有打折显示打折价格-->
	    </s:if><s:else>
	    	<span>￥<s:property value="formatDouble(goods.lowPrice)"/>/<s:property value="goods.unit"/></span>
	    </s:else>
	    <s:if test="goods.promotion!=null&&goods.promotion.status==0&&goods.promotion.isEnd==0">
	    	<del class="gray">￥<s:property value="formatDouble(goods.lowPrice)"/>/<s:property value="goods.unit"/></del>
	    </s:if> --%>
	    <span>￥<s:property value="getGoodsAcPrice(goods,true)"/>/<s:property value="goods.unit"/></span> <!-- 如果是有打折显示打折价格 -->
	   	 <s:if test="goods.promotionIds!=null">
	    	<del class="gray">￥<s:property value="getGoodsAcPrice(goods,false)"/>/<s:property value="goods.unit"/></del>
	    </s:if>
	 </s:else>
    </div>
    <s:if test="promotion!=null">
	    <div class="promotion">
	        <p class="gray">促销：</p>
	        <p class="bk">
	            <span class="pro-txt"><s:property value="promotion.name"/> <s:property value="promotion.detail"/></span>
	        </p>
	        <s:if test="promotion.type==1">
	            <form id="comboDetail" action="wx/index!addManyCar">
		        <ul class="combo-list">
		        	<s:iterator value="getPromotionGoods(promotion.id,0)" status="index">
		        		<input type="hidden" name="setGoodsId" value="<s:property value="goods.id"/>"/>
			            <li><img src="<s:property value="goods.img"/>" alt="<s:property value="goods.name"/>"></li>
			            <s:if test="#index.last!=true">
			            	<li class="ac s">＋</li>
			            </s:if>
		        	</s:iterator>
		            <li class="rred ac s">送</li>
		             <s:iterator value="getPromotionGoods(promotion.id,1)" status="index">
		            	<li><img src="<s:property value="goods.img"/>" alt="<s:property value="goods.name"/>"></li>
		            </s:iterator>
		        </ul>
		        <p><a class="btn btn-red btn-block btn-buy" onclick="goodsCombo()">立即购买</a></p>
		        </form>
	        </s:if>
	    </div>
    </s:if>
</div>

<div class="gbox gpara mb10">
    <p class="name on">商品参数 <span class="fr"></span></p>
    <ul>
        <li><span class="gray">商品货号：</span><s:property value="goods.no"/></li>
        <%--<li><span class="gray">分 类 名：</span><s:property value="goods.type3"/></li>--%>
        <%--<li><s:if test="goods.type==0"><span class="gray">原厂编码：</span><s:property value="goods.oriNo"/></s:if><s:else><span class="gray">规格：</span><s:property value="goods.spec"/></s:else></li>--%>
        <li><span class="gray">品牌编码：</span><s:property value="goods.brandNo"/></li>
        <li><span class="gray">规格：</span><s:property value="goods.spec"/></li>
        <li><span class="gray">品 牌 名：</span><s:property value="goods.goodsBrand"/></li>
        <%--<li><span class="gray">品牌分类：</span><s:property value="goods.brandType"/></li>--%>
        <s:if test="more1Name!=Null&&more1Name!=''">
        <li><span class="gray"><s:property value="more1Name"/>：</span><s:property value="queryMore1"/></li>
        </s:if>
        <s:if test="more2Name!=Null&&more2Name!=''">
        <li><span class="gray"><s:property value="more2Name"/>：</span><s:property value="queryMore2"/></li>
        </s:if>
        <s:if test="more3Name!=Null&&more3Name!=''">
        <li><span class="gray"><s:property value="more3Name"/>：</span><s:property value="queryMore3"/></li>
        </s:if>
    </ul>
</div>

<!-- 成交记录 S -->
<div class="gbox grecord mb10">
	<p class="name on">成交记录</p>
	<div class="grecord_table fix">
		<ul class="grecord_head fix">
			<li>修理厂</li>
			<li>订购数量</li>
			<li>价格</li>
			<li>成交时间</li>
		</ul>
		<div class="grecord_div">
			<ul class="grecord_list fix">
				<li class="fix">
					<div class="grecord_name">任浦</div>
					<div>10</div>
					<div>828</div>
					<div>2016-12-20 12:30:37</div>
				</li>
				<li class="fix">
					<div class="grecord_name">为2浦</div>
					<div>20</div>
					<div>828</div>
					<div>2016-12-20 12:30:37</div>
				</li>
				<li class="fix">
					<div class="grecord_name">国3浦</div>
					<div>30</div>
					<div>828</div>
					<div>2016-12-20 12:30:37</div>
				</li>
				<li class="fix">
					<div class="grecord_name">他4浦</div>
					<div>40</div>
					<div>828</div>
					<div>2016-12-20 12:30:37</div>
				</li>
				<li class="fix">
					<div class="grecord_name">dfasfa5浦</div>
					<div>50</div>
					<div>828</div>
					<div>2016-12-20 12:30:37</div>
				</li>
			</ul>
		</div>
	</div>
</div>
<!-- 成交记录 E -->

<s:if test="goods.shop!=Null&&#session.login_front_sonPlatform.isShowShop==1">
<div class="gbox gshop mb10">
    <div class="mb15">
        <img src="images/front/demo/shop-icon.png" alt="" class="slogo">
        <p class="name">
            <s:property value="goods.shop.shopName"/>
            <s:if test="goods.shop.linkUrl!=null">
           	 	<a href="<s:property value="goods.shop.shopUrl"/>" class="i-contact ml20" title="联系我">联系我</a>
            </s:if><s:else>
            	<a href="wx/cs!index?shopId=<s:property value="goods.shop.id"/>" class="i-contact ml20" title="联系我">联系我</a>
            </s:else>
            <s:if test="goods.shop.linkTel!=null">
            <a onclick="showTelList('<s:property value="goods.shop.linkTel"/>')" class="i-telcont ml20" title="电话联系">电话联系</a>
            </s:if>
        </p>
       <!--  <p class="intro gray ell"><s:property value="goods.shop.companyAbout" escape="false"/></p> -->
    </div>
    <div class="ac">
        <a href="m/shopIndex!goodsList?id=<s:property value="goods.shop.id"/>" class="btn">全部商品</a>
        <%--<a href="m/shopIndex!makeGoodsTypeData?id=<s:property value="goods.shop.id"/>" class="btn">查看分类</a>--%>
        <a href="m/shopIndex!shopIntro?id=<s:property value="goods.shop.id"/>" class="btn">进店逛逛</a>
    </div>
</div>
</s:if>

<div class="gbox gview" style="margin-bottom:56px">
    <div class="c-box mb10">
        <div class="box-selects select-2" id="detail-selects">
            <a class="cur"><i class="i-detail"></i>商品详情</a>
            <a><i class="i-type"></i>适用车型</a>
        </div>
    </div>

    <div class="view">
        <div class="article">
            <s:property value="goods.detail" escape="false"/>
        </div>
    </div>
    <div class="view hide">
        <%--<ul class="typelist">
        <s:iterator value="queryGoodsCarList(goods.id)">
			<li><s:property value="car.carName"/></li>		            	
		</s:iterator>
        </ul>
        --%><div class="article"><s:property value="goods.goodsCarName" escape="false"/></div>
    </div>
</div>
<s:set name="isShowPrice" value="#session.login_front_sonPlatform.isLoginShowPrice"/>
<div id="buy" class="f-block buy-block" data-func="showBuy" data-type="0">
    <div class="frame">
        
        <div class="info">
            <div class="img">
                <img src="<s:property value="goods.img"/>" alt="">
            </div>
            <p class="gray">最低价：</p>
            <p class="rred">
            
            <s:if test="#isShowPrice==1 && #session.login_user==null">
            	<span>价格需<a class="blue" href="m/login!loginUI">登录</a>后才可见</span>
            </s:if><s:else>
       		 	￥<s:property value="getGoodsAcPrice(goods,true)"/>/<s:property value="goods.unit"/> <!-- 如果是有打折显示打折价格 -->
          	</s:else>
          	<s:set name="maxCount" value="goods.thingCount>0?goods.thingCount:999"/>
            <p>库存：<s:property value="#maxCount"/><s:property value="goods.unit"/></p>
            <a href="javascript:history.go(-1)" class="close"></a>
        </div>
<%-- 
        <div class="style">
            <p class="mb10">样式分类</p>
            <ul>
                <li class="checked">样式1</li>
                <li>样式1</li>
                <li>样式1</li>
                <li>样式1</li>
            </ul>
        </div>
 --%>
 <%-- 价格区间
        <ul class="prices prices-3">
            <s:set name="arrprice" value="''"/>
            <s:set name="maxcount" value="0"/>
            <s:iterator value="priceList(goods.id)" status="pst" var="price">
            <s:set name="arrprice" value='#arrprice+#price.price+","+#price.minCount+","+#price.maxCount'/>
            
            <s:if test="!#pst.last"><s:set name="arrprice" value='#arrprice+"|"'/></s:if>
            <s:else><s:set name="maxcount" value="#price.maxCount*10"/></s:else>
            <li class="p-<s:property value="#pst.index+1"/>">
                <p class="wsn counts"><s:if test="#pst.index==0"><span class="label">购买量</span></s:if><s:property value="#price.minCount"/>-<s:property value="#price.maxCount"/><s:property value="goods.unit"/></p>
                <p class="wsn"><s:if test="#pst.index==0"><span class="label">价格</span></s:if><span class="price"><s:if test="#isShowPrice==1 && #session.login_user==null">价格需<a class="blue" href="m/login!loginUI">登录</a>后才可见</s:if><s:else>￥<s:property value="formatDouble(#price.price)"/></s:else></span></p>
            </li>
            </s:iterator>
        </ul>
         --%>
        

        <form action="wx/index!addCar" class="handle" id="goodsDetail">
            <input type="hidden" name="carGoodsId" value="<s:property value="goods.id"/>">
            <div class="c-box">
                <div class="box-table">
                    <strong>
                        <p>购买数量：</p>
                        <p>价格：</p>
                    </strong>
                    <span class="ar">
                        <p>
                            <i>-</i>
                            <input name="carCount" id="buyInput" type="tel" value="1" data-max="<s:property value="#maxCount"/>" data-arr="<s:property value="#arrprice"/>" data-promotion="1" data-lowprice="<s:property value="getGoodsAcPrice(goods,true)"/>">
                            <i>+</i>
                        </p>
                        
                        <s:if test="#isShowPrice==1 && #session.login_user==null"></s:if><s:else>
                        <p class="ac rred wsn">￥<span id="buyTotal"><s:property value="getGoodsAcPrice(goods,true)"/></span>/<s:property value="goods.unit"/>
                        <%-- <s:if test="promotion!=null&&promotion.workStatus==2"> x <s:property value="formatDouble(promotion.discount*100)"/>% = ￥<span id="buyTotal-pro"><s:property value="formatDouble(goods.lowPrice*promotion.discount)"/></span></s:if> --%>
                        </p>
                        </s:else>
                    </span>
                </div>

            </div>
        </form>

        <a onclick="goodsSubmit()" class="btn btn-buy">确定</a>
    </div>
</div>

<a href="javascript:void(0)" onclick="$('body').scrollTop(0)" class="return-top"></a>
<div class="bottom-handle">
<s:if test="#session.login_user==Null">
	<a class="btn buynow" style="width:100%;" onclick="loginWithUrl('/m/index!loginUI')">立即登录</a>
</s:if>
<s:else>
	<s:if test="goods.thingCount<=0">
		<a class="btn buydisabled">抢光了...</a>
	</s:if>
	<s:elseif test="goods.lowPrice>0">
	    <a class="btn buynow" onclick="location.hash='#buy?0'"><i class="i-wallet"></i> 立即购买</a>
	    <a class="btn addcart" onclick="location.hash='#buy?1'"><i class="i-cart"></i> 加入购物车</a>
	</s:elseif>
</s:else>


</div>
<%@ include file="../common/js_foot.jsp" %>
<script src="js/wx/myhash.js"></script>
<script src="js/wx/goods.js?1121_1"></script>
</body>
</html>