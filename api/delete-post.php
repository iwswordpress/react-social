<?php
// WP REST API ENDPOINT ROUTE CREATION
add_action('rest_api_init', function () {
    register_rest_route( 'social/v2', 'delete-post', array(
                 //'methods'  => WP_REST_Server::READABLE, // For GET
                  'methods'  => WP_REST_Server::CREATABLE, // could just use 'POST'
                  'callback' => 'delete_post',
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
                            )
                  )
        ));
  });
  // CALLBACK FUNTION
  function delete_post(WP_REST_Request $request) { // works without WP_REST_Request
        // REQUEST FILTER OPTIONAL - JUST ADDED TO SHOW WHAT CAN BE DONE
        // WE MIGHT HAVE ONE ENDPOINT THAT HANDLES GET< POST, DELETE ETC.
        $request_type = $_SERVER['REQUEST_METHOD'];
        if ($request_type == "POST") { 
            $parameters = array(
                "id"  => $request->get_param("id"),
               
               
                );  
            // Do standard validations
            $id = sanitize_text_field($request->get_param("id"));
        
            // EDIT CARD
            global $wpdb;
            $wpdb->delete( 'tblPosts', array( 'ID' => $id ), array( '%d' ) );
            // send custom response message as needed...
            // WP will convert as needed to be sent to client
            return array(
                "status"     => "SUCCESS - DELETED POST  ".$id, 
                "method"     => "POST", 
                "message"    => "ENDPOINT: social/v2/edit-card", 
                "parameters" => $parameters
            );
        }
  }

