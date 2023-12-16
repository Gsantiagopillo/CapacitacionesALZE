<?php
require "../conexion.php";

$sqlcursos = "select * from curso_usuario where id_estudiante='$id'";
$resultcursos = $mysqli->query($sqlcursos);
$array = [];
while ($rowcursos = $resultcursos->fetch_assoc())   $array[] = $rowcursos;

echo json_encode($array);
