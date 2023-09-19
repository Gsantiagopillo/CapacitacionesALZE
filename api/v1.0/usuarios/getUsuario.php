<?php
require "../conexion.php";

$id = $_POST['id'];


$sqlusuario = "select * from usuarios where id= '$id'";
$resultusuario = $mysqli->query($sqlusuario);
$rowusuario = $resultusuario->fetch_assoc();

echo json_encode($rowusuario);
