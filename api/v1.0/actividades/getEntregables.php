<?php
require "../conexion.php";

$id = $_POST['id'];


$sqlent = "select * from entregables_actividad where id_actividad= '$id'";
$resultent = $mysqli->query($sqlent);
$array = [];
while ($rowent = $resultent->fetch_assoc())   $array[] = $rowent;

echo json_encode($array);
