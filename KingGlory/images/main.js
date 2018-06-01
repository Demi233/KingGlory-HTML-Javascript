/**
 * pvp Page JS
 * Editor: sonichuang
 * Modify: 2017-06-07
 */

/* 页面交互 ----------------------------------------------------------------------*/
(function(){

	//tab切换
	need("biz.tabs",function (tabs){
		tabs.init("newsTab", "news-list",{ event: "mouseover"});    
	})

	//轮播广告
	var gets={
		tag: function(p, o) {
			return document.getElementById(p).getElementsByTagName(o);
		}
	};
	 //轮播 promo
	var t = 0,
	JGetPromo = function() {
		loadScript("//game.qq.com/time/qqadv/Info_new_15191.js?v=" + gets.ran, function() {        
			var  promoArray = '',
			   promoTriggerArray = '',
			   count = 0,
				 ShowAdList = new Array();
			for (var item in oDaTaNew15191) {
				var d = oDaTaNew15191[item];
				ShowAdList.push(d[1]);
				if (d && count < 5) {
					count++;
					promoArray += '<li class="promo-item"><a onclick="PTTSendClick(\'ad\',\'btn_' + count + '\',\'广告' + count + '\');EAS.ADClick(\'' + d[1] + '\');" href="' + d[1] + '" target="_blank"><img src="//game.gtimg.cn/upload/adw/' + d[2] + '" width="604" height="298" alt="' + decodeURI(d[0]) + '"/></a></li>';
					promoTriggerArray += '<span class="rt">' + decodeURI(d[0]) + '</span>';               
				}
				if (ShowAdList.length == 5) {
					var ShowAdStr = ShowAdList.join("|");
					if (typeof(EAS.ADShow) == 'function') {
						EAS.ADShow(ShowAdStr);
					};                            
				};
			}
			g('promoInner').innerHTML = promoArray;
			g('promoTrigger').innerHTML = promoTriggerArray;
			var amount = 5,
				ts = amount - 1,
				p = 0;
			$('#promoTrigger span').eq(0).addClass('rn');
			var timeout;
			timeout = setInterval(function() {
				promoMove();
			}, 5000);
			$('#promoTrigger span').each(function(index) {
				$(this).mouseover(function() {
					clearInterval(timeout);
					t = index;
					$("#promoInner").animate({
						'marginLeft': -t * 604 + 'px'
					}, {
						queue: false,
						duration: 200
					});
					$('#promoTrigger span').eq(t).addClass('rn').siblings().removeClass('rn');
					timeout = setInterval(function() {
						promoMove();
					}, 5000);
					//},100);
				});
			});
			//动画效果
			function promoMove() {
				t = parseInt(t + 1);
				if (t > ts) {
					t = 0;
				}
				if (t < 0) {
					t = ts;
				}
				p = t;
				$("#promoInner").animate({
					'marginLeft': -p * 604 + 'px'
				}, {
					queue: false,
					duration: 200
				});
				$('#promoTrigger span').eq(p).addClass('rn').siblings().removeClass('rn');
			}
		});
	}();
	//头条新闻
	function topNews(){var o;for(var i=1;i<6;i++){o= g("newsList"+i).getElementsByTagName("li");if(o&&o.length>=1){o[0].className="line-sp"}}};topNews();

	/* 英雄限费时间填充，一般为周1-周日 add by sonic 2017-06-01 */
	// 获取当前服务器时间
	function getServerTime(callback) {
		$.getScript('//apps.game.qq.com/CommArticle/app/reg/gdate.php?t=' + new Date().getTime(), function() {
			var serverDate = json_curdate,
				date = new Date(serverDate.replace(/-/g,"/"));
			callback && callback(date);
		});
	}
	function getDateStr(date,offset){
		var dateSet = date || new Date(),
			offset = offset || 0;
		var h = new Date();
		h.setDate(dateSet.getDate()+offset);
		var set =[];
		set.push(h.getFullYear());
		set.push(h.getMonth() + 1);
		set.push(h.getDate());
		return set[0] + '-' + set[1] + '-' + set[2];
	}
	var freeHeroDayFill = function(d){
		var d = d || new Date();
		var day = d.getDay();
		var d1,d2;
		switch (day){
			case 0: //日
				d1 = getDateStr(d,+1);
				d2 = getDateStr(d,+7);
				break;
			case 1: //一
				d1 = getDateStr(d,0);
				d2 = getDateStr(d,+6);
				break;
			case 2: //二
				d1 = getDateStr(d,-1);
				d2 = getDateStr(d,+5);
				break;
			case 3: //三
				d1 = getDateStr(d,-2);
				d2 = getDateStr(d,+4);
				break;
			case 4: //四
				d1 = getDateStr(d,-3);
				d2 = getDateStr(d,+3);
				break;
			case 5: //五
				d1 = getDateStr(d,-4);
				d2 = getDateStr(d,+2);
				break;
			case 6: //六
				d1 = getDateStr(d,-5);
				d2 = getDateStr(d,+1);
				break;
		}
		if(d1){$("#freeDayBegin").html(d1)}
		if(d2){$("#freeDayEnd").html(d2)}
	}
	// 拿当前服务器时间计算得出本周1 - 下周日
	getServerTime(freeHeroDayFill);
})();


