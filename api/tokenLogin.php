<?php
    include_once './config/database.php';
    include_once './config/core.php';
    include_once './functions.php';
    include_once "./vendor/autoload.php";
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

    $data = json_decode(file_get_contents("php://input"));

    $response_code = 400;
    $response = array('status' => 'error', 'status_message' =>'Erreurs.');

    //Check if all the data exist
    if(isset($data->token)) {
        
        $token = $data->token;

        //test the token
        if(is_valid_token($token)) {

            //Get the token data
            $token_data = get_token_data($token);

            $user_id = $token_data->id;

            $query = "SELECT * FROM users WHERE id = :id LIMIT 0,1";

            $stmt = $db->prepare( $query );
            $stmt->bindParam(':id', $user_id);

            $stmt->execute();
            $num = $stmt->rowCount();

            //if  account is found
            if ($num > 0) {
                
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                //Get the id of the user
                $id = $row['id'];
                $full_name = $row['full_name'];
                $email = $row['email'];

                http_response_code(200);

                $response_code = 200;
                $response = array('status' => 'success', 'status_message' => 'Connecté', 'token' => $token, 'fullName' => $full_name, 'email' => $email, 'campains' => get_user_campains($id));
            } else {
                $response_code = 400;
                $response = array('status' => 'error', 'status_message' =>'Email ou mot de passes invalides.');
            }

        } else {
            $response_code = 400;
            $response = array('status' => 'error', 'status_message' =>'Invalid token');
        }        

    } else {
        $response_code = 400;
        $response = array('status' => 'error', 'status_message' =>'Variables manquantes.');
    }
    
    http_response_code($response_code);
    echo json_encode($response);