<?php
    // include database
    include_once './config/database.php';
    
    // include functions
    include_once 'functions.php';

    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    // Get data from json post
    $data = json_decode(file_get_contents("php://input"));

    $response_code = 400;

    //Check if all the data exist
    if(isset($data->fullName) && isset($data->email) && isset($data->password)) {
        
        $full_name = $data->fullName;
        $email = $data->email;
        $password = sha1($data->password);

        //test full name length
        if(strlen($full_name) > 4 && strlen($full_name) < 25) {
            
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

                if (is_email_already_used($email) == false) {

                    $query = "INSERT INTO users SET full_name = :full_name, email = :email, password = :password";

                    $stmt = $db->prepare($query);
                    $stmt->bindParam(':full_name', $full_name);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':password', $password);

                    if($stmt->execute()){
                        $response_code = 200;
                        $response = array('status' => 'success', 'status_message' =>'Le client a bien été enregistré');
                    }
                    else{
                        $response_code = 400;
                        $response = array('status' => 'error', 'status_message' =>'Erreur');
                    }
                } else {
                    $response_code = 400;
                    $response = array('status' => 'error', 'status_message' =>'Email déjà enregistré');
                }
            } else {
                $response_code = 400;
                $response = array('status' => 'error', 'status_message' =>'Email invalide');
            }   

        } else {
            $response_code = 400;
            $response = array('status' => 'error', 'status_message' =>'Le fullname est trop long ou trop court.');
        }

    } else {
        $response_code = 400;
        $response = array('status' => 'error', 'status_message' =>'Variables manquantes.');
    }
    
    http_response_code($response_code);
    echo json_encode($response);