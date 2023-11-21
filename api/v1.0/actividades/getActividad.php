<?php
require "../conexion.php";

$id = $_POST['id'];


$sqlact = "select * from actividades where id= '$id'";
$resultact = $mysqli->query($sqlact);
$rowact = $resultact->fetch_assoc();

echo json_encode($rowact);
