<?php
  $jsonfile = file_get_contents('assets/tasks.json');
  $json = json_decode($jsonfile, true);
  $data = $json;
  $position=$_POST['position'];

$input = array(
    'id' =>$_POST['id'],
    'name'=>htmlspecialchars($_POST['name'], ENT_QUOTES),
    'description'=>htmlspecialchars($_POST['description'], ENT_QUOTES)
);

$data["data"][$position]=$input;



$data=json_encode($data,JSON_PRETTY_PRINT);
file_put_contents('assets/tasks.json', $data);


?>