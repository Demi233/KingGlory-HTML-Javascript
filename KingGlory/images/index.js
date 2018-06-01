/* ???id????????? //game.gtimg.cn/images/yxzj/web201706/js/heroid.js ----------------------------------------------------------------------*/
// alert("local2")
/* [AMS] ?????????KPL???? ----------------------------------------------------------------------*/
// (function(){

	var G_biz = 18;
	var G_Source = 'web';
	var subClass = '';
	var G_Detail = '../v/detail.shtml';
   var G_Go = '../v/detail.shtml';
	var getUrl = '/webplat/info/news_version3/15592/22661/22664/';
	//0-962 KPL?????? 1-757KOC?????????  2-752TGA??????  3-753QGC????  4-758WGC????? 5-941KCC????????
	var urldata = {
		'962': '25563/m16190/index.js',
		'941': '25332/m15187/index.js',
		'757': '22665/m15187/index.js',
		'752': '22666/m15187/index.js',
		'753': '22667/m15187/index.js',
		'758': '23414/m15187/index.js'
	};
	var imgurldata = {
		'962': '29090/m17643/index.shtml',
		'757': '29091/m17643/index.shtml',
		'752': '29092/m17643/index.shtml',
		'753': '29093/m17643/index.shtml',
		'758': '29094/m17643/index.shtml',
      '941': '29095/m17643/index.shtml'
	};
	var order = "sIdxTime" //??’??????????;
	var dataHero = {} || [];
	var herolist = {} || [];
    var herolistIds = {} || [];
	var PushData = function(data, num, str, iType) {
		var RetHTML = '';
		var length = data.length > num ? num : data.length;
		for(var x = 0; x < length; x++) {
			RetHTML += '<li onclick="PTTSendClick(\'raidersCenter\',\''+ iType +'-video'+ x +'\',\'攻略中心视频-' + x + '\');' + data[x]['sLog'] + '">';
			RetHTML += '<a href="' + data[x]['sUrl'] + '" target="_blank" onclick="' + data[x]['sLog'] + '" title="' + data[x]['sTitle'] + '">';
			RetHTML += '<img src="' + data[x]['sIMG'] + '" width="173" height="110">';
			RetHTML += '<span class="clearfix play-bar">';
			RetHTML += '<em class="fl ico-play">' + data[x]['iTotalPlay'] + '</em><em class="fr">' + data[x]['sCreated'].substr(0, 10) + '</em>';
			RetHTML += '</span>';
			RetHTML += '<span class="video-tit" title="' + data[x]['sTitle'] + '">' + data[x]['sTitle'] + '</span>';
			RetHTML += '';
			RetHTML += '<div class="mask pa">';
			RetHTML += '<span class="mask-play-ico"></span>';
			RetHTML += '</div></a>';
			RetHTML += '</li>';
		}
		return RetHTML;
	};

	var PushDataMath = function(data, num, str, iType) {
		var RetHTML = '';
		var length = data.length > num ? num : data.length;
		for(var x = 0; x < length; x++) {
			RetHTML += '<li>';
			RetHTML += '<a href="' + data[x]['sUrl'] + '" target="_blank" onclick="PTTSendClick(\'matchCenter\',\''+ iType +'-video'+ x +'\',\'赛事中心视频-' + x + '\');' + data[x]['sLog'] + '" title="' + data[x]['sTitle'] + '">';
			RetHTML += '<img src="' + data[x]['sIMG'] + '" width="173" height="110">';
			RetHTML += '<p class="video-tit">' + data[x]['sTitle'] + '</p>';
			RetHTML += '<p class="clearfix play-bar">';
			RetHTML += '<em class="fl ico-play">' + data[x]['iTotalPlay'] + '</em><em class="fr">' + data[x]['sCreated'].substr(0, 10) + '</em>';
			RetHTML += '</p>';
			RetHTML += '';
			RetHTML += '<div class="mask pa">';
			RetHTML += '<span class="mask-play-ico db spr"></span>';
			RetHTML += '</div></a>';
			RetHTML += '</li>';
		}
		return RetHTML;
	};
	// ?????’?????????
	var PushDataUserHero = function(data, num, str, iType) {
		var RetHTML = '';
		var length = data.length > num ? num : data.length;
		for(var x = 0; x < length; x++) {
			RetHTML += '<li onclick="' + (iType.indexOf('userhero') == 0 ? ';PTTSendClick(\'raidersCenter\',\''+ iType +'-AIvideo'+ x +'\',\'攻略中心智能推送视频-' + (iType[8]) + x + '\');' : ';PTTSendClick(\'raidersCenter\',\''+ iType +'-video'+ x +'\',\'攻略中心视频-' + x + '\');') + '">';
			RetHTML += '<a  href="' + data[x]['sUrl'] + '" target="_blank" onclick="' + data[x]['sLog'] + '" title="' + data[x]['sTitle'] + '">';
			RetHTML += '<img src="' + data[x]['sIMG'] + '" width="173" height="110">';
			RetHTML += '<span class="clearfix play-bar">';
			RetHTML += '<em class="fl ico-play">' + data[x]['iTotalPlay'] + '</em><em class="fr">' + data[x]['sCreated'].substr(0, 10) + '</em>';
			RetHTML += '</span>';
			RetHTML += '<span class="video-tit" title="' + data[x]['sTitle'] + '">' + data[x]['sTitle'] + '</span>';
			RetHTML += '';
			RetHTML += '<div class="mask pa">';
			RetHTML += '<span class="mask-play-ico"></span>';
			RetHTML += '</div></a>';
			RetHTML += '</li>';
		}
		return RetHTML;
	};

	//?????????????????
	var LoadSubTypeList = function(iType, iSubType, heroName, type) {
		if(iSubType == 0) {
			QueryTypeList(function(data) {
				var data = data['newlist' + iType];
				$('#videoList').html(PushData(data, 8, 'videoindexType', 'new' + iType));
			});
		} else {
			QueryTypeList(function(data) {
				var data = data['videolist' + iSubType];
				if(type == 0) {
					$('#item_hero').html(heroName);
					$('.item_content #videoList').html(PushData(data, 8, 'videoindexType', iSubType));
					$('.dropdown').hide();
				} else {
					$("#matchVideoList").html(PushDataMath(data, 8, 'videoindexType', iSubType))
				}

			});
		}
	};

	//????????б?
	function getHeroList(tid,userArr) {
		$.ajax({
			url: '//pvp.qq.com/web201605/js/herolist.json',
			dataType: 'json',
			success: function(data) {
				dataHero = data;
				QueryParentTypeInfo(function(data) {
					QueryTypeInfo(function(typeObj) {
						var RetHTML = '';
						if(tid == 0) {
                          for(var j in herolist) {
							for(var i in typeObj) {
								var subType = typeObj[i];
								for(var k in subType) {
									if(herolist[j] === subType[k].sName) {
										RetHTML += '<li subType=' + subType[k].iType + ' onclick="LoadSubTypeList(1,' + subType[k].iType + ',\'' + subType[k].sName + '\',0);PTTSendClick(\'tab\',\'heroSelect-' + subType[k].iType + '\',\'' + subType[k].sName + '\')">';
										RetHTML += '<a>';
										RetHTML += '<img src="//game.gtimg.cn/images/yxzj/img201606/heroimg/' + herolistIds[j] + '/' + herolistIds[j] + '.jpg" width="60px" alt="' + subType[k].sName + '">' + subType[k].sName;
										RetHTML += '</a>';
										RetHTML += '</li>';
									}
								}
							}
                          }
							$('#hero_list').html(RetHTML);
							return;
						}
						// ?????????????????
						if(tid == 1){
							var userHeroName = [],userHeroId = [];
							for(var i = 0;i < dataHero.length;i++){
								if(dataHero[i].ename == userArr[0] || dataHero[i].ename == userArr[1] || dataHero[i].ename == userArr[2]){
									dataHero[i].ename == userArr[0] ? userHeroName[0] = dataHero[i].cname : dataHero[i].ename == userArr[1] ? userHeroName[1] = dataHero[i].cname :  userHeroName[2] = dataHero[i].cname;
								}
							}
							for(var j in typeObj){
								var subType = typeObj[j];
								for(var k in subType){
									if(subType[k].sName == userHeroName[0] || subType[k].sName == userHeroName[1] || subType[k].sName == userHeroName[2]){
										subType[k].sName == userHeroName[0] ? userHeroId[0] = subType[k].iType : subType[k].sName == userHeroName[1] ? userHeroId[1] = subType[k].iType :  userHeroId[2] = subType[k].iType;
									}
								}
							}
							QueryTypeList(function(data) {
								var reHtml = '';
								var data1 = data['videolist' + userHeroId[0]],data2 = data['videolist' + userHeroId[1]],data3 = data['videolist' + userHeroId[2]];
								if(userHeroId.length == 3){
									reHtml += PushDataUserHero(data1, 4, 'videoindexType','userhero1');
									reHtml += PushDataUserHero(data2, 2, 'videoindexType','userhero2');
									reHtml += PushDataUserHero(data3, 2, 'videoindexType','userhero3');
								}else if(userHeroId.length == 2){
									reHtml += PushDataUserHero(data1, 4, 'videoindexType','userhero1');
									reHtml += PushDataUserHero(data2, 4, 'videoindexType','userhero2');
								}else if(userHeroId.length == 1){
									reHtml += PushDataUserHero(data1, 8, 'videoindexType','userhero1');
								}
								$('#videoList').html(reHtml);
								return ;
							});
						}
						var subType = typeObj['typelist_' + tid];
						for(var x in subType) {
							for(var y in dataHero) {
								if(dataHero[y].cname === subType[x].sName) {
									RetHTML += '<li subType=' + subType[x].iType + ' onclick="LoadSubTypeList(' + tid + ',' + subType[x].iType + ',\'' + dataHero[y].cname + '\',0);PTTSendClick(\'tab\',\'heroSelect-' + subType[x].iType + '\',\'' + dataHero[y].cname + '\')">';
									RetHTML += '<a>';
									RetHTML += '<img src="//game.gtimg.cn/images/yxzj/img201606/heroimg/' + dataHero[y].ename + '/' + dataHero[y].ename + '.jpg" width="60px" alt="' + subType[x].sName + '">' + subType[x].sName;
									RetHTML += '</a>';
									RetHTML += '</li>';
								}
							}

						}
						$('#hero_list').html(RetHTML);
					});
				})
			}
		})
	}
	//???????‘????????
	var LoadDefaultData = function LoadDefaultData(Page, PageSize, order, Type, TypeId) {
		QuerySearchList(Page, PageSize, order, Type, TypeId, function(data) {
			if(data.status == 0) {
				$('.item_content #videoList').html(PushData(data['msg']['result'], PageSize, 'videosearch' + Type, TypeId));
			} else {
				$('.item_content #videoList').html(data.msg);
			}
		});
	};

	//??????????????
	QueryTypeInfo(function(subType) {
		subClass = subType;
		var RetHTML = "";
		var subTypeList = subType['typelist_751'];
		for(y in subTypeList) {
			if(subTypeList[y].iType) {
				if(subTypeList[y].iType != 1336 && subTypeList[y].iType != 1384) {
					RetHTML += '<a href="javascript:;"  onmouseover="LoadSubTypeList(751,' + subTypeList[y].iType + ',1,1);PTTSendClick(\'tab\',\'matchCenter-' + subTypeList[y].iType + '\',\'' + subTypeList[y].sName + '\');" subType="' + subTypeList[y].iType + '" >' + subTypeList[y].sName + '</a><span class="split"></span>';
				}
			}
		}
		$('#VideoTypeId_751_index').html(RetHTML);
		//??????????tab?л?
		$("#VideoTypeId_751_index a").bind("mouseover", function() {
			var num = $(this).attr('subType');
			$(this).addClass('on').siblings('a').removeClass('on');
			getMatchNews(num);
		}).eq(0).mouseover();
		LoadSubTypeList(751, 962, 1, 1);
	});

	//???????????????
	var getMatchNews = function(index) {
		var Murl = getUrl + urldata[index];
		var RetHTML = '';
		$.ajax({
			url: Murl,
			dataType: 'script',
			contentType: 'application/x-www-form-urlencoded',
			'success': function(data) {
				for(var x in newsIndexData) {
					x == 0 ? RetHTML += ' <li class="line-sp">' : RetHTML += ' <li>';
					RetHTML += ' <a target="_blank" href="' + decodeURIComponent(newsIndexData[x]['typeIndexPath']) + '" class="fl news-type">' + decodeURIComponent(newsIndexData[x]['sTypeName']) + '</a>';
					RetHTML += '<a target="_blank" onclick="PTTSendClick(\'matchCenter\',\'' + index + '-news' + x + '\',\'赛事中心新闻-' + x + '\');" href="' + decodeURIComponent(newsIndexData[x]['infoPath']) + '" class="fl news-txt news-txt1">' + decodeURIComponent(newsIndexData[x]['sTitle']) + '</a>';
					if(x == 0) {
						RetHTML += '<a target="_blank" href="' + decodeURIComponent(newsIndexData[x]['infoPath']) + '" class="fl news-txt news-txt1 news_sub_title">' + decodeURIComponent(newsIndexData[x]['sSubContent']) + '</a>';
					}
					RetHTML += '<em class="fr news-time">' + newsIndexData[x]['dtCreateTime'] + '</em>';
					if(x > 5) {
						break;
					}
				}
				$('.match-list-l').html(RetHTML);
			}
		})
		$.get('//pvp.qq.com/webplat/info/news_version3/15592/29030/29082/29089/' + imgurldata[index], function(data) {
			$("#match_news_pic").html(data);
		});
		//$('#match_news_pic').html('<!--#include virtual="/webplat/info/news_version3/15592/29030/29082/29089/'+imgurldata[index]+'"-->');

	}

	//$('#match_schedule')
	function dateFormat(val) {
	    val = val.replace(/-/g, '/');
		var date = new Date(val);
		var month = date.getMonth() + 1 + '-';
		var day = date.getDate() + ' ';
		var hour = date.getHours() + ':';
		var mimute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		return month + day + hour + mimute;
	}

	function sortByDate(a, b) {
		var aTime = a.stime;
		var bTime = b.stime;
		return((aTime <= bTime) ? -1 : 1);
	}

	function getMatchSchedule() {
		var matchScheduleHtml = '';
		$.ajax({
			url: 'https://itea-cdn.qq.com/file/ingame/smoba/matchlivelist12.json ',
			dataType: 'json',
			success: function(data) {
				data.matchlist.sort(function (a, b) {
                    return new Date(a.stime.replace(/-/g, '/')).getTime() - new Date(b.stime.replace(/-/g, '/')).getTime();
                })
				// data.matchlist && $.each(data.matchlist, function(index, match) {
				// 	match.stime = new Date(match.stime.replace(/-/g, '/')).getTime();
				// })
				// console.log(data.matchlist,'second solution');
				data.matchlist && $.each(data.matchlist, function(index, match) {
                    matchScheduleHtml +=  '<li>';
                    matchScheduleHtml +='<span class="' + 'match_time">' + dateFormat(match.stime) + '</span>' ;
                    //$('#match_schedule_content ul').html(matchScheduleHtml);
                    matchScheduleHtml +='<span class="' + 'team_name">';
                    matchScheduleHtml += '<img src=' + match.alogo + ' ' + 'class="team_name_icon"' + '>'
                    matchScheduleHtml += '<em>' + match.teama + '</em>';
                    matchScheduleHtml += '</span>';
                    matchScheduleHtml += '<span class="'+ 'vs">VS</span><span class="team_name">';
                    matchScheduleHtml += '<img src=' + match.blogo + ' ' + 'class="team_name_icon"' + '>';
                    matchScheduleHtml += '<em>' + match.teamb + '</em>';
                    matchScheduleHtml += '</span></li>';
					$('#match_schedule_content ul').html(matchScheduleHtml);
				})
			}
		})
	}
	getMatchSchedule();
	//??????????
	function getNewHeroVideo() {

        // pgvSendClick({hottag:'pvp.index.getnewvideo'});
		if(document.cookie.indexOf('PVP_PERSONAL_HERO') > 0){
			var personHero = document.cookie.split('PVP_PERSONAL_HERO=')[1].split(';')[0].split('_i_');
			var userArr = personHero[0].split('_'),userID = personHero[1];
			console.log('[我的游戏ID是]:',userID);
			if(userID%2 == 1){
				if(dataHero.length > 0){
					QueryParentTypeInfo(function(data) {
						QueryTypeInfo(function(typeObj) {
							var userHeroName = [],userHeroId = [];
							for(var i = 0;i < dataHero.length;i++){
								if(dataHero[i].ename == userArr[0] || dataHero[i].ename == userArr[1] || dataHero[i].ename == userArr[2]){
									dataHero[i].ename == userArr[0] ? userHeroName[0] = dataHero[i].cname : dataHero[i].ename == userArr[1] ? userHeroName[1] = dataHero[i].cname :  userHeroName[2] = dataHero[i].cname;
								}
							}
							for(var j in typeObj){
								var subType = typeObj[j];
								for(var k in subType){
									if(subType[k].sName == userHeroName[0] || subType[k].sName == userHeroName[1] || subType[k].sName == userHeroName[2]){
										subType[k].sName == userHeroName[0] ? userHeroId[0] = subType[k].iType : subType[k].sName == userHeroName[1] ? userHeroId[1] = subType[k].iType :  userHeroId[2] = subType[k].iType;
									}
								}
							}
							QueryTypeList(function(data) {
								var reHtml = '';
								var data1 = data['videolist' + userHeroId[0]],data2 = data['videolist' + userHeroId[1]],data3 = data['videolist' + userHeroId[2]];
								if(userHeroId.length == 3){
									reHtml += PushDataUserHero(data1, 4, 'videoindexType','userhero1');
									reHtml += PushDataUserHero(data2, 2, 'videoindexType','userhero2');
									reHtml += PushDataUserHero(data3, 2, 'videoindexType','userhero3');
								}else if(userHeroId.length == 2){
									reHtml += PushDataUserHero(data1, 4, 'videoindexType','userhero1');
									reHtml += PushDataUserHero(data2, 4, 'videoindexType','userhero2');
								}else if(userHeroId.length == 1){
									reHtml += PushDataUserHero(data1, 8, 'videoindexType','userhero1');
								}
								$('#videoList').html(reHtml);
								return ;
							});
						})
					});
				}else {
					getHeroList(1,userArr);
				}
        		// pgvSendClick({hottag:'pvp.index.newusv'});
			}else {
				var newHtml = '';
				QueryTypeList(function(vdata) {
					var data = vdata['newlist' + 623];
					var data1 = vdata['newlist' + 619];
					var data2 = vdata['newlist' + 675];
					var data3 = vdata['newlist' + 641];
					var data4 = vdata['newlist' + 676];
					var data5 = vdata['newlist' + 627];
					newHtml += PushDataUserHero(data, 2, 'videoindexType', 'new623');
					newHtml += PushDataUserHero(data1, 2, 'videoindexType', 'new619');
					newHtml += PushDataUserHero(data2, 1, 'videoindexType', 'new675');
					newHtml += PushDataUserHero(data3, 1, 'videoindexType', 'new641');
					newHtml += PushDataUserHero(data4, 1, 'videoindexType', 'new676');
					newHtml += PushDataUserHero(data5, 1, 'videoindexType', 'new627');
					// $('#item_hero').html('????');
					$('.item_content #videoList').html(newHtml);
				});
        		// pgvSendClick({hottag:'pvp.index.newusdv'});
			}
		}else {
			var newHtml = '';
			QueryTypeList(function(vdata) {
				var data = vdata['newlist' + 623];
				var data1 = vdata['newlist' + 619];
				var data2 = vdata['newlist' + 675];
				var data3 = vdata['newlist' + 641];
				var data4 = vdata['newlist' + 676];
				var data5 = vdata['newlist' + 627];
				newHtml += PushData(data, 2, 'videoindexType', 'new623');
				newHtml += PushData(data1, 2, 'videoindexType', 'new619');
				newHtml += PushData(data2, 1, 'videoindexType', 'new675');
				newHtml += PushData(data3, 1, 'videoindexType', 'new641');
				newHtml += PushData(data4, 1, 'videoindexType', 'new676');
				newHtml += PushData(data5, 1, 'videoindexType', 'new627');
				// $('#item_hero').html('????');
				$('.item_content #videoList').html(newHtml);
			});
    		// pgvSendClick({hottag:'pvp.index.newdev'});
		}
	}

	//?????? 3/4 ?????????????
	function getColumNewest(TypeId) {

		var items = {} || [];
		if(TypeId == 'item1') {
			items = [2507, 2508, 2132, 2509, 2135, 2510, 2504, 2511, 2512];
		} else {
			items = [2132, 2499, 2137, 2140, 2125, 2500, 2501, 2502, 2503, 2504, 2505, 2506];
		}
		var retNHTML = '';
		var arr = [],
			index = 0;
		for(var i = 0; i < items.length; i++) {
			QuerySearchList(1, 2, 'sIdxTime', 'iKeyword', items[i], function(data) {
				if(data.status == 0) {
					var dataArr = data.msg.result;
					for(var j = 0; j < dataArr.length; j++) {
						arr.push(dataArr[j]);
					}

					if(index == items.length-1) {
						arr.sort(function(a, b) {
							return compareTime(b.sCreated) - compareTime(a.sCreated);
						});
						var newData = arr.slice(0, 8);
						$('#videoList').html(PushData(newData, 8,'videoindexType','default'));
					}
					index++;

				} else {
					console.log(data);
				}
			});
		}
	}

	function compareTime(a) {
		return parseInt(new Date(Date.parse(a)).getTime());
	}
	// getNewHeroVideo();


  // ???????? ?????’??
  if(typeof(pgvMain) == 'function')pgvMain();
    var dropdown = $('.dropdown'),
        strategy_list = $('.strategy_center .item_subnav a'),
        strategy_item = $('.strategy_center .item_thirdnav'),
        skin_list = $('.skin_center .item_subnav a'),
        skin_item = $('.skin_center .item_content');

    var ss = setTimeout(function(){dropdown.hide()},300);
    $('#item_hero').hover(function(){
      dropdown.show();
    });
   dropdown.bind("mouseenter",function(){
    	clearTimeout(ss);
    	dropdown.show();
    });
   dropdown.bind("mouseleave",function(){
    	// alert("mouseout");
    	dropdown.hide();
    });



    function searchItem(navlist,navcontent){
      navlist.each(function(index,element){
        var that = $(this);
        that.hover(function(){
          navlist.removeClass("on");
          that.addClass("on");
          navcontent.hide();
          $(navcontent[index]) ? $(navcontent[index]).show() : "";

        })
      })
    }
	function searchItem1(navlist,navcontent){
      navlist.each(function(index,element){
        var that = $(this);
        that.hover(function(){
          navlist.removeClass("on");
          that.addClass("on");
          navcontent.hide();
          $(navcontent[index]) ? $(navcontent[index]).show() : "";
            if(index==0){
              getNewHeroVideo();
              dropdown.hide();
            }else{
              $("#item_thirdnav"+index+" a").eq(0).mouseover();
            }
        })
      });

      $(document).ready(function(){navlist.eq(0).mouseover()})
    }
    searchItem1(strategy_list,strategy_item);
    searchItem(skin_list,skin_item);


