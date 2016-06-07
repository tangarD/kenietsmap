angular.module('MapAble.controllers', [])

/* APP*/
    .controller('AppCtrl', ['$scope', function($scope) {
    angular.extend($scope, {
		center: {
			 lat: 20,
			 lng: -80,
			 zoom: 2
		},
		layers: {
			overlays: {
				NorthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				eastafrica: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				tibet: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				wasia: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				SouthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				Eurasia: {
					name: "North America",
					type: "markercluster",
					visible: true
				}
			}
		},
        maxBounds:{
			southWest:{
				lat:-75,
				lng:-180
			},
			northEast:{
				lat:85,
				lng:180
			}
		},
		defaults: {
			maxZoom:8,
			minZoom:2,
			scrollWheelZoom: true,
			zoomAnimation: true,
            fadeAnimation: true,
            markerZoomAnimation: false,
            animate: false,
            zoomControl: false
		}
	});

}])

// WALKTHROUGH
.controller('WalkthroughCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};
}])

.controller('LoginCtrl', ['$scope', '$state', '$templateCache', '$q', '$rootScope', function($scope, $state, $templateCache, $q, $rootScope) {
	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.goToForgotPassword = function(){
		$state.go('forgot-password');
	};

	$scope.doLogIn = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};

	$scope.user.email = "john@doe.com";
	$scope.user.pin = "12345";

	// We need this for the form validation
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});

}])

.controller('SignupCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.user = {};

	$scope.user.email = "john@doe.com";

	$scope.doSignUp = function(){
		$state.go('app.feeds-categories');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};
}])

.controller('ForgotPasswordCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.feeds-categories');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.user = {};
}])

.controller('RateApp', ['$scope', function($scope) {
	$scope.rateApp = function(){
		if(ionic.Platform.isIOS()){
			//you need to set your own ios app id
			AppRate.preferences.storeAppURL.ios = '1234555553>';
			AppRate.promptForRating(true);
		}else if(ionic.Platform.isAndroid()){
			//you need to set your own android app id
			AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
			AppRate.promptForRating(true);
		}
	};
}])

.controller('SendMailCtrl', ['$scope', function($scope) {
	$scope.sendMail = function(){
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to:      'envato@startapplabs.com',
					cc:      'hello@startapplabs.com',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'Greetings',
					body:    'How are you? Nice greetings from IonFullApp'
				});
			}
		);
	};
}])

.controller('AdsCtrl', ['$scope', '$ionicActionSheet', 'AdMob', 'iAd', function($scope, $ionicActionSheet, AdMob, iAd) {

	$scope.manageAdMob = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
				{ text: 'Show Banner' },
				{ text: 'Show Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				AdMob.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show Banner')
				{
					console.log("show banner");
					AdMob.showBanner();
				}

				if(button.text == 'Show Interstitial')
				{
					console.log("show interstitial");
					AdMob.showInterstitial();
				}

				return true;
			}
		});
	};

	$scope.manageiAd = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
			{ text: 'Show iAd Banner' },
			{ text: 'Show iAd Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show - Interstitial only works in iPad',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				iAd.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show iAd Banner')
				{
					console.log("show iAd banner");
					iAd.showBanner();
				}
				if(button.text == 'Show iAd Interstitial')
				{
					console.log("show iAd interstitial");
					iAd.showInterstitial();
				}
				return true;
			}
		});
	};
}])

//brings all feed categories
.controller('FeedsCategoriesCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.feeds_categories = [];

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});
}])

//bring specific category providers
.controller('CategoryFeedsCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		var category = _.find(response, {id: $scope.categoryId});
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
}])

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', ['$scope', '$stateParams', '$http', 'FeedList', '$q', '$ionicLoading', 'BookMarkService', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
	$scope.feed = [];

	var categoryId = $stateParams.categoryId,
			sourceId = $stateParams.sourceId;

	$scope.doRefresh = function() {

		$http.get('feeds-categories.json').success(function(response) {

			$ionicLoading.show({
				template: 'Loading entries...'
			});

			var category = _.find(response, {id: categoryId }),
					source = _.find(category.feed_sources, {id: sourceId });

			$scope.sourceTitle = source.title;

			FeedList.get(source.url)
			.then(function (result) {
				$scope.feed = result.feed;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			}, function (reason) {
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			});
		});
	};

	$scope.doRefresh();

	$scope.readMore = function(link){
		window.open(link, '_blank', 'location=yes');
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkFeedPost(post);
	};
}])

// Multimedia
.controller('MultimediaCtrl', ['$scope', function($scope) {

}])

