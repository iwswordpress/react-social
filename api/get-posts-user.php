<?php
// WP REST API ENDPOINT ROUTE CREATION
add_action('rest_api_init', function () {
    register_rest_route( 'social/v2', 'get-posts-user', array(
                 //'methods'  => WP_REST_Server::READABLE, // For GET
                  'methods'  => WP_REST_Server::CREATABLE, // could just use 'POST'
                  'callback' => 'get_post_id',
                  'args'     => array (
                        'id'  => array(
                            'type'     => 'integer',
                            'required' => true,
                            'validate_callback' => function($param){
                                if ($param > -1 ) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        ),
                  )
        ));
  });
  // CALLBACK FUNCTION
  function get_post_id(WP_REST_Request $request) { // works without WP_REST_Request
    
    $id = sanitize_text_field($request->get_param("id"));
    $sql = "SELECT * FROM tblPosts WHERE user_id = '".$id."' ORDER BY posted_on DESC";
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
  

