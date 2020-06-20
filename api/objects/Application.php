<?php
include_once 'TimelineStep.php';

class Application{
  
    // database connection and table name
    private $conn;
    private $table_name = "applications";
  
    // object properties
    public $id;
    public $campain;
    public $company;
    public $logotype;
    public $timeline = [];

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // Add a application
    function create(){

        // query to insert record
        $query = "INSERT INTO " . $this->table_name . " SET campain=:campain, company=:company, logotype=:logotype";

        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->campain=htmlspecialchars(strip_tags($this->campain));
        $this->company=htmlspecialchars(strip_tags($this->company));
        $this->logotype=htmlspecialchars(strip_tags($this->logotype));

        $stmt->bindParam(':campain', $this->campain);
        $stmt->bindParam(':company', $this->company);
        $stmt->bindParam(':logotype', $this->logotype);
        
        // execute query
        if($stmt->execute()){
            
            //Get the id of the application created
            $this->get_id();

            //Create the first timeline step
            $timeline_step = new Timeline_step($this->conn);
            $timeline_step->application = $this->id;
            $date = new DateTime();
            $timeline_step->date = $date->getTimestamp();
            $timeline_step->create();

            return true;
        }
    
        return false;
    }

    //Get the id of the last application created
    function get_id() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE campain = :campain ORDER BY id DESC LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':campain', $this->campain);
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

        $this->campain = $row['campain'];
        $this->company = $row['company'];
        $this->logotype = $row['logotype'];

        //Get the timeline
        $query = "SELECT id FROM timelines WHERE application = :application ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':application', $this->id);
        $stmt->execute();
        $data = $stmt->fetchAll();

        foreach ($data as $key => $step) {
            $timeline_step = new Timeline_step($this->conn);
            $timeline_step->id = $step['id'];
            $timeline_step->get_informations_from_id();

            array_push($this->timeline, $timeline_step);
        }
        
        return true;
    }
}