// SETTINGS
.controller('SettingsCtrl', ['$scope', '$ionicActionSheet', '$state', function($scope, $ionicActionSheet, $state) {
	$scope.airplaneMode = true;
	$scope.wifi = false;
	$scope.bluetooth = true;
	$scope.personalHotspot = true;

	$scope.checkOpt1 = true;
	$scope.checkOpt2 = true;
	$scope.checkOpt3 = false;

	$scope.radioChoice = 'B';

	// Triggered on a the logOut button click
	$scope.showLogOutMenu = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			// buttons: [
			// { text: '<b>Share</b> This' },
			// { text: 'Move' }
			// ],
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				//Called when one of the non-destructive buttons is clicked,
				//with the index of the button that was clicked and the button object.
				//Return true to close the action sheet, or false to keep it opened.
				return true;
			},
			destructiveButtonClicked: function(){
				//Called when the destructive button is clicked.
				//Return true to close the action sheet, or false to keep it opened.
				$state.go('login');
			}
		});

	};
}])

// FORMS
.controller('FormsCtrl', ['$scope', function($scope) {
}])

// PROFILE
.controller('ProfileCtrl', ['$scope', function($scope) {
}])

// BOOKMARKS
.controller('BookMarksCtrl', ['$scope', '$rootScope', 'BookMarkService', '$state', function($scope, $rootScope, BookMarkService, $state) {

	$scope.bookmarks = BookMarkService.getBookmarks();

	// When a new post is bookmarked, we should update bookmarks list
	$rootScope.$on("new-bookmark", function(event){
		$scope.bookmarks = BookMarkService.getBookmarks();
	});

	$scope.goToFeedPost = function(link){
		window.open(link, '_blank', 'location=yes');
	};
	$scope.goToWordpressPost = function(postId){
		$state.go('app.post', {postId: postId});
	};
}])

// SLIDER
.controller('SliderCtrl', ['$scope', '$http', '$ionicSlideBoxDelegate', function($scope, $http, $ionicSlideBoxDelegate) {
}])

