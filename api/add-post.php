<?php
// WP REST API ENDPOINT ROUTE CREATION
add_action('rest_api_init', function () {
    register_rest_route( 'social/v1', 'add-post',array(
                 //'methods'  => WP_REST_Server::READABLE, // For GET
                  'methods'  => WP_REST_Server::CREATABLE, // could just use 'POST'
                  'callback' => 'add_post',
                  'args'     => array (
                        'title'  => array( 
                            'type'             => 'string',
                            // REQUIRED AND VALIDATE_CALLBACK OPTIONAL
                            'required'         => true,
                            'validate_callback' => function($param){
                                if (strlen($param) > 4) {
                                    return true;
                                } else {
                                    return false;
                                }
                           }
                        ),
                        'body'  => array(
                            'type'     => 'string',
                            // REQUIRED AND VALIDATE_CALLBACK OPTIONAL
                            'required' => true,
                            'validate_callback' => function($param){
                                if (strlen($param) > 4 ) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        ),
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
  function add_post(WP_REST_Request $request) { // works without WP_REST_Request
        // REQUEST FILTER OPTIONAL - JUST ADDED TO SHOW WHAT CAN BE DONE
        // WE MIGHT HAVE ONE ENDPOINT THAT HANDLES GET< POST, DELETE ETC.
        $request_type = $_SERVER['REQUEST_METHOD'];
        if ($request_type == "POST") { 
            $parameters = array(
                "title"  => $request->get_param("title"),
                "body" => $request->get_param("body"),
                "id"   => $request->get_param("id")
                );  
            // Do standard validations
            $title = sanitize_text_field($request->get_param("title"));
            $body = sanitize_text_field($request->get_param("body"));
            $id = sanitize_text_field($request->get_param("id"));
            // Create post object
            global $wpdb, $name, $email;
           
    
            $wpdb->insert("tblPosts", 
            array(
                'user_id' => $id, 
                'title' => $title, 
                'body' => $body, 
            ), 
            array( 
                    '%d', 
                    '%s',
                    '%s'
                )  ); 
            $postID = $wpdb->insert_id;
            return array(
                "status"     => "SUCCESS - POST ADDED", // these fields can have add field name
                "postId"     => $postID,
                "method"     => "POST", 
                "message"    => "add-post: social-v1-rest02", 
                "parameters" => $parameters
            );
        }
  }