// ??????????????????
$(window).load(function(){
	$('#videoList').on('click','li',function(){
		var n1 = $('.item_subnav .on').index()/2,n2 = $(this).index();
		PTTSendClick('raidersCenter','video'+n1+n2,'攻略中心视频'+n1+n2);
	});
	$("#item_thirdnav1 a,#item_thirdnav2 a").hover(function() {
		$(this).addClass('on').siblings('a').removeClass('on');
		var kid = $(this).attr('data-key');
		Type = 'iKeyword';
		TypeId = kid;
		if(TypeId == 'item1' || TypeId == 'item2') {
			getColumNewest(TypeId);
		} else {
			LoadDefaultData(1, 8, 'sIdxTime', Type, TypeId);
		}

	});

	$("#herolist li").bind("mouseover", function() {
		var tid = $(this).attr('data-id');
		var n = $(this).index();
		if(tid == 0) {
			//????dz????20???
			var encodeParam = 'E5CB3C064B7A772867B1B552594434FCA26621A002CCB5AF47407E70297E2D6EE7962AC5C4D05234943B0144EDFBDCC4C2A285820C8983E5DE4E22B38EF167CCCA62220D5B3FF8BF83283431B8FF17FB790EDAA0932201873DEC7556F3CFF3AD325B51D6FF5A451618921BA48FF6818B53191FA3C7ED56E51021350FDC66A01CB44BB53178F3C501';
			$.ajax({
				url: '//pvp.ingame.qq.com/php/ingame/smoba/top_heros.php?partition=1119&roleid=90876401&area=1&physicalID=1&algorithm=v2&version=2.14.6a&timestamp=1493112232746&appid=1104466820&sig=11a92c24e8f0d1fc74e31bb8c5203a09&encode=2&msdkEncodeParam=' + encodeParam + '&game=smoba&start=1&num=20&ordertype=1&filter=0&grade=-1&herotype=0&matchtype=2',
				dataType: 'jsonp',
				'success': function(data) {
					var RetHTML = '';
					if(data.status == 'SUCCESS') {
						var hdata = data.data.herolist;
						for(var x in hdata) {
							var hid = hdata[x].heroid;
							if(module_exports[hid] != "") {
								herolist[x] = module_exports[hid];
                                herolistIds[x] = hid;
							}
						}
						getHeroList(0);
					}
				}
			})
		} else {
			//????÷????μ????
			getHeroList(tid);
		}
		PTTSendClick('raidersCenter','herolist'+n,'英雄分类'+n);
	}).eq(0).mouseover().mouseout();
});
// })();
