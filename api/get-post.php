<?php
// WP REST API ENDPOINT ROUTE CREATION
add_action('rest_api_init', function () {
    // namespace, route, callback
    register_rest_route( 'social/v2', 'get-post-id/(?P<id>\d+)', array(
                  'methods'  => 'GET',
                  'callback' => 'get_post_id'
        ));
  });
  function get_post_id($request) {
    $id = $request['id'];
    //$city = 'a%';
    $sql = "SELECT  id, user_id, title, body, posted_on FROM tblPosts  WHERE id =  ".$id. " ORDER BY posted_on DESC";
    global $wpdb;
    $results = $wpdb->get_results($wpdb->prepare($sql, ""));
    // This is PHP code to create a JSON like data structure
    $json_data = array();//create the array  
    foreach ($results as $objRS)//foreach loop  
    {  
        $json_array['id'] = $objRS->id;  
        $json_array['user_id'] = $objRS->user_id;  
        $json_array['title'] = $objRS->title;  
        $json_array['body'] = $objRS->body;  
        $json_array['posted_on'] = $objRS->posted_on;  

  
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