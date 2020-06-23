<?php
    include_once './config/database.php';
    include_once './config/core.php';
    // instantiate Campain object
    include_once './objects/Campain.php';
    // instantiate Application object
    include_once './objects/Application.php';
    include_once './functions.php';
    include_once './vendor/autoload.php';
    use \Firebase\JWT\JWT;

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Max-Age: 3600');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    $campain = new Campain($db);
    $application = new Application($db);

    $data = json_decode(file_get_contents('php://input'));

    $response_code = 400;
    $response = array('status' => 'error', 'status_message' =>'Erreurs.');

    //Check if all the data exist
    if(isset($_GET['token']) && isset($_GET['application'])) {
        
        $token = $_GET['token'];
        $application->id = $_GET['application'];
        

        $application->get_informations_from_id();
        $campain->id = $application->campain;
        $campain->get_informations_from_id();

        //test the token
        if(is_valid_token($token)) {
            //Get the token data
            $token_data = get_token_data($token);

            //We test if the user own the campain
            if($token_data->id == $campain->owner) {
                
                $campain_data = [
                    'id' => $campain->id,
                    'name' => $campain->name
                ];

                $application_data = [
                    'company' => $application->company,
                    'logotype' => $application->logotype
                ];

                $response_code = 201;
                $response = array('status' => 'success', 'campain' => $campain_data, 'application' => $application_data);
                
            }  else {
                $response_code = 400;
                $response = array('status' => 'error', 'status_message' =>'Invalid token, you don t own the campain.');
            }
        } else {
            $response_code = 400;
            $response = array('status' => 'error', 'status_message' =>'Invalid token.');
        }      
    } else {
        $response_code = 400;
        $response = array('status' => 'error', 'status_message' =>'Variables manquantes.');
    }
    
    http_response_code($response_code);
    echo json_encode($response);