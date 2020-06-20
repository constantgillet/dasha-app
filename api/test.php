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

     // get database connection
     $database = new Database();
     $db = $database->getConnection();

    $application = new Application($db);
    $application->id = 71;
    $application->get_informations_from_id();
    

    echo '<pre>';
    print_r($application);
    echo '</pre>';
    