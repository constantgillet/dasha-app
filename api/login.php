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
    if(isset($data->email) && isset($data->password)) {
        
        $email = $data->email;
        $password = sha1($data->password);

        //test the email
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

            $query = "SELECT * FROM users WHERE email = :email AND password = :password LIMIT 0,1";

            $stmt = $db->prepare( $query );
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->execute();
            $num = $stmt->rowCount();

            //if  account is found
            if ($num > 0) {
                
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                //Get the id of the user
                $id = $row['id'];
                $full_name = $row['full_name'];

                $token = array(
                    "iss" => $iss,
                    "aud" => $aud,
                    "iat" => $iat,
                    "nbf" => $nbf,
                    "data" => array(
                        "id" => $id,
                        "email" => $email
                    )
                );

                http_response_code(200);

                $jwt = JWT::encode($token, $secret_key);

                $response_code = 200;
                $response = array('status' => 'success', 'status_message' => 'Connecté', 'token' => $jwt, 'fullName' => $full_name, 'email' => $email, 'campains' => get_user_campains($id));
            } else {
                $response_code = 400;
                $response = array('status' => 'error', 'status_message' =>'Email ou mot de passes invalides.');
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