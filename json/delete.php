<?php

  $jsonfile = file_get_contents('assets/tasks.json');
  $json = json_decode($jsonfile, true);
  $data = $json;
  $position=$_POST['position'];

  

  array_splice($data["data"],$position,1);
  // unset($data["data"][$position]);

  // $data=json_encode($data,JSON_PRETTY_PRINT);
  file_put_contents('assets/tasks.json', json_encode($data,JSON_PRETTY_PRINT));

  echo 'Deleted Successfully'

?>