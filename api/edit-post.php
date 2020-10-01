<?php
// WP REST API ENDPOINT ROUTE CREATION
add_action('rest_api_init', function () {
    register_rest_route( 'social/v2', 'edit-post', array(
                 //'methods'  => WP_REST_Server::READABLE, // For GET
                  'methods'  => WP_REST_Server::CREATABLE, // could just use 'POST'
                  'callback' => 'edit_post',
                        'args'     => array (
                            'id'  => array( 
                            'type'             => 'integer',
                            'required'         => true,
                            'validate_callback' => function($param){
                                    if  ($param > -1) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            ),
                        'title'  => array( 
                            'type'             => 'string',
                        //     REQUIRED AND VALIDATE_CALLBACK OPTIONAL
                            'required'         => true,
                            'validate_callback' => function($param){
                                if (strlen($param) > 2) {
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
                                if (strlen($param) > 2 ) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        )
                  )
        ));
  });
  // CALLBACK FUNTION
  function edit_post(WP_REST_Request $request) { // works without WP_REST_Request
        // REQUEST FILTER OPTIONAL - JUST ADDED TO SHOW WHAT CAN BE DONE
        // WE MIGHT HAVE ONE ENDPOINT THAT HANDLES GET< POST, DELETE ETC.
        $request_type = $_SERVER['REQUEST_METHOD'];
        if ($request_type == "POST") { 
            $parameters = array(
                "id"  => $request->get_param("id"),
                "title"  => $request->get_param("title"),
                "body" => $request->get_param("body")
               
                );  
            // Do standard validations
            $id = sanitize_text_field($request->get_param("id"));
            $title = sanitize_text_field($request->get_param("title"));
            $body = sanitize_text_field($request->get_param("body"));

            // EDIT CARD
            global $wpdb;
            $wpdb->update( 
                'tblPosts', 
                array( 
                    'title' =>  $title ,	// string
                    'body' =>  $body	// integer (number) 
                ), 
                array( 'ID' => $id), 
                array( 
                    '%s',	// value1
                    '%s'	// value2
                ), 
                array( '%d' ) 
            );
            // send custom response message as needed...
            // WP will convert as needed to be sent to client
            return array(
                "status"     => "SUCCESS - EDIT ".$title." ".$body, 
                "method"     => "POST", 
                "message"    => "ENDPOINT: social/v2/edit-card", 
                "parameters" => $parameters
            );
        }
  }

