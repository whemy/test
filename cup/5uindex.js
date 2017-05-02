function openWind() {
	window.open("http://ditu.baidu.com/", "newwindow", "height=800, width=900, top=10,  scrollbars=yes, resizable=yes,location=no, status=no")
}! function(e, a, t) {
	a.fn.createTab = function(e) {
		var t = {
			activeEvt: "mouseover",
			activeCls: "on"
		};
		a.extend(t, e);
		var s = a(this).children(),
			i = a(this).next().children();
		a(i[0]).show(), s.each(function(e, l) {
			a(l).click(function() {
				return i.hide(), a(i[e]).show(), s.removeClass(t.activeCls), a(this).addClass(t.activeCls), !1
			})
		})
	}
}(window, jQuery), $(function() {
	var e = {},
	
		a = '<div class="loadings"><img src="' + home_url + '/static/images/waiting.gif"><p>请稍候再试</p></div>',
		t = '<div class="loadings"><p>暂无内容</p></div>',
		s = '<div class="loadings"><p>暂无新闻</p></div>',
		i = '<div class="no_404" id="noId_404"><div class="no_img"><img src="/static/images/home/404.jpg"></div><p class="noh3">很抱歉！你访问的内容不存在！</p><p class="notit">你可以<a href="' + home_url + '">返回首页</a>查看其他精彩内容</p></div>';
	if (e.feedlist = function(e, a) {
			var t = "";
			t += '<ul class="newsUlbd">';
			for (var s = 0; s < e.data.length; s++) {
				var i = e.data[s];
				t += '<li><a href="' + home_url + "/news/show?id=" + i.id + '" target="_blank">', t += '<p class="newsimg"><img src="' + i.cover + '?imageView2/1/w/320/h/180"></p>', t += '<div class="newsDiv">', t += '<div class="title cl"><p>' + i.title + '</p><span class="textTime">' + i.created_at + "</span></div>", t += '<p class="text">' + i.description + "</p>", t += '<span class="more">详细</span>', t += "</div>", t += "</a></li>"
			}
			t += "</ul>", a.html(t)
		}, e.relations = function(e) {
			var a = "";
			a += '<ul class="cl">';
			for (var t = 0; t < e.data.length; t++) {
				var s = e.data[t];
				a += "<li>", a += '<a class="newsimg" href="' + home_url + "/news/show?id=" + s.id + '" target="_blank"><img src="' + s.cover + '"></a>', a += '<div class="newsDiv">', a += '<p class="title">' + s.title + '<span class="textTime">' + s.created_at + "</span></p>", a += '<p class="text">' + s.description + "</p>", a += '<a href="' + home_url + "/news/show?id=" + s.id + '" class="more" target="_blank">详细</a>', a += "</div>", a += "</li>"
			}
			a += "</ul>", $("#detNewListId").html(a)
		}, e.feedsport = function(e) {
			var a = "";
			a += '<ul class="cl">';
			for (var t = 0; t < e.data.length; t++) {
				var s = e.data[t];
				a += '<li><a href="' + home_url + "/news/show?id=" + s.id + '" target="_blank">', a += '<img src="' + s.cover + '?imageView2/1/w/256/h/145" width="256" height="145">', a += '<span class="title">' + s.title + "</span>", a += '<span class="text">' + s.description + "</span>", a += "</a></li>"
			}
			a += "</ul>", $("#sportsUlListId").html(a)
		}, e.feedobserve = function(e) {
			var a = "";
			a += '<ul class="newsUlbd">';
			for (var t = 0; t < e.data.length; t++) {
				var s = e.data[t];
				a += '<li><a href="' + home_url + "/news/show?id=" + s.id + '" target="_blank">', a += '<p class="newsimg"><img src="' + s.cover + '?imageView2/1/w/240/h/135" width="240" height="135"></p>', a += '<div class="newsDiv">', a += '<div class="title cl"><p>' + s.title + '</p><span class="textTime">' + s.created_at + "</span></div>", a += '<p class="text">' + s.description + "</p>", a += "</div>", a += "</a></li>"
			}
			a += "</ul>", $("#sprtObserveListId").html(a)
		}, e.getstarfeeds = function(e) {
			for (var a = '<ul class="newsUlbd">', t = 0; t < e.data.length; t++) {
				var s = e.data[t];
				a += '<li><a href="' + home_url + "/news/show?id=" + s.id + '" target="_blank">', a += '<p class="newsimg"><img src="' + s.cover + '?imageView2/1/w/240/h/135" width="240" height="135"></p>', a += '<div class="newsDiv">', a += '<p class="title">' + s.title + '<span class="textTime">' + s.created_at + "</span></p>", a += '<p class="text">' + s.description + "</p>", a += "</div>", a += "</a></li>"
			}
			a += "</ul>", $("#actEvtFilter").html(a)
		}, e.getstarmanagers = function(e) {
			for (var a = '<ul class="cl">', t = 0; t < e.data.length; t++) a += '<li><a href="' + home_url + "/resource/show?id=" + e.data[t].id + '" target="_blank">', a += '<div class="title">' + e.data[t].title + "</div>", a += '<div class="PlayerImg"><img src="' + e.data[t].cover + '?imageView2/1/w/326/h/180" width="326" height="180"></div>', a += '<div class="text">' + e.data[t].description + "</div>", a += '<span class="more">详细</span>', a += "</a></li>";
			a += "</ul>", $("#Playerstar").html(a)
		}, e.getcasefeeds = function(e) {
			for (var a = '<ul class="cl">', t = 0; t < e.data.length; t++) a += '<li><a href="' + home_url + "/news/show?id=" + e.data[t].id + '" target="_blank">', a += '<img class="caseImg" src="' + e.data[t].cover + '?imageView2/1/w/256/h/145" />', a += '<p class="title">' + e.data[t].title + "</p>", a += "</a></li>";
			a += "</ul>", $("#caseListBoxId").html(a)
		}, e.article = function(e, a) {
			var t = "";
			t += '<div class="det_tite"><h3>' + e.data.title + "</h3><p>" + e.data.created_at + "</p></div>", t += '<div class="detMation">' + e.data.content + "</div>", a.html(t)
		}, $(".Headermenu li").on("mouseenter", function() {
			$(this).addClass("hoverover")
		}).on("mouseleave", function() {
			$(this).removeClass("hoverover")
		}), $(".starsProduct li").hover(function() {
			$(this).addClass("hover")
		}, function() {
			$(this).removeClass("hover")
		}), $("#ColleProductUl li").hover(function() {
			$(this).addClass("hover")
		}, function() {
			$(this).removeClass("hover")
		}), $("#sprtExcell .IpExceOne li").hover(function() {
			$(this).addClass("hover")
		}, function() {
			$(this).removeClass("hover")
		}), $(".con-cares li").hover(function() {
			$(this).addClass("hover")
		}, function() {
			$(this).removeClass("hover")
		}), $("#sprtExcell .tabs").createTab(), $("#sprtcampus .tabs").createTab(), $("#sprtPartner .tabs").createTab(), $("#indexId_news").length) {
		var l = $("#indexId_news");
		$.ajax({
			type: "GET",
			url: api_url + "/misc/feedlists",
			data: {
				hot: 1
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				200 == a.code && (0 == a.data.length ? $("#indexId_news").html(s) : e.feedlist(a, l))
			},
			error: function() {
				$("#indexId_news").html(a)
			}
		})
	}
	if ($("#detailContId").length) {
		var r = $("#detailContId");
		$.ajax({
			type: "GET",
			url: api_url + "/misc/feed",
			data: {
				id: ids
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				200 == a.code ? null == a.data ? $("body").html(i) : e.article(a, r) : $("#detailContId").html(t)
			},
			error: function() {
				$("#detailContId").html(a)
			}
		})
	}
	if ($("#detailAgentId").length) {
		var n = $("#detailAgentId");
		$.ajax({
			type: "GET",
			url: api_url + "/misc/manager",
			data: {
				id: ids
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				200 == a.code ? null == a.data ? $("body").html(i) : e.article(a, n) : $("#detailAgentId").html(t)
			},
			error: function() {
				$("#detailAgentId").html(a)
			}
		})
	}
	if ($("#detNewListId").length) {
		$("#detNewListId");
		$.ajax({
			type: "GET",
			url: api_url + "/misc/relation",
			data: {
				id: ids
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				200 == a.code && e.relations(a)
			},
			error: function() {
				cosole.log("请稍后再试")
			}
		})
	}
	if ($("#newsId_area").length) {
		var c = $("#newsId_area");
		$.ajax({
			type: "GET",
			url: api_url + "/misc/feedlists",
			data: {
				category: "office",
				page: 1,
				pagesize: 5
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				e.feedlist(a, c)
			},
			error: function() {
				$("#newsId_area").html(a)
			}
		})
	}
	if ($("#sportsUlListId").length && $.ajax({
			type: "GET",
			url: api_url + "/misc/feedlists",
			data: {
				category: "sport",
				page: 1,
				pagesize: 4
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				e.feedsport(a)
			},
			error: function() {
				$("#sportsUlListId").html(a)
			}
		}), $("#sprtObserveListId").length && $.ajax({
			type: "GET",
			url: api_url + "/misc/feedlists",
			data: {
				category: "trade",
				page: 1,
				pagesize: 5
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				200 == a.code && (0 == a.data.length ? $("#sprtObserveListId").html(s) : e.feedobserve(a))
			},
			error: function() {
				$("#sprtObserveListId").html(a)
			}
		}), $("#actEvtFilter").length) {
		var d = $("#actEvtFilter").data("name");
		console.log(d), $.ajax({
			type: "GET",
			url: api_url + "/misc/getstarfeeds",
			data: {
				tag: d,
				num: 5
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				200 == a.code && (0 == a.data.length ? $("#actEvtFilter").html(t) : e.getstarfeeds(a))
			},
			error: function() {
				$("#actEvtFilter").html(a)
			}
		})
	}
	if ($("#Playerstar").length && $.ajax({
			type: "GET",
			url: api_url + "/misc/getstarmanagers",
			data: {
				page: 1,
				pagesize: 3
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				200 == a.code && (0 == a.data.length ? $("#Playerstar").html(t) : e.getstarmanagers(a))
			},
			error: function() {
				$("#Playerstar").html(a)
			}
		}), $("#caseListBoxId").length) {
		var o = $("#caseListBoxId").data("name");
		$.ajax({
			type: "GET",
			url: api_url + "/misc/getcasefeeds",
			data: {
				"case": o,
				num: 10
			},
			dataType: "json",
			cache: !1,
			success: function(a) {
				200 == a.code && (0 == a.data.length ? $("#caseListBoxId").html(t) : e.getcasefeeds(a))
			},
			error: function() {
				$("#caseListBoxId").html(a)
			}
		})
	}
});