<?php
require "../conexion.php";

$sqlusers = "select * from usuarios order by id_empresa,id_departamento,nombre ";
$resultusers = $mysqli->query($sqlusers);
$array = [];
while ($rowusers = $resultusers->fetch_assoc())   $array[] = $rowusers;


echo json_encode($array);
