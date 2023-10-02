<?php
require "../conexion.php";

$sqltemas = "select * from temas ";
$resulttemas = $mysqli->query($sqltemas);
$array = [];
while ($rowtemas = $resulttemas->fetch_assoc())   $array[] = $rowtemas;

echo json_encode($array);
