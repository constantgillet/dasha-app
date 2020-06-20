<?php
    include_once './config/database.php';
    include_once './config/core.php';
    // instantiate Campain object
    include_once './objects/Campain.php';
    // instantiate TimelineStep object
    include_once './objects/TimelineStep.php';
    // instantiate Application object
    include_once './objects/Application.php';
    include_once './functions.php';
    include_once './vendor/autoload.php';
    use \Firebase\JWT\JWT;

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Max-Age: 3600');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    $campain = new Campain($db);
    $application = new Application($db);
    $timeline_step = new Timeline_step($db);

    $data = json_decode(file_get_contents('php://input'));

    $response_code = 400;
    $response = array('status' => 'error', 'status_message' =>'Erreurs.');

    //Check if all the data exist
    if(isset($data->token) && isset($data->applicationId) && isset($data->title) && isset($data->color) && isset($data->daysToNotify)) {
        
        $token = $data->token;
        $application->id = $data->applicationId;
        $application->get_informations_from_id();

        $timeline_step->application = $data->applicationId;
        $timeline_step->title = $data->title;
        $timeline_step->color = $data->color;

        $days_to_notify = $data->daysToNotify;
        $days_to_notify = $days_to_notify == '' ? null : $days_to_notify;

        //Set date
        $date = new DateTime();
        $timeline_step->date = $date->getTimestamp();

        $campain->id = $application->campain;
        $campain->get_informations_from_id();

        //We control the length of the title
        if (strlen($timeline_step->title) > 3 && strlen($timeline_step->title) < 30) {

            if($timeline_step->color == 'primary' || $timeline_step->color == 'secondary' || $timeline_step->color == 'danger' || $timeline_step->color == 'info' || $timeline_step->color == 'success') {

                if((is_numeric($days_to_notify) && $days_to_notify >= 0) || $days_to_notify == null) {

                    //Calculate the notify date
                    if(is_numeric($days_to_notify)) {
                        $days_to_notify = (int)$days_to_notify;
                        $timeline_step->notify_date = $timeline_step->date + ($days_to_notify * 86400);
                    }

                    //test the token
                    if(is_valid_token($token)) {

                        //Get the token data
                        $token_data = get_token_data($token);

                        //We test if the user own the campain
                        if($token_data->id == $campain->owner) {

                            if($timeline_step->create()) {
                                $response_code = 201;
                                $response = array('status' => 'success', 'status_message' => 'Added !');
                            } else {
                                $response_code = 503;
                                $response = array('status' => 'error', 'status_message' =>'Something wrong happenned.');
                            }                                                               
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
                    $response = array('status' => 'error', 'status_message' =>'Notify date is invalid');
                }
            }else {
                $response_code = 400;
                $response = array('status' => 'error', 'status_message' =>'Wrong color.');
            }
        } else {
            $response_code = 400;
            $response = array('status' => 'error', 'status_message' =>'La longueur du titre est invalide');
        }        
    } else {
        $response_code = 400;
        $response = array('status' => 'error', 'status_message' =>'Variables manquantes.');
    }
    
    http_response_code($response_code);
    echo json_encode($response);