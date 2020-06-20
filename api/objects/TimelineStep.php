<?php

class Timeline_step{
  
    // database connection and table name
    private $conn;
    private $table_name = "timelines";
  
    // object properties
    public $id;
    public $application;
    public $title = 'Ajout de la candidature';
    public $color = 'info';
    public $text;
    public $date;
    public $notify_date;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // Add a step
    function create(){

        // query to insert record
        $query = "INSERT INTO " . $this->table_name . " SET application=:application, title=:title, color=:color, text=:text, date=:date, notify_date=:notify_date";

        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->application=htmlspecialchars(strip_tags($this->application));
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->color=htmlspecialchars(strip_tags($this->color));
        $this->text=htmlspecialchars(strip_tags($this->text));

        //$this->text = $this->text != '' ? $this->text : NULL;
        $this->notify_date = $this->notify_date != '' ? $this->notify_date : NULL;

        $stmt->bindParam(':application', $this->application);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':color', $this->color);
        $stmt->bindParam(':text', $this->text);
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':notify_date', $this->notify_date);
        
        // execute query
        if($stmt->execute()){
            
            //Get the id of the timelineStep created
            $this->get_id();

            return true;
        }
    
        return false;
    }

    //Get the id of the last application created
    function get_id() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE application = :application ORDER BY id DESC LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':application', $this->application);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];

    }

    //Update datas of the timeline step
    function update() {
        // query to insert record
        $query = "UPDATE " . $this->table_name . " SET application=:application, title=:title, color=:color, text=:text, date=:date, notify_date=:notify_date WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->application=htmlspecialchars(strip_tags($this->application));
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->color=htmlspecialchars(strip_tags($this->color));
        $this->text=htmlspecialchars(strip_tags($this->text));

        //$this->text = $this->text != '' ? $this->text : NULL;
        $this->notify_date = $this->notify_date != '' ? $this->notify_date : NULL;

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':application', $this->application);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':color', $this->color);
        $stmt->bindParam(':text', $this->text);
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':notify_date', $this->notify_date);
        
        // execute query
        if($stmt->execute()){

            return true;
        }
    
        return false;
    }

    //Get the datas from the id
    function get_informations_from_id() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id ORDER BY id DESC LIMIT 1";

        $stmt = $this->conn->prepare($query);

        $this->id=htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->application = $row['application'];
        $this->title = $row['title'];
        $this->color = $row['color'];
        $this->text = $row['text'];
        $this->date = $row['date'];
        $this->notify_date = $row['notify_date'];
        
        return true;
    }
}