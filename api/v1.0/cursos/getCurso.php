<?php
require "../conexion.php";

$id = $_POST['id'];


$sqlcurso = "select * from cursos where id= '$id'";
$resultcurso = $mysqli->query($sqlcurso);
$rowcurso = $resultcurso->fetch_assoc();

echo json_encode($rowcurso);
