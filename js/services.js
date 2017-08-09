var services = angular.module('mixcloudServices',[]);

// Service to interact with Mixcloud API and return the data
services.service('mixcloudApi', function($http, $q){
  // Two constants for the relevant API endpoints
  const feedEndpoint = "https://api.mixcloud.com/smokeradio/feed/";
  // LIST 20 RECENT PODCASTS, PAGE AS REQUESTED
  this.list = function(page){
    // Calculate the offset for the desired page
    var offset = (page-1)*20;
    // Set up the promise
    var deferred = $q.defer();
    // Make the HTTP request
    $http.get(feedEndpoint + '?offset=' + offset).then(function(res){
      // On success
      deferred.resolve(res.data);
    }, function(data){
      // On error
      console.error(data.status + " Error: couldn't access the Radio Data API");
    });
    return deferred.promise;
  }
});

// Service to process API data into a sensible form
services.service('apiProcessor', function(){
  // THE ONE AND ONLY METHOD
  this.process = function(response){
    var processedList = response.data.map(function(upload){
      let podcast = {};
      podcast.name = upload.cloudcasts[0].name;
      podcast.play_count = upload.cloudcasts[0].play_count;
      podcast.created_time = upload.cloudcasts[0].created_time;
      podcast.duration = parseInt(upload.cloudcasts[0].audio_length / 60);
      podcast.icon = upload.cloudcasts[0].pictures.large;
      podcast.embed = "http://api.mixcloud.com" + upload.cloudcasts[0].key + "embed-json/?color=282951";
      return podcast;
    })
    return processedList;
  }
})
