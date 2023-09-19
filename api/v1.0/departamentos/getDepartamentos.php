<?php
require "../conexion.php";

$sqldepartamentos = "select * from departamentos order by nombre asc";
$resultdepartamentos = $mysqli->query($sqldepartamentos);
$array = [];
while ($rowdepartamentos = $resultdepartamentos->fetch_assoc())   $array[] = $rowdepartamentos;

echo json_encode($array);
