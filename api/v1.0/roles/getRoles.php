<?php
require "../conexion.php";

$sqlroles = "select * from roles";
$resultroles = $mysqli->query($sqlroles);
$array = [];
while ($rowroles = $resultroles->fetch_assoc())   $array[] = $rowroles;

echo json_encode($array);
