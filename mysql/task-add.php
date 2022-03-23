<?php
include('database.php');

if(isset($_POST['name'])){
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES)  ;
    $description =htmlspecialchars($_POST['description'], ENT_QUOTES) ;
    $query = "INSERT into task (name, description) VALUES ('$name', '$description')";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Query failed');
    }
    echo 'Task Added Successfully';

}

?>