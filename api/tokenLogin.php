<?php
    include_once './config/database.php';
    include_once './config/core.php';
    include_once './functions.php';
    include_once "./vendor/autoload.php";
    use \Firebase\JWT\JWT;

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    $data = json_decode(file_get_contents("php://input"));

    $response_code = 400;
    $response = array('status' => 'error', 'status_message' =>'Erreurs.');

    //Check if all the data exist
    if(isset($data->token)) {
        
        $token = $data->token;
        
        if (is_valid_token($token)) {
            $token_data = get_token_data($token);

            $query = "SELECT * FROM users WHERE email = :email LIMIT 0,1";

            $stmt = $db->prepare( $query );
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $response_code = 200;
            $response = array('status' => 'success', 'status_message' =>'Tout est ok');

        } else {
            $response_code = 400;
            $response = array('status' => 'error', 'status_message' =>'Token invalide.');
        }          
    } else {
        $response_code = 400;
        $response = array('status' => 'error', 'status_message' =>'Il n y a pas de token.');
    }
    
    http_response_code($response_code);
    echo json_encode($response);