<?php

add_action('rest_api_init', function () {
  // namespace, route, callback
  register_rest_route( 'social/v2', 'get-posts', array(
                'methods'  => 'GET',
                'callback' => 'get_social_posts'
      ));
});
function get_social_posts() {

  $sql = "SELECT * FROM tblPosts ORDER BY posted_on DESC";
  global $wpdb;
  $results = $wpdb->get_results($wpdb->prepare($sql, ""));
  // This is PHP code to create a JSON like data structure
  $json_data = array();//create the array 
  $json_array = array(); 
  foreach ($results as $objRS)//foreach loop  
  {  
      $json_array['id'] = $objRS->id;  
      $json_array['user_id'] = $objRS->user_id;  
      $json_array['title'] = $objRS->title;  
      $json_array['body'] = $objRS->body;  
      $json_array['posted_on'] = $objRS->posted_on;  

      // here pushing the record array in to another array  
      array_push($json_data, $json_array);  
  }
  wp_reset_query();
  // Create headers
  $response = new WP_REST_Response( $json_data);
  // Set response status - this can be customised 
  $response->set_status(200);
  return $response;
}
