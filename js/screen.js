window.viewportUnitsBuggyfill.init();

var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

var current = 0;
var previous = []; 
var next;

$(document).foundation();

$('body').fadeTo(0,0);

// Angular
var ssuApp = angular.module("ssuApp",[])
			.directive('ngRepeatDirective', function ($timeout) {
			    return {
			        restrict: 'A',
			        link: function (scope, element, attr) {
			            if (scope.$last === true) {
			                $timeout(function () {
			                    contentFunctions();
			                });
			            }
			        }
			    }
			});

ssuApp.controller('ScandalController',['$http','$scope','$rootScope','$sce', 
    function( $http, $scope, $rootScope, $sce ) {

		$http({method: 'GET', url: '/json/scandals.json'}).
		success(function(data, status, headers, config) {
		  $scope.scandals = data;
		}); 


    }]
);

ssuApp.filter('urlencodeFilter', function() {
  return function(input) {
    return encodeURI(input);
  };
});

ssuApp.filter('sourcesFilter', ['$sce', function($sce) {
  return function(input) {

    var sources = input.split(', '),
    	links ='Källor: ';
    for (var i = 0; i < sources.length; i++) {
    	links = links+'<a href="'+sources[i]+'" target="_blank">'+cleanUp(sources[i])+'</a>, ';
    };

    links = links.substr(0,links.length-2);

    return $sce.trustAsHtml(links); 

  };

}]);

function cleanUp(url) {
    var url = $.trim(url);
    if(url.search(/^https?\:\/\//) != -1)
        url = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i, "");
    else
        url = url.match(/^([^\/?#]+)(?:[\/?#]|$)/i, "");

    return url[1].replace('www.','');
}

function contentFunctions() {

	$('a.tweet,a.share').click(function(){
	    var newwindow=window.open($(this).attr('href'),'','height=370,width=600');
	    if (window.focus) {newwindow.focus();}
	    return false;
	});

	$('body').fadeTo(500,1); 
	
	setTimeout(function(){ $(window).resize(); }, 0); 

	var spinning = false;

	$('.spin').click(function(e) {

		e.preventDefault(); 

		if ( $('.spin').hasClass('spinning') == false ) {

			$('.spin').addClass('spinning');

			$('#scandals .scandal').eq(0).find('.content-wrapper').hide();

			$('#scandals .scandal:visible .content-wrapper').fadeTo(500,0,function(){
				$('#scandals .scandal').hide();
				$('#scandals .scandal').eq(next).find('.content-wrapper').fadeTo(0,0);
				$('#scandals .scandal').eq(next).show(); 
				if ( !$('body.csstransitions').length ) {
					$('#scandals .scandal').eq(next).find('.content-wrapper').fadeTo(500,1); 
				} 
			});

			if ( previous.length === 16 ) {

				previous = [0]; 

			} 

			if ( previous.length === 0 ) {

				next = 0;

			} else if ( previous.length < 15 )  {

				next = Math.floor((Math.random() * 15)); 
				var i = 0; 
				while ( $.inArray(next, previous) > -1 && previous.length < 16 && i !== 16 || i !== 16 && ( next === 8 ) ) { 
					next = Math.floor((Math.random() * 15));
					i++;
				}

			} else {

				next = 8;

			}	

			previous.push(next); 

			$('#spin-audio').trigger('play'); 



			$("#backgrounds div:visible").clearQueue().fadeTo(500,0,function(){
				$(this).hide(); 
				$("#backgrounds div").eq(next).fadeTo(500,1);
			}); 


			$('#spinner').clearQueue().css({ rotate: '0deg' }).transition({
			  rotate: (1080-(next)*22.5)+'deg',
			  easing: 'easeOutCirc',
			  duration: 4000 
			},function(){

				$('#scandals .scandal').eq(next).find('.content-wrapper').delay(100).fadeTo(500,1); 

				current = next;
				$('.spin').removeClass('spinning');

			});	



		}

	});

	$('.spin').eq(0).trigger('click'); 

	$('#play-pause a').click(function(e) {

		e.preventDefault();

		if ( $(this).hasClass('pause') ) {
			$('#background-audio').trigger('pause'); 
			$(this).attr('class','play');
		} else {
			$('#background-audio').trigger('play'); 
			$(this).attr('class','pause');			
		}

	});

		



}

$(window).resize(function() {

    var width, height;

    if ( iOS ) {

        width = $(window).width();

        if ( width === screen.width ) {
            height = screen.height;
        } else {
           height = $(window).height();  
        }
        

    }   else {
        width = $(window).width();
        height = $(window).height();
    }


    if (iOS) {

        $('#background-wrapper, #background-wrapper > div').css({
            'height': height
        });
    }



	$('#arrow').each(function() { var $this = $(this); 

		$this.css({
			'margin-left': ($('#outer-scandal-wrapper').width()/2)
		}); 
		
	});


	if ( width < 1000 ) {

		fontSize = (width/1000);

	} else  {
		fontSize = 1;
	}

	$('section').css({
		'font-size': fontSize+'em' 
	}); 

    $('section > .row').each(function() {

    	var margin = $(this).parent().height()-$(this).height();

    	if ( margin < 0 ) {
    		margin = 0; 
    	} 

    	margin = (margin/2);

    	if ( margin < 120 ) {
    		margin = 120;
    	}

    	$(this).css({
    		'padding-top': margin+'px'
    	});

    });


}); setTimeout(function(){ $(window).resize(); }, 0);  

