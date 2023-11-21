<?php
require "../conexion.php";

$id = $_POST['id'];


$sqlform = "select * from formulario where id_act= '$id'";
$resultform = $mysqli->query($sqlform);
$array = [];
while ($rowform = $resultform->fetch_assoc())   $array[] = $rowform;

echo json_encode($array);
