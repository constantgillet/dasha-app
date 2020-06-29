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

     echo '<pre>';
     print_r(is_email_already_used('rider.constant@gmail.com'));
     echo '</pre>';