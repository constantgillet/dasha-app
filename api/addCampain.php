<?php
    include_once './config/database.php';
    include_once './config/core.php';
    include_once './functions.php';
    // instantiate Campain object
    include_once './objects/Campain.php';
    include_once './vendor/autoload.php';
    use \Firebase\JWT\JWT;

    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    $campain = new Campain($db);

    $data = json_decode(file_get_contents('php://input'));

    $response_code = 400;
    $response = array('status' => 'error', 'status_message' =>'Erreurs.');

    //Check if all the data exist
    if(isset($data->token) && isset($data->campainName)) {
        
        $token = $data->token;
        $campain->name = $data->campainName;

        //test the token
        if(is_valid_token($token)) {

            //Get the token data
            $token_data = get_token_data($token);
            $campain->owner = $token_data->id;

            //Create the new campain
            if($campain->create()){

                $response_code = 201;
                $response = array('status' => 'success', 'status_message' => 'Tout est ok', 'campain_id' => $campain->id);

            } else {
                $response_code = 503;
                $response = array('status' => 'error', 'status_message' => 'Service unavailable');
            }   
        } else {
            $response_code = 400;
            $response = array('status' => 'error', 'status_message' =>'Email invalide');
        }        

    } else {
        $response_code = 400;
        $response = array('status' => 'error', 'status_message' =>'Variables manquantes.');
    }
    
    http_response_code($response_code);
    echo json_encode($response);