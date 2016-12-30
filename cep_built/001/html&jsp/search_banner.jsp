<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<script>
<s:set name="fourName" value="''"/><s:set name="searchName" value="''"/>
<s:if test="#session.wx_one_name!=Null">   var wx_one_name    = '<s:property value="#session.wx_one_name"/>';</s:if>
<s:if test="#session.wx_two_name!=Null">   var wx_two_name    = '<s:property value="#session.wx_two_name"/>';</s:if>
<s:if test="#session.wx_three_name!=Null"> var wx_three_name  = '<s:property value="#session.wx_three_name"/>';</s:if>

<s:if test="#session.wx_four_name!=Null">  var wx_four_name   = '<s:property value="#session.wx_four_name"/>';
<s:set name="fourName" value="#session.wx_four_name"/>
<s:if test="#fourName.length>4"><s:set name="fourName" value="#fourName.substring(0,4)"/></s:if>
</s:if>
<s:if test="#session.wx_search_name!=Null">var wx_search_name = '<s:property value="#session.wx_search_name"/>';<s:set name="searchName" value="#session.wx_search_name"/></s:if>
</script>

<div class="head-search">
    <form class="c-box" id="searchForm" action="m/index!goodsList" method="get" data-query="<s:property value="queryGoodsName"/>">
    	<input type="hidden" name="queryBrand" value="<s:property value="queryBrand"/>"/>
        <%--<input type="hidden" name="typeName" value="<s:property value="typeName"/>"/>
        <input type="hidden" name="typeLevel" value="<s:property value="typeLevel"/>"/>
        <input type="hidden" name="queryType1.typeName" value="<s:property value="queryType1.typeName"/>"/>
        <input type="hidden" name=queryType2.typeName value="<s:property value="queryType2.typeName"/>"/>
        <input type="hidden" name="queryType3.typeName" value="<s:property value="queryType3.typeName"/>"/>
        <input type="hidden" name="queryType4.typeName" value="<s:property value="queryType4.typeName"/>"/>--%>
        <div class="box-table">
        	<a href="/m/index!goodsList?filter=1" class="bn-choose vm wsn wh pr9 pl9">
        	<s:if test="#fourName==''&&#searchName==''"><img src="/images/wx/index_xcx.png" alt=""></s:if><s:elseif test='#searchName.indexOf("通用")>-1'>通用车型</s:elseif><s:else><s:property value="#fourName"/></s:else>
        	</a>
            <strong>
                <div class="box-table left">
                    <%--<span class="vm rel">
                        <select name="index_showType" id="pytype" class="pytype" onchange="if($('#searchForm input').val())$('#searchForm').submit()">
                            <option value="<s:property value="#frontType"/>"><s:property value="#frontTypeText"/></option>
                            <option value="<s:property value="#frontTypeOpp"/>"><s:property value="#frontTypeOppText"/></option>
                        </select>
                        <i class="cor corwh"></i>
                    </span>
                    --%>
                    
                    <strong>
                        <input type="text" id="queryGoodsName" name="queryGoodsName" value="<s:property value="queryGoodsName"/>" placeholder="请输入用品/配件名搜索" autocomplete="off">
                        <label class="close" for="queryGoodsName"></label>
                    </strong>
                    <span>
                        <button>搜索</button>
                    </span>
                </div>
                
                <div class="searchword-expend">
                	<span class="bclose"></span>
                </div>
            </strong>
            <a href="/m/index!index?vin=1" class="wh wsn vm pr9 pl9"><img src="/images/wx/index_cjh.png" alt=""></a>
            <%--<span><a class="msg">消息 <i>3</i></a></span>--%>
        </div>
    </form>
</div>