<?php
/*
Plugin Name: Smoke Mixcloud Integrator
Plugin URI: https://github.com/jhackett1/smoke-mixcloud-integrator
Description: Display podcasts and listen to them in a handy player, powered by Mixcloud. Use [mixcloud-integrator] to display.
Author: Joshua Hackett
Author URI: http://joshuahackett.com
Version: 1.0.0
*/

function show_mixcloud_integrator(){
  // Get plugin CSS
  wp_enqueue_style('yuhh', plugin_dir_url( __FILE__ ) . '/css/style.css');
  // Get Angular lib
  wp_enqueue_script('angular', plugin_dir_url( __FILE__ ) . '/node_modules/angular/angular.js');
  wp_enqueue_script('angular-animate', plugin_dir_url( __FILE__ ) . '/node_modules/angular-animate/angular-animate.js');
  // Get custom app scripts
  wp_enqueue_script('services', plugin_dir_url( __FILE__ ) . '/js/services.js');
  wp_enqueue_script('app', plugin_dir_url( __FILE__ ) . '/js/app.js');
  // Lastly, include the markup template
  ob_start();
  $template = include 'mixcloud-template.php';
  return ob_get_clean();
};

// Register the shortcode
add_shortcode('mixcloud-integrator', 'show_mixcloud_integrator');