// 赛事弹窗
(function() {
	function createChannel(wrapId, cid, width, height) {
		$.getScript("//game.gtimg.cn/images/js/swfobject.js",function(){
			$.getScript("//imgcache.qq.com/tencentvideo_v1/tvp/js/tvp.player_v2_jq.js",function(){
				var video = new tvp.VideoInfo();
				video.setChannelId(cid);
				var player = new tvp.Player();
				player.create({
					width: width,
					height: height,
					type: 1,
					video: video,
					modId: wrapId,
					autoplay: true
				});
			})
		})
	}

	function dragVideo() {
		var box = document.getElementById('videoSpop');
		box.onmousedown = function(event) {
			var e = event || window.event,
				t = e.target || e.srcElement,
				x1 = e.clientX,
				y1 = e.clientY,
				dragLeft = this.offsetLeft,
				dragTop = this.offsetTop;
			document.onmousemove = function(event) {
				var e = event || window.event,
					t = e.target || e.srcElement,
					x2 = e.clientX,
					y2 = e.clientY,
					x = x2 - x1,
					y = y2 - y1;
				box.style.left = (dragLeft + x) + 'px';
				box.style.top = (dragTop + y) + 'px';
			}
			document.onmouseup = function() {
				this.onmousemove = null;
			}
		}
	}

	function popVideo() {
		$("#video_pop").css("background", "url(" + popData.img + ") no-repeat 0 0");
		createChannel("mod_player", cid, '100%', 490);
		setTimeout(function() {
			TGDialogS('video_pop');
		}, 500);
	}
	if(typeof popData === 'object'){
		var cid = popData.vid,
			num = popData.num,
			showpop,
			showflag = false;
		if (cid !== '0') {
			if (num == '1') {
				var mvShowed = JSON.parse(localStorage.getItem('mvshowflag'));
				if (!mvShowed || (mvShowed && +new Date().getTime() - mvShowed.expire > 1000 * 60 * 60 * 24)) {
					popVideo();
					localStorage.setItem('mvshowflag', JSON.stringify({ 'show': true, 'expire': new Date().getTime() }));
				}
			} else {
				popVideo();
			}
		}
	}
	$(".pop-video-small").on("click", function() {
		$("#videoSpop").show();
		$(".pop-video").hide();
		$("#_overlay_").hide();
		$("#mod_player").html("");
		createChannel("vpop", cid, 420, 260);
	})
	$(".clspop").on("click", function() {
		$("#vpop").html("");
		$("#videoSpop").hide();
		$("#video_pop,#_overlay_").hide();
	});

	// 直播dialog关不掉，单独JS处理
	$(".pop-video-close").on("click", function() {
		$("#video_pop,#_overlay_").hide();
		$("#video_pop").remove();
	});

})();
