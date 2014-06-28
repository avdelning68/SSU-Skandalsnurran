// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs

//jQuery
$(document).foundation();

$(window).resize(function() {

	$('.youtube').each(function() {

		var $this = $(this);

		$this.css({
			width: '100%',
			height: ($this.parent().width()/1.778)+'px'
		});
		
	});
	


}); $(window).resize();


// Angular
var ssuApp = angular.module("ssuApp",[]); 

ssuApp.controller('ScandalController',['$http','$scope', 
    function( $http, $scope ) {

		$http({method: 'GET', url: '/json/scandals.json'}).
		success(function(data, status, headers, config) {
		  $scope.scandals = data;
		  console.log(data);
		}); 


    }]
);


