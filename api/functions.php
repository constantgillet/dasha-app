<?php

    // include database
    require_once './config/database.php';
    include_once './config/core.php';
    require "./vendor/autoload.php";
    use \Firebase\JWT\JWT;

    //Check if the email is already used 
    function is_email_already_used($email) {
        
        // instantiate database
        $database = new Database();
        $db = $database->getConnection();

        $query = "SELECT id FROM users WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $number_of_rows = $stmt->fetchColumn();

        if($number_of_rows > 0) {
            return true;
        } else {
            return false;
        }
    }

    //Function to check a token
    function is_valid_token($token) {
        global $secret_key;
        
        if($token) {
            try {
 
                // decode jwt
                $decoded = JWT::decode($token, $secret_key, array('HS256'));
         
                return true;

            } // if decode fails, it means jwt is invalid

            catch (Exception $e){
                return false;
            }
        }
    }

    //Get data array
    function get_token_data($token){
        global $secret_key;

        // decode jwt
        $decoded = JWT::decode($token, $secret_key, array('HS256'));

        return $decoded->data;
    }

    //Get campain array of the user
    function get_user_campains($owner){
        // instantiate database
        $database = new Database();
        $db = $database->getConnection();

        $query = "SELECT * FROM campains WHERE owner = :owner ORDER BY id DESC";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':owner', $owner);
        $stmt->execute();
        $data = $stmt->fetchAll();

        $campains = [];

        foreach ($data as $key => $campain) {
            array_push($campains, ['id' => $campain['id'], 'name' => $campain['name']]);
        }

        return $campains;
    }