// WORDPRESS
.controller('WordpressCtrl', ['$scope', '$http', '$ionicLoading', 'PostService', 'BookMarkService', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
	$scope.posts = [];
	$scope.page = 1;
	$scope.totalPages = 1;

	$scope.doRefresh = function() {
		$ionicLoading.show({
			template: 'Loading posts...'
		});

		//Always bring me the latest posts => page=1
		PostService.getRecentPosts(1)
		.then(function(data){

			$scope.totalPages = data.pages;
			$scope.posts = PostService.shortenPosts(data.posts);

			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMoreData = function(){
		$scope.page += 1;

		PostService.getRecentPosts($scope.page)
		.then(function(data){
			//We will update this value in every request because new posts can be created
			$scope.totalPages = data.pages;
			var new_posts = PostService.shortenPosts(data.posts);
			$scope.posts = $scope.posts.concat(new_posts);

			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.moreDataCanBeLoaded = function(){
		return $scope.totalPages > $scope.page;
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkWordpressPost(post);
	};

	$scope.doRefresh();
}])

// WORDPRESS POST
.controller('WordpressPostCtrl', ['$scope', '$http', '$stateParams', 'PostService', '$ionicLoading', function($scope, $http, $stateParams, PostService, $ionicLoading) {

	$ionicLoading.show({
		template: 'Loading post...'
	});

	var postId = $stateParams.postId;
	PostService.getPost(postId)
	.then(function(data){
		$scope.post = data.post;
		$ionicLoading.hide();
	});

	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
}])


.controller('ImagePickerCtrl', ['$scope', '$rootScope', '$cordovaCamera', function($scope, $rootScope, $cordovaCamera) {

	$scope.images = [];

	$scope.selImages = function() {

		window.imagePicker.getPictures(
			function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ' + results[i]);
					$scope.images.push(results[i]);
				}
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}, function (error) {
				console.log('Error: ' + error);
			}
		);
	};

	$scope.removeImage = function(image) {
		$scope.images = _.without($scope.images, image);
	};

	$scope.shareImage = function(image) {
		window.plugins.socialsharing.share(null, null, image);
	};

	$scope.shareAll = function() {
		window.plugins.socialsharing.share(null, null, $scope.images);
	};
}])

// LAYOUTS
.controller('LayoutsCtrl', ['$scope', function($scope) {
}])


.controller("MapController", [ '$scope', '$log', '$http', 'leafletData', 'attrService',
	function($scope, $log, $http, leafletData, attrService) {

		var _Layerpoly0 = 	geojsonvt(_coastline);
		var _Layerpoly200 = geojsonvt(_poly200);
		var _Layerpoly500 = geojsonvt(_poly500);
		var _Layerpoly1000 = geojsonvt(_poly1000);
		var _Layerpoly2000 = geojsonvt(_poly2000);
		var _Layerpoly3000 = geojsonvt(_poly3000);
		var _Layerpoly4000 = geojsonvt(_poly4000);
		var _Layerpoly5000 = geojsonvt(_poly5000);
		var _LayerIce = 	geojsonvt(_ice);


		CenterMap(_Layerpoly0,	  	"LayerPoly0", 	"map1", attrService);
		CenterMap(_Layerpoly200, 	"LayerPoly200", "map1", attrService);
		CenterMap(_Layerpoly500, 	"LayerPoly500", "map1", attrService);
		CenterMap(_Layerpoly1000, 	"LayerPoly1000", "map1", attrService);
		CenterMap(_Layerpoly2000,	"LayerPoly2000", "map1", attrService);
		CenterMap(_Layerpoly3000, 	"LayerPoly3000", "map1", attrService);
		CenterMap(_Layerpoly4000, 	"LayerPoly4000", "map1", attrService);
		CenterMap(_Layerpoly5000, 	"LayerPoly5000", "map1", attrService);
		CenterMap(_LayerIce, 		"Layerice", 	"map1", attrService);


		function CenterMap(rawData, layerName, mapid, attrService) {
			var _layer;
			_layer = getGeojsonVectorTiles(rawData, layerName, attrService);
			leafletData.getMap(mapid).then(function(map) {
				_layer.addTo(map)
		   });
		};

		function getGeojsonVectorTiles (rawData, layerName, attrService) {
				return  L.canvasTiles()
						.params({ debug: false, padding: 5 , layer: rawData, LayerName: layerName, attributes: attrService.attrs[layerName] })
						.drawing(drawingOnCanvas);
		};
	}
])

.controller("MapControllerPeaks", [ '$scope', '$log', '$http', 'leafletData', 'attrService',
	function($scope, $log, $http, leafletData, attrService) {

	angular.extend($scope, {
			markers: attrService.mountainPeaks,
			overlays: {
				NorthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				eastafrica: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				tibet: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				wasia: {
					name: "East Africa",
					type: "markercluster",
					visible: true
				},
				SouthAmerica: {
					name: "North America",
					type: "markercluster",
					visible: true
				},
				Eurasia: {
					name: "North America",
					type: "markercluster",
					visible: true
				}
			}
		}
	);


	var _Layerpoly0 = geojsonvt(_coastline);
	CenterMap(_Layerpoly0, "LayerPoly0", "MapPeaks", attrService);

	function CenterMap(rawData, layerName, mapid, attrService) {
		var _layer;
		_layer = getGeojsonVectorTiles(rawData, layerName, attrService);
		leafletData.getMap(mapid).then(function(map) {
			_layer.addTo(map)
		});
	};

	function getGeojsonVectorTiles (rawData, layerName, attrService) {
		return  L.canvasTiles()
			.params({ debug: false, padding: 5 , layer: rawData, LayerName: layerName, attributes: attrService.attrs[layerName] })
			.drawing(drawingOnCanvas);
	};
      }
	]
)


function drawingOnCanvas(canvasOverlay, params) {

    var pad = 0;
	params.tilePoint.z = params.zoom;
	var _canvas = params.canvas;
	var ctx = params.canvas.getContext('2d');
	ctx.globalCompositeOperation = 'source-over';

    var zParam = params.tilePoint.z
    var xParam = params.tilePoint.x

    if (zParam == 2){
        if (xParam < 0 || xParam > 3 ){
            return;
        }
    }
    if (zParam == 3){
        if ( xParam < 0 || xParam > 7 ){
            return;
        }
    }

    if (zParam == 4){
        if (xParam < 0 || xParam > 15 ){
            return;
        }
    }

    if (zParam == 5){
        if ( xParam < 0 || xParam > 31 ){
            return;
        }
    }

	if ('devicePixelRatio' in window) {
	  if (window.devicePixelRatio > 1) {
		  _canvas.style.width = _canvas.width + 'px';
		  _canvas.style.height = _canvas.height + 'px';
		  _canvas.width *=2;
		  _canvas.height *=2;
		  ctx.scale(2,2);
	  }
  };
	var tile = params.layer.getTile(zParam, xParam, params.tilePoint.y);

    if (!tile) {
        return;
	}


    ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
			ctx.strokeStyle = '#b9b991';
			ctx.lineWidth = 0.5;

			var features = tile.features;

			for (var i = 0; i < features.length; i++) {
				var feature = features[i],
				type = feature.type;

				ctx.beginPath();

				for (var j = 0; j < feature.geometry.length; j++) {
					//window.alert(feature.tags.FIPS_CNTRY)
					var color = params.options.attributes.color;
					ctx.fillStyle = feature.tags.color ? feature.tags.color :  color;//'rgba( 12,155,155,0.5)';

					var geom = feature.geometry[j];
					if (type === 1) {
							ctx.arc(geom[0] * ratio + pad, geom[1] * ratio + pad, 2, 0, 2 * Math.PI, false);
							continue;
					}
					for (var k = 0; k < geom.length; k++) {
							var p = geom[k];
							var extent = 4096;
							var x = p[0] / extent * 256;
							var y = p[1] / extent * 256;
							if (k) ctx.lineTo(x  + pad, y   + pad);
							else ctx.moveTo(x  + pad, y  + pad);
					}
				}
				if (type === 3 || type === 1) ctx.fill('evenodd');
				ctx.stroke();
			}
	};
