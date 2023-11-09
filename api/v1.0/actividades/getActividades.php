<?php
require "../conexion.php";

$tema = $_POST['idTema'];

$sqlactivities = "select * from actividades where id_tema='$tema' ";
$resultactivities = $mysqli->query($sqlactivities);
$array = [];
while ($rowactivities = $resultactivities->fetch_assoc())   $array[] = $rowactivities;

echo json_encode($array);
