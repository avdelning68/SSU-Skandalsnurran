function cleanUp(n){var n=$.trim(n);return n=-1!=n.search(/^https?\:\/\//)?n.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,""):n.match(/^([^\/?#]+)(?:[\/?#]|$)/i,""),n[1].replace("www.","")}function contentFunctions(){$("a.tweet,a.share").click(function(){var n=window.open($(this).attr("href"),"","height=370,width=600");return window.focus&&n.focus(),!1}),$("body").fadeTo(500,1),setTimeout(function(){$(window).resize()},0);var n=!1;$(".spin").click(function(n){if(n.preventDefault(),0==$(".spin").hasClass("spinning")){if($(".spin").addClass("spinning"),$("#scandals .scandal").eq(0).find(".content-wrapper").hide(),$("#scandals .scandal:visible .content-wrapper").fadeTo(500,0,function(){$("#scandals .scandal").hide(),$("#scandals .scandal").eq(next).find(".content-wrapper").fadeTo(0,0),$("#scandals .scandal").eq(next).show(),$("body.csstransitions").length||$("#scandals .scandal").eq(next).find(".content-wrapper").fadeTo(500,1)}),16===previous.length&&(previous=[0]),0===previous.length)next=0;else if(previous.length<15){next=Math.floor(15*Math.random());for(var e=0;$.inArray(next,previous)>-1&&previous.length<16&&16!==e||16!==e&&8===next;)next=Math.floor(15*Math.random()),e++}else next=8;previous.push(next),$("#spin-audio").trigger("play"),$("#backgrounds div:visible").clearQueue().fadeTo(500,0,function(){$(this).hide(),$("#backgrounds div").eq(next).fadeTo(500,1)}),$("#spinner").clearQueue().css({rotate:"0deg"}).transition({rotate:1080-22.5*next+"deg",easing:"easeOutCirc",duration:4e3},function(){$("#scandals .scandal").eq(next).find(".content-wrapper").delay(100).fadeTo(500,1),current=next,$(".spin").removeClass("spinning")})}}),$(".spin").eq(0).trigger("click"),$("#play-pause a").click(function(n){n.preventDefault(),$(this).hasClass("pause")?($("#background-audio").trigger("pause"),$(this).attr("class","play")):($("#background-audio").trigger("play"),$(this).attr("class","pause"))})}window.viewportUnitsBuggyfill.init();var iOS=navigator.userAgent.match(/(iPad|iPhone|iPod)/g)?!0:!1,current=0,previous=[],next;$(document).foundation(),$("body").fadeTo(0,0);var ssuApp=angular.module("ssuApp",[]).directive("ngRepeatDirective",function(n){return{restrict:"A",link:function(e,t,i){e.$last===!0&&n(function(){contentFunctions()})}}});ssuApp.controller("ScandalController",["$http","$scope","$rootScope","$sce",function(n,e,t,i){n({method:"GET",url:"/json/scandals_kreab.json"}).success(function(n,t,i,s){e.scandals=n})}]),ssuApp.filter("urlencodeFilter",function(){return function(n){return encodeURI(n)}}),ssuApp.filter("sourcesFilter",["$sce",function(n){return function(e){for(var t=e.split(", "),i="Källor: ",s=0;s<t.length;s++)i=i+'<a href="'+t[s]+'" target="_blank">'+cleanUp(t[s])+"</a>, ";return i=i.substr(0,i.length-2),n.trustAsHtml(i)}}]),$(window).resize(function(){var n,e;iOS?(n=$(window).width(),e=n===screen.width?screen.height:$(window).height()):(n=$(window).width(),e=$(window).height()),iOS&&$("#background-wrapper, #background-wrapper > div").css({height:e}),$("#arrow").each(function(){var n=$(this);n.css({"margin-left":$("#outer-scandal-wrapper").width()/2})}),fontSize=1e3>n?n/1e3:1,$("section").css({"font-size":fontSize+"em"}),$("section > .row").each(function(){var n=$(this).parent().height()-$(this).height();0>n&&(n=0),n/=2,120>n&&(n=120),$(this).css({"padding-top":n+"px"})})}),setTimeout(function(){$(window).resize()},0);