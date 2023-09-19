<?php
require "../conexion.php";

$id = $_POST['id'];


$sqldepto = "select * from departamentos where id= '$id'";
$resultdepto = $mysqli->query($sqldepto);
$rowdepto = $resultdepto->fetch_assoc();

echo json_encode($rowdepto);
