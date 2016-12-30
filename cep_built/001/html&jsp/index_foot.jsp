<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<script src="js/wx/util/swipe-1.0.js"></script>
<%-- 通用底部 --%>
<%-- 高亮: 1-首页,2-分类,3-购物车,4-品牌馆,5-店铺汇,6-我的 --%>
<nav class="bottom-nav <s:if test="#fromVininfo==1">hide</s:if>">
    <div>
        <a href="m/index!index" <s:if test="#navindex==0">class="cur"</s:if>><p>首页</p></a>

    	<a href="wx/qp!getListUI" <s:if test="#navindex==1">class="cur"</s:if>><p>询价单</p></a>
        
    	<a class="bn-choose" href="wx/qp!getQrAddUI"><p>买汽配</p></a>
        
        <s:if test="#session.login_user!=Null">
        	<a href="wx/index!userCenter" <s:if test="#navindex==2">class="cur"</s:if>><p>我的</p></a>
        </s:if>
        <s:else>
        	<a href="wx/index!userCenter" class="usercenter-login <s:if test="#navindex==2">cur</s:if>"><span class="loginoff"></span><p>登录</p></a>
        </s:else>
        <%--<label for="mored"><p>更多</p></label>--%>
        <a href="m/index!shopList" <s:if test="#navindex==4">class="cur"</s:if>><p>店铺汇</p></a>
    </div>
    <%--<input type="checkbox" class="hide" id="mored"> <s:if test="#navindex>2">checked</s:if> 
    <div class="more">
        <a href="m/index!brandList" <s:if test="#navindex==3">class="cur"</s:if>><p>品牌馆</p></a>
        <a href="m/index!shopList" <s:if test="#navindex==4">class="cur"</s:if>><p>店铺汇</p></a>
        <a class="bn-choose" href="wx/qp!getQrAddUI"><p>买配件</p></a>
        <a href="wx/index!carList" <s:if test="#navindex==5">class="cur"</s:if>><p>购物车</p></a>
        <label for="mored"><p>返回</p></label>
    </div>--%>
</nav>
<script>
var g_islogined = '<s:property value="#session.login_user!=Null"/>',
	g_son_platform_id = '<s:property value="#session.login_front_sonPlatform.id"/>',
	g_front_type = '<s:property value="#frontType"/>'||'0';<%--0配件  1 用品--%>
</script>
<%@ include file="js_foot.jsp" %>
<script src="js/wx/app.js?1121_3"></script>
<%@ include file="/commonPage/cs.jsp" %><%CS cs = new CS(1260666222);cs.setHttpServlet(request,response);String imgurl = cs.trackPageView();%> <img src="<%= imgurl %>" width="0" height="0"  />
<%--<script>var _hmt = _hmt || [];(function(){var hm = document.createElement("script");hm.src="https://hm.baidu.com/hm.js?84af05a23689e2ee3dab9538ed44cd84";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();</script>--%>
<style>.contact-public{position:fixed;left:0px;width:30px;padding:0;border-radius:1px;bottom:70px;text-align:center;z-index:2;}.contact-public li{text-align:center;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;}.contact-public a{padding:6px;}.contact-public .icon-tel{display:block;margin:0px auto 0 auto;width:34px;height:91px;}</style>
<!-- <ul style="display: ;" class="contact-public"><li><a target="_blank" href="http://cs.ecqun.com/mobile/rand?id=1272124"><img src="http://ep58.cn/mobile/themes/default/images/z2.jpg"/></a></li></ul> -->
<a href="http://www.miitbeian.gov.cn" target="_blank" class="hide">ICP备案号：粤ICP备14099988号-2</a>