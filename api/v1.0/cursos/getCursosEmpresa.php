<?php
require "../conexion.php";

$id = $_POST['id'];

$sqlcursos = "select * from curso_empresa where id_empresa='$id'";
$resultcursos = $mysqli->query($sqlcursos);
$array = [];
while ($rowcursos = $resultcursos->fetch_assoc())   $array[] = $rowcursos;

echo json_encode($array);
