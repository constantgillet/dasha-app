<?php

class Campain{
  
    // database connection and table name
    private $conn;
    private $table_name = "campains";
  
    // object properties
    public $id;
    public $owner;
    public $name;
    public $applications;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // Add a campain
    function create(){

        // query to insert record
        $query = "INSERT INTO " . $this->table_name . " SET owner=:owner, name=:name";

        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->owner=htmlspecialchars(strip_tags($this->owner));
        $this->name=htmlspecialchars(strip_tags($this->name));

        $stmt->bindParam(':owner', $this->owner);
        $stmt->bindParam(':name', $this->name);
        
        // execute query
        if($stmt->execute()){
            
            //Get the id of the campain created
            $this->get_id();
            return true;
        }
    
        return false;
    }

    //Get the id of the last campain created
    function get_id() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE owner = :owner ORDER BY id DESC LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':owner', $this->owner);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];
    }

    //Get the datas from the id
    function get_informations_from_id() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id ORDER BY id DESC LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->owner = $row['owner'];
        $this->name = $row['name'];

        //Get the applications of the campain
        $query = "SELECT * FROM applications WHERE campain = :campain ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':campain', $this->id);
        $stmt->execute();
        $data = $stmt->fetchAll();

        $this->applications = [];

        foreach ($data as $key => $application) {
            array_push($this->applications, $application['id']);
        }

        return true;
    }
}