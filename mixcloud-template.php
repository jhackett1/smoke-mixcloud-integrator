<main ng-app="integrator" >




  <section id="mixcloud-integrator" ng-controller="list">
    <noscript><p class="no-js">You need a browser that supports Javascript to use Smoke Radio Podcasts.</p></noscript>

    <img ng-show="loading" class="loader" src="<?php echo plugin_dir_url( __FILE__ ) . '/assets/loader.svg' ?>"/>

    <section id='mixcloud-player' ng-show="playerVisible">
      <div ng-bind-html="embed"></div>
      <i class="fa fa-close" ng-click="closePlayer()"></i>
    </section>

    <h3 class="page" ng-show="currentPage > 1"  ng-cloak>Page {{currentPage}}</h3>

    <ul ng-hide='loading' ng-cloak>
      <li class="podcast" ng-repeat="podcast in podcasts" ng-click="startPlaying(podcast, $index)">
        <p><i class="fa fa-clock-o"></i>{{podcast.created_time | date}}</p>
        <div class="podcast-icon" style="background-image:url('{{podcast.icon}}')">
          <i class="fa fa-play"></i>
          <i class="fa fa-volume-up"></i>
        </div>
        <h3>{{podcast.name}}</h3>
        <p>{{podcast.duration}}m</p>
      </li>
    </ul>

    <div class="pagination">
      <a ng-click="nextPage(currentPage)"><i class="fa fa-arrow-left"></i> Older podcasts</a>
      <a ng-click="prevPage(currentPage)" ng-hide="currentPage == '1'"  ng-cloak>Newer podcasts <i class="fa fa-arrow-right"></i></a>
    </div>
  </section>

</main>
