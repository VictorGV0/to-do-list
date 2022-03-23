<?php
 include('database.php');
 $id = htmlspecialchars($_POST['id'], ENT_QUOTES)  ;
 $name = htmlspecialchars($_POST['name'], ENT_QUOTES)  ;
 $description =htmlspecialchars($_POST['description'], ENT_QUOTES) ;

   $query = "UPDATE task SET name ='$name', description = '$description' WHERE id = '$id'";
    $result = mysqli_query($connection, $query);
    if(!$result) {
        die('Query failed');
    }
    echo 'Task Updated Successfully';
?>