// Create the app and grab the services file
var app = angular.module('integrator', ['ngAnimate', 'mixcloudServices']);

// Controller to show paginated list of podcasts and player
app.controller('list', function($scope, $http, mixcloudApi, apiProcessor, $sce, $window, $location){

  // Display the loader
  $scope.loading = true;


  if (parseInt($location.path().substring(6,9))) {
    $scope.currentPage = parseInt($location.path().substring(6,9))
  } else {
    // Set the current page
    $scope.currentPage = 1;
  }


  // Make the API request
  mixcloudApi.list($scope.currentPage).then(function(response) {
    // Process the data into a more sensible form
    var podcasts = apiProcessor.process(response);
    // Hide the loader
    $scope.loading = false;
    // Make processed data available in scope
    $scope.podcasts = podcasts;
  });

  // Turn on the player, get the embed code and pass the data into the view
  $scope.startPlaying = function(podcast, index){


    // Add class to selected podcast
    var podcasts = document.getElementsByClassName('podcast')
    // Clear class from last podcast if exists
    for (var i = 0; i < podcasts.length; i++) {
      if (podcasts[i].classList.contains('playing')) {
        podcasts[i].classList.remove('playing');
      }
    }
    podcasts[index].classList.add('playing')



    // Make the HTTP request for the iframe HTML
    $http.get( podcast.embed).then(function(res){
      $scope.embed = $sce.trustAsHtml(res.data.html);
      // Make the player visible
      $scope.playerVisible = true;
    });
  };

  // Close the player
  $scope.closePlayer = function(){
    $scope.playerVisible = false;
    // Clear playing class from all podcast elements
    var podcasts = document.getElementsByClassName('podcast')
    for (var i = 0; i < podcasts.length; i++) {
      if (podcasts[i].classList.contains('playing')) {
        podcasts[i].classList.remove('playing');
      }
    }
    $scope.embed = null;
  };

  // Functions to allow pagination
  $scope.nextPage = function(currentPage){
    mixcloudApi.list(currentPage+1).then(function(response) {
      var podcasts = apiProcessor.process(response);
      $scope.currentPage = currentPage+1;
      $scope.loading = false;
      $scope.podcasts = podcasts;
      $location.path('/page/' + $scope.currentPage)
      $window.scrollTo(0, 0);
    });
  }
  $scope.prevPage = function(currentPage){
    mixcloudApi.list(currentPage-1).then(function(response) {
      var podcasts = apiProcessor.process(response);
      $scope.currentPage = currentPage-1;
      $scope.loading = false;
      $scope.podcasts = podcasts;
      $scope.podcasts = podcasts;
      $location.path('/page/' + $scope.currentPage);
      $window.scrollTo(0, 0);
    });
  }

})
