<?php
require "../conexion.php";

$id = $_POST['id'];


$sqltema = "select * from temas where id= '$id'";
$resulttema = $mysqli->query($sqltema);
$rowtema = $resulttema->fetch_assoc();

echo json_encode($rowtema);
