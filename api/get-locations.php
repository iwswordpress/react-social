<?php
add_action('rest_api_init', function () {
  // namespace, route, callback
  register_rest_route( 'wordcamp/v2', 'locations/(?P<city>\w+)', array(
                'methods'  => 'GET',
                'callback' => 'get_locations'
      ));
});
function get_locations($request) {
  $city = $request['city']."%";
  //$city = 'a%';
  $sql = "SELECT  id,city, country, code, latitude, longitude FROM tblLocations  WHERE city LIKE '".$city."' ORDER BY city";
  global $wpdb;
  $results = $wpdb->get_results($wpdb->prepare($sql, ""));
  // This is PHP code to create a JSON like data structure
  $json_data = array();//create the array  
  foreach ($results as $objRS)//foreach loop  
  {  
      $json_array['id'] = $objRS->id;  
      $json_array['city'] = $objRS->city;  
      $json_array['country'] = $objRS->country;  
      $json_array['code'] = $objRS->code;  
      $json_array['latitude'] = $objRS->latitude;  
      $json_array['longitude'] = $objRS->longitude; 
      $json_array['query'] = $request['city']; 

      // here pushing the record array in to another array  
      array_push($json_data,$json_array);  
  }
  wp_reset_query();
  $posts =  $json_data; 
  // Create headers
  $response = new WP_REST_Response($posts);
  // Set response status - this can be customised 
  $response->set_status(200);
  return $response;
}

add_action('rest_api_init', function () {
  // namespace, route, callback
  register_rest_route( 'wordcamp/v2', 'locations-id/(?P<id>\d+)', array(
                'methods'  => 'GET',
                'callback' => 'get_locations_id'
      ));
});
function get_locations_id($request) {
  $id = $request['id'];
  //$city = 'a%';
  $sql = "SELECT  id,city, country, code, latitude, longitude FROM tblLocations  WHERE id =  ".$id;
  global $wpdb;
  $results = $wpdb->get_results($wpdb->prepare($sql, ""));
  // This is PHP code to create a JSON like data structure
  $json_data = array();//create the array  
  foreach ($results as $objRS)//foreach loop  
  {  
      $json_array['id'] = $objRS->id;  
      $json_array['city'] = $objRS->city;  
      $json_array['country'] = $objRS->country;  
      $json_array['code'] = $objRS->code;  
      $json_array['latitude'] = $objRS->latitude;  
      $json_array['longitude'] = $objRS->longitude; 
      $json_array['query'] = $request['city']; 

      // here pushing the record array in to another array  
      array_push($json_data,$json_array);  
  }
  wp_reset_query();
  $posts =  $json_data; 
  // Create headers
  $response = new WP_REST_Response($posts);
  // Set response status - this can be customised 
  $response->set_status(200);
  return $response;
}