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
    header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header('Content-Type: application/json');
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == "OPTIONS") {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
        header("HTTP/1.1 200 OK");
    die();
    }
    
    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    $campain = new Campain($db);

    $data = json_decode(file_get_contents('php://input'));

    $response_code = 400;
    $response = array('status' => 'error', 'status_message' =>'Erreurs.');

    if(isset($_GET['token']) && isset($_GET['campain'])) {
        $campain->id = $_GET['campain'];
        $token = $_GET['token'];

        $campain->get_informations_from_id();
        
        //test the token
        if(is_valid_token($token)) {

            //Get the token data
            $token_data = get_token_data($token);

            //We test if the user own the campain
            if($token_data->id == $campain->owner) {
        
                $applications = [];

                foreach ($campain->applications as $key => $application_id) {
                    $application_object = new Application($db);

                    $application_object->id = $application_id;
                    $application_object->get_informations_from_id();

                    $last_timeline_step = [
                        'title' => $application_object->timeline[0]->title,
                        'color' => $application_object->timeline[0]->color
                    ];

                    $application = [
                        'id' => $application_object->id,
                        'campain' => $application_object->campain,
                        'company' => $application_object->company,
                        'logotype' => $application_object->logotype,
                        'lastTimelineStep' => $last_timeline_step
                    ];

                    array_push($applications, $application);
                }

                //Send the success
                $response_code = 201;
                $response = array('status' => 'success', 'applications' => $applications);
 
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