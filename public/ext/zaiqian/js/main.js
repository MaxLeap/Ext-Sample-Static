var AppId = "";
var domain = "https://apiuat.leapcloud.cn";
// var domain = "https://wonapi.maxleap.cn";
// var domain = "";

var url_api = "https://www.maxwon.cn/";
var isNative =true;
function getQueryString(name) {
	console.log("getQueryString window.location:", window.location);
	name = name.toLowerCase();
	var search = window.location.search.toLowerCase();
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i');
	var result = search.substr(1).match(reg);
	console.log("====> getQueryString name:", name, "result:", result);
	if (result != null) {
		return unescape(result[2])
	}
	return null
}

AppId = getQueryString("maxleap_appid");
if(!AppId || AppId == ""){
	var message = "Error: AppId is invalid!";
	if(AppId){
		message += "AppId:"+AppId;
	}
	alert(message)
	throw new Error(message)
}

$(document).ready(function() {
	var platform = getQueryString("platform");
	isNative = platform == "ios" || platform == "android";
	if (isNative) {
		url_api = "https://www.maxwon.cn/"
	} else {
		url_api = "/maxh5/";
	}
	winw = $(window).width();
	document.getElementById("header").getElementsByTagName("td")[0].width = "40";
	document.getElementById("header").getElementsByTagName("td")[0].align = "right";
	document.getElementById("header").getElementsByTagName("td")[1].width = "";
	document.getElementById("header").getElementsByTagName("td")[1].align = "center";
	document.getElementById("header").getElementsByTagName("td")[2].align = "left";
	document.getElementById("header").getElementsByTagName("td")[0].innerHTML = "<a href='" + url_api + "product/search'><img height='30' width='30' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsSAAALEgHS3X78AAABTUlEQVRYw+2Y0W2DMBCGP6K8xxu0IzACI3SDMArdIBNUZIOMwAjpY9/oBu5jn64vh2QhVY3POKTIJ1kC5LN/f4a7w5WI8Mi248GtCCwCi8D/LnCf6O+ABqhnz6/AAPhkhSJiaU5EOhHx8rt57eOMcyAiVIZMUgMX4An4AvoZrYlqCxyAT+BFqWYnWAfU+j/oOO0z0awtBGO3ddQJ2wi/Vn1Gy3bHdO4CcrEkJpJdrnfQAaNePxu+TrP/rXGw0Re+N4YOr74HHWvxQD3FuSEhog2zsRYV6AISVvObTHW7yNW7xLSYTeA1+Fis1szGusk2E2Y8cNIwcTLQC33jFrelVJdSLHyLyIdF4L3KrTfgFXiPDdT3LFh7S7FRJR59xJb8PXAEzko4G8GUFkVyv0L2msgdZ/dZ/uqyi1xLYCjKLZHqyslCEVgEFoFF4Er2AwIFMj+cPNaZAAAAAElFTkSuQmCC'></a>";
	document.getElementById("header").getElementsByTagName("td")[1].innerHTML = "<span style='font-size:14px;color:#fff'>在千商城</span>";
	document.getElementById("header").getElementsByTagName("td")[2].innerHTML = "<a href='" + url_api + "pcart'><img height='30' width='30' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsSAAALEgHS3X78AAABZ0lEQVRYw+1YwW2EMBAcovyhBDo4dxBKoIM4HVwJV8KVQDpIOrjrgHRACXSweWQtIRSdd/FaoJNXskAImWE84x2oiAhHrhccvArAArAAjNTrP9euANzqWndUBhsAbwDa3Sgkokejo7/qI/dlGzEGb3x0exFYCVrdCGDmYy6gHsC01cU5gTke01YNgojOrMPWWF8NzzukaDAwmEOHYev6St2ocxmlX82f1El+MmzWPYBvNmAyQGujOAB1jD0twNqwo3iJ/rQALXXYsWwmK4CWRmkBnCTLq41bVkYJ7h2sWh0WE/accLZWw8s6S/WsYTDVKC0va70wyabAKjHKxA/0CnDvfP4h1Z+0Fy8HEdF1lRUlNXPPddqeXSn/LNyYwW7B6O55cN0Bgo7uRhjOj15W+1UXWt7nkRJ1jFHPLEjb26B6QmLgnNkEF2HoJa1RUlOxJ6KRwcZeZoylZwsXl18fBWABWAA+G8BfdDKxo5QJVD4AAAAASUVORK5CYII='></a>";
	var s_t = "<div id='scrollerPullDown' style='background-color:#fff; display:none'>松开后刷新</div>";
	var s_banner = "<div id='wrapper_b'><div><table border='0' cellpadding='0' cellspacing='0' style='line-height:0'><tr></tr></table></div></div><div id='indicator'><div id='dotty'></div></div>";
	// var s_service = "<table cellspacing='0' cellpadding='0' width='100%' height='40' style='line-height:0'><tr><td id='tdService' align='center' style='font-size: 12px; border-bottom: 6px solid #f7f7f7'></td></tr></table>";
	var s_class = "<table class ='responsive-table' width='100%' height='80px' border='0' cellspacing='0' cellpadding='0' align='left' style='padding-top:20px; margin: 0px 0px 0px 0px; background-color:#fff'><tbody><tr><td id='smlBtn' style='padding-bottom:0px; padding-left:10px; padding-right:10px'></td></tr></tbody></table>";
	var s_information = "<table width=100% height='50' border='0' cellspacing='0' cellpadding='0'><tr><td bgcolor='#f7f7f7' align='center'><table width=95% height='32' border='0' cellspacing='0' cellpadding='0' style='padding-top:8;border-radius:20px;background-color:#fff;font-size:13px;color:#000'><tr><td><table width=100% height='32' border='0' cellspacing='0' cellpadding='0'><tr><td width='45px' style='padding-left:5px'><a href='" + url_api + "article_m1'><img width='30px' height='30px' style='padding-left:10px;padding-top:3px' src='data:image/png;base64,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'></a></td><td style='padding-right:10px'><div id='divInformation'><div></div></div></td></tr></table></td></tr></table></td></tr></table>";
	var s_hb = "<table width=100% border='0' cellspacing='0' cellpadding='0'><tr><td id='banner_center' align='center' style='padding-bottom:8px'></td></tr></table>";
	var s_prd = "<table id='listPrd' width='100%' border='0' cellspacing='0' cellpadding='0' style='padding-bottom:2px'><tbody><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr><tr><td align='center' class='1'></td></tr></tbody></table>";
	var s_rmPrd = "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td id='listCont' style='padding-bottom:6px'></td></tr></tbody></table>";
	var s_b = "<div id='scrollerPullUp' style='background-color:#fff; display:none'></div>";
	document.getElementById("scroller").innerHTML = s_t + s_banner  + s_class + s_information + s_hb + s_prd + s_rmPrd + s_b;
	var pullDownFlag, pullUpFlag;
	var bStartPos = false;
	var pullDown = document.getElementById('scrollerPullDown');
	var pullUp = document.getElementById('scrollerPullUp');
	var myScrollHome = new IScroll('#wrapper', {
		momentum: true,
		bounceTime: 300,
		deceleration: 0.0008,
		probeType: 2,
		scrollbars: true,
		click: true,
		shrinkScrollbars: 'clip',
		fadeScrollbars: true
	});
	myScrollHome.on('scroll', updatePosition);
	myScrollHome.on('scrollEnd', endPosition);
	myScrollHome.on('scrollStart', startPosition);

	function startPosition() {
		bStartPos = true
	}
	function updatePosition() {
		if ((this.y >> 0) > 80) {
			pullDown.style.display = "";
			pullDownFlag = 1
		}
		if ((this.y >> 0) < (this.maxScrollY - 60)) {
			pullUpFlag = 1
		}
		if (this.y < -800) {
			$("#gotop").show()
		}
		if (this.y > -800) {
			$("#gotop").hide()
		}
		if (this.y > 0 && (this.pointY > window.innerHeight - 1) && bStartPos) {
			bStartPos = false;
			this.scrollTo(0, 0, 300)
		}
	}
	function endPosition() {
		if (pullDownFlag == 1) {
			pullDownFlag = 0;
			pullDown.style.display = "none";
			toContent(myScrollHome)
		}
		if (pullUpFlag == 1) {
			pullUpFlag = 0
		}
	}
	$("#gotop").click(function() {
		myScrollHome.scrollTo(0, 0, 400)
	});
	$("#wrapper_b").css({
		"width": winw + "px",
		"height": winw / 2 + "px",
		"background-color": "#fff"
	});

	function isPassive() {
		var supportsPassiveOption = false;
		try {
			addEventListener("test", null, Object.defineProperty({}, 'passive', {
				get: function() {
					supportsPassiveOption = true
				}
			}))
		} catch (e) {}
		return supportsPassiveOption
	}
	document.addEventListener('touchmove', function(e) {
		e.preventDefault()
	}, isPassive() ? {
		capture: false,
		passive: false
	} : false);
	toContent(myScrollHome)
	if (!isNative) {
	  renderTabbar();
	}
});


var tTimeB, tSS, tRef;

function toContent(obj) {
	console.log("==========begin");
	$.ajax({
		type: 'get',
		url: domain+"/1.0/banner/getBanner?where=%7B%22status%22%3A1%2C%22type%22%3A1%7D",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var strGD = "";
			var counter = 0;
			var strUrl = "";
			var parsedJson = eval(data);
			var cssImg = "";
			var cssJJ = "";
			var numJJ = (parseInt($("#indicator").css("width")) - parseInt($("#indicator").css("height"))) / (parsedJson.sort().length - 1);
			$.each(parsedJson.sort(), function(index, item) {
				switch (item.bannerTypes) {
				case 1:
					strUrl = url_api + "product/category/" + item.category.id;
					break;
				case 2:
					strUrl = url_api + "product/" + item.product.id;
					break;
				case 3:
					strUrl = item.custom.urlStr;
					break;
				default:
					break
				}
				strGD += "<td width='" + winw + "px'><a href='" + strUrl + "'><img width='100%' src='" + item.bannerImageUrl + "'></a></td>";
				cssJJ += (cssJJ === "" ? "" : ",") + numJJ * counter + "px 0px"
				cssImg += (cssImg === "" ? "" : ",") + "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAAq0lEQVQ4y9WVIRLCMBBFX1chI5E9RmUlx+jRegwkMseoXFlZF8ymw5QApdlhhmczeZP5yf40KSUKBKADWuC8WVNgAiIwbzc2BeHFZHuIwPWV8AQMhRN9QoERWACkUobtGcyxCvuDskdpn4Xhi8ze0QFBnGSrVOxpeNFKZXZPWQrO/IdQHX0qNuheTGID7kUUqyAPaQTmfCm3yiw111gWLlZBelA2/qRgXb6AO9gbMRUJ8W1MAAAAAElFTkSuQmCC)";
				counter++
			});
			$("#indicator").css({
				"background-image": cssImg,
				"background-position": cssJJ,
				"left": (winw - parseInt($("#indicator").css("width"))) / 2 + "px",
				"top": (winw / 2 - 20) + "px"
			});
			document.getElementById("wrapper_b").getElementsByTagName("tr")[0].innerHTML = strGD;
			$("#wrapper_b").children().css("width", parseInt(counter * winw) + "px");
			var pageB = 0;
			var myScrollBanner = new IScroll('#wrapper_b', {
				scrollX: true,
				scrollY: false,
				momentum: false,
				click: false,
				snap: true,
				snapSpeed: 400,
				keyBindings: true,
				indicators: {
					el: document.getElementById('indicator'),
					resize: false
				}
			});
			myScrollBanner.on("scrollEnd", msBEnd);
			myScrollBanner.on("beforeScrollStart", msBStart);
			msBGo();

			function msBGo() {
				if (pageB >= (counter - 1)) {
					myScrollBanner.goToPage(0, 0, 300)
				} else {
					myScrollBanner.next()
				}
			}
			function msBEnd() {
				pageB = myScrollBanner.currentPage.pageX;
				clearTimeout(tTimeB);
				tTimeB = setTimeout(msBGo, 5000)
			}
			function msBStart() {}
		}
	});
	// $.ajax({
	// 	type: 'get',
	// 	url: domain+"/1.0/cms/59967e2414f6450007c4a0d1",
	// 	dataType: "json",
	// 	headers: {
	// 		'X-ML-AppId': AppId
	// 	},
	// 	success: function(data) {
	// 		var parsedJson = eval(data);
	// 		var str = parsedJson.content.toString();
	// 		var arrStr = str.split("<p>")[1].split("</p>")[0];
	// 		document.getElementById("tdService").innerHTML = arrStr
	// 	}
	// });
	$.ajax({
		type: 'get',
		url: domain+"/1.0/quick/getQuick?where=%7B%22status%22%3A1%7D&skip=0&limit=5&order=+seq",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var strSml = "";
			var counter = 0;
			var strUrl = "";
			var parsedJson = eval(data);
			$.each(parsedJson.sort(), function(index, item) {
				switch (item.quickTypes) {
				case 1:
					strUrl = url_api + "product/category/" + item.category.id;
					break;
				case 2:
					strUrl = item.custom.urlStr;
					break;
				default:
					break
				}
				strSml += "<table class='tabImg' width='66%' border='0' cellspacing='0' cellpadding='0' align='left'><tbody><tr><td align='center'><a href='" + strUrl + "'><img src='" + item.quickImageUrl + "' width='70%' alt='sample'></a></td></tr><tr><td style='font-size:14px; text-align:center; height:30px; padding-bottom:10px'>" + item.quickName + "</td></tr></tbody></table>";
				counter++
			});
			document.getElementById("smlBtn").innerHTML = strSml
		}
	});
	$.ajax({
		type: 'get',
		url: domain+"/1.0/home/recommendArea/findRecommendAreaArticle/home_area_article/client",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var parsedJson = eval(data);
			var nums = parsedJson.results.length;
			var strInfor = "<table width='100%' border='0' cellspacing='0' cellpadding='0' bgcolor='#fff'><tbody>";
			$.each(parsedJson.results, function(index, item) {
				strInfor += "<tr><td height='32'><a href='" + url_api + "article_m1/" + item.objectId + "'><span>" + item.title + "</span></a></td></tr>"
			});
			strInfor += "</tbody></table>";
			document.getElementById("divInformation").getElementsByTagName("div")[0].innerHTML = strInfor;
			var myInformation = new IScroll('#divInformation', {
				click: false,
				bounce: false,
				disableMouse: true,
				disablePointer: true,
				disableTouch: true,
				momentum: false,
				fadeScrollbars: false
			});
			myInformation.tig = 0;

			function showInformation() {
				myInformation.tig++;
				if (myInformation.tig == nums) {
					myInformation.tig = 0;
					myInformation.scrollTo(0, -32 * myInformation.tig, 0)
				} else {
					myInformation.scrollTo(0, -32 * myInformation.tig, 400)
				}
				clearTimeout(tSS);
				tSS = setTimeout(showInformation, 5000)
			}
			showInformation();
			for (var i = 0; i < nums; i++) {
				var module = document.getElementById("divInformation").getElementsByTagName("span")[i];
				$clamp(module, {
					clamp: 1
				})
			}
		}
	});
	$.ajax({
		type: 'get',
		url: domain+"/1.0/banner/getBanner?where=%7B%22status%22%3A1%2C%22type%22%3A2%7D",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var strGD = "";
			var strUrl = "";
			var parsedJson = eval(data);
			$.each(parsedJson.sort(), function(index, item) {
				switch (item.bannerTypes) {
				case 1:
					strUrl = url_api + "product/category/" + item.category.id;
					break;
				case 2:
					strUrl = url_api + "product/" + item.product.id;
					break;
				case 3:
					strUrl = item.custom.urlStr;
					break;
				default:
					break
				}
				strGD = "<a href='" + strUrl + "'><img width='96%' src='" + item.bannerImageUrl + "'></a>"
			});
			document.getElementById("banner_center").innerHTML = strGD
		}
	});
	$.ajax({
		type: 'get',
		url: domain+"/1.0/category?where=%7B%22valid%22%3Atrue%7D&skip=0&limit=6&order=+seq",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var parsedJson = eval(data);
			console.log("商品分类数==" + parsedJson.count + "---" + parsedJson.results.length);
			console.log(parsedJson);
			var ttColor = new Object();
			ttColor.c0 = "#f46464";
			ttColor.c1 = "#d35ed2";
			ttColor.c2 = "#5ba6e9";
			ttColor.c3 = "#57bcd3";
			ttColor.c4 = "#e29854";
			$.each(parsedJson.results, function(index, item) {
				var sUrl = "";
				if (item.secondary.length !== 0) {
					var ids = "";
					for (var i = 0; i < item.secondary.length; i++) {
						ids += (ids == "" ? "" : ",") + item.secondary[i].id
					}
					sUrl = domain+"/1.0/category/getSimpleProductsByCategoryIds/client?where=%7B%22valid%22%3Atrue,%22obvious%22%3Atrue%7D&categoryIds=" + ids + "&skip=0&limit=3&order=+obviousSeq"
				} else {
					sUrl = domain+"/1.0/category/" + item.id + "/simpleProducts/client?where=%7B%22valid%22%3Atrue,%22obvious%22%3Atrue%7D&skip=0&limit=3&order=+obviousSeq"
				}
				var strPrd = "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='tdkj1' id='prd_" + index + "'><tbody>";
				strPrd += "<tr align='center' style='line-height: 0px'><td class='tdkj2' width='33%'>&nbsp;</td><td class='tdkj2' width='33%'>&nbsp;</td><td class='tdkj2' width='33%'>&nbsp;</td></tr>";
				strPrd += "<tr align='center' height='20px' bgcolor='#fff' style='font-size: 11px; color: #000'><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td></tr>";
				strPrd += "<tr align='center' height='20px' style='font-size: 10px; color: #000; line-height:15px'><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td><td class='tdkj2'>&nbsp;</td></tr>";
				strPrd += "</tbody></table>";
				$("#listPrd").find("td.1").eq(index * 2 + 1).html(strPrd);
				toShowPrd(sUrl, index)
			});

			function toShowPrd(url, num) {
				$.ajax({
					type: 'get',
					url: url,
					dataType: "json",
					headers: {
						'X-ML-AppId': AppId
					},
					success: function(data) {
						var parJS = eval(data);
						$.each(parJS.results, function(index, item) {
							var priceOld = (item.originalPrice * 0.01).toFixed(0);
							var priceNow = (item.price * 0.01).toFixed(0);
							$("#prd_" + num).find("tr").eq(0).children("td").eq(index).html("<a href='" + url_api + "product/" + item.id + "'><img src='" + item.coverIcon + "' width='100%'></a>");
							$("#prd_" + num).find("tr").eq(1).children("td").eq(index).html("<span id='prdTit_" + num + "_" + index + "'>" + item.title + "</span>");
							var module = document.getElementById("prdTit_" + num + "_" + index);
							$clamp(module, {
								clamp: 2
							});
							var strPrice;
							if (item.panicSwitch === true) {
								if (item.promotionType === 0) {
									var priceQG = (item.panicPrice * 0.01).toFixed(0);
									strPrice = "<span style='color: #ff3300'>抢购价:￥</span><span style='font-size: 15px; color: #ff3300'>" + priceQG + "</span><br><span style='font-size: 10px'><s>原价:￥" + priceNow + "</s></span>"
								} else if (item.promotionType === 1) {
									var pricePT = (item.groupPrice * 0.01).toFixed(0);
									var numPT = item.groupPerson;
									strPrice = "<span style='color: #ff3300'>团价:￥</span><span style='font-size: 12px; color: #ff3300'>" + pricePT + "</span>&nbsp;&nbsp;<b>" + numPT + "人团</b><br><span style='font-size: 10px'><s>单价:￥" + priceNow + "</s></span>"
								}
							} else {
								if (priceOld !== priceNow) {
									strPrice = "<span style='font-size: 10px; color: #000'>￥</span><span style='font-size: 15px; color: #000'>" + priceNow + "</span>&nbsp;<span style='font-size: 10px; color: #999'><s>￥" + priceOld + "</s></span>"
								} else {
									strPrice = "<span style='font-size: 10px; color: #000'>￥</span><span style='font-size: 15px; color: #000'>" + priceNow + "</span>"
								}
							}
							$("#prd_" + num).find("tr").eq(2).children("td").eq(index).html(strPrice)
						})
					}
				})
			}
		}
	});
	$.ajax({
		type: 'get',
		url: domain+"/1.0/banner/getBanner?where=%7B%22status%22%3A2%2C%22type%22%3A1%7D&skip=0&limit=6&order=+sort",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var parsedJson = eval(data);
			$.each(parsedJson.sort(), function(index, item) {
				switch (item.bannerTypes) {
				case 1:
					strUrl = url_api + "product/category/" + item.category.id;
					break;
				case 2:
					strUrl = url_api + "product/" + item.product.id;
					break;
				case 3:
					strUrl = item.custom.urlStr;
					break;
				default:
					break
				}
				$("#listPrd").find("td.1").eq(index * 2).css("line-height", 0);
				$("#listPrd").find("td.1").eq(index * 2).html("<a href='" + strUrl + "'><img width='96%' src='" + item.bannerImageUrl + "'></a>")
			})
		}
	});
	$.ajax({
		type: 'get',
		url: domain+"/1.0/recommendArea/findRecommendAreaAndProductByRecommendArea/client/home_bottom?where=%7B%22enable%22%3Atrue%7D&productLimit=100",
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var strList = "";
			var parsedJson = eval(data);
			$.each(parsedJson.products, function(index, item) {
				var priceOld = (item.originalPrice * 0.01).toFixed(2);
				var priceNow = (item.price * 0.01).toFixed(2);
				var imgPrd = (item.widePic == "" ? item.coverIcon : item.widePic);
				var wid = (item.widePic == "" ? "52%" : "100%");
				strList += "<table width='100%' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td colspan='2' align='center' bgcolor='#FFFFFF'><a href='" + url_api + "product/" + item.id + "'><img src='" + imgPrd + "' width='" + wid + "'></a></td></tr><tr><td width='68%' align='left' style='font-size:14px;padding:5px 10px'><b>" + item.title + "</b></td><td align='right' style='font-size:13px;padding-right:10px;text-decoration:line-through'>" + (priceOld == priceNow ? "" : "￥：" + priceOld) + "</td></tr><tr><td id='prd" + item.id + "' align='right' style='font-size:14px;color:#CC0003;padding-right:10px;padding-top:5px' colspan='2'><b>￥：" + priceNow + "</b></td></tr></tbody></table>"
			});
			document.getElementById("listCont").innerHTML = strList
		}
	});
	toRefresh();

	function toRefresh() {
		if (contentH !== parseInt($("#scroller").css("height"))) {
			contentH = parseInt($("#scroller").css("height"));
			obj.refresh();
			clearTimeout(tRef);
			tRef = setTimeout(function() {
				toRefresh()
			}, 1000)
		} else {
			numRefresh++;
			if (numRefresh < 3) {
				clearTimeout(tRef);
				tRef = setTimeout(function() {
					toRefresh()
				}, 5000)
			} else {}
		}
	}
};

function showObj(obj) {
	var s;
	for (var i in obj) {
		if (typeof(obj[i]) == "function") {} else {
			s += i + "=" + obj[i] + ";  "
		}
	}
	alert(s)
};

function renderTabbar() {
	$.ajax({
		type: 'get',
		url: domain+"/1.0/developer/config/"+AppId,
		dataType: "json",
		headers: {
			'X-ML-AppId': AppId
		},
		success: function(data) {
			var wechatTab = data.menu.wechatMenu;
			var menuDIvBot = document.getElementById("divBottom");
			var strBotHtml = `<div class="weui-tab"><div class="weui-tabbar">`;
			for(i=0;i<5;i++){
				var item = wechatTab[i];
				var title = item.title || "";
				strBotHtml += `<a href="${item.h5Url}" class="weui-tabbar__item">
				    <img src="${item.iconUrl}" alt="" class="weui-tabbar__icon">
				    <p class="weui-tabbar__label">${title}</p>
				</a>`
			}
			strBotHtml += `</div></div>`;
			menuDIvBot.innerHTML = strBotHtml;
			menuDIvBot.style.display = "block";
			$("#wrapper").css("bottom", "45px")
		}
	});
}