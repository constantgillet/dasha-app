<?php

class User{
  
    // database connection and table name
    private $conn;
    private $table_name = "users";
  
    // object properties
    public $id;
    public $full_name;
    public $email;
    public $password;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // Add an user
    function create(){

        
    }

    //Get the id of the last user created
    function get_id() {
        
    }

    //Get the datas from the id
    function get_informations_from_id() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id ORDER BY id DESC LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->full_name = $row['full_name'];
        $this->email = $row['email'];

        return true;
    }
}