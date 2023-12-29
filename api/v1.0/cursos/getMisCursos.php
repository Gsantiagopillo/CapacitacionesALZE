<?php
require "../conexion.php";

$id = $_POST['id'];

$array = [];

$sqlcursos = "select * from curso_usuario where id_estudiante='$id'";
$resultcursos = $mysqli->query($sqlcursos);
while ($rowcursos = $resultcursos->fetch_assoc())   $array[] = $rowcursos;

$sqlusuario = "select * from usuarios where id= '$id'";
$resultusuario = $mysqli->query($sqlusuario);
$rowusuario = $resultusuario->fetch_assoc();
$id_depto = $rowusuario['id_departamento'];
$id_empresa = $rowusuario['id_empresa'];

$sqlcursos = "select * from curso_departamento where id_departamento='$id_depto'";
$resultcursos = $mysqli->query($sqlcursos);
while ($rowcursos = $resultcursos->fetch_assoc())   $array[] = $rowcursos;

$sqlcursos = "select * from curso_empresa where id_empresa='$id_empresa'";
$resultcursos = $mysqli->query($sqlcursos);
while ($rowcursos = $resultcursos->fetch_assoc())   $array[] = $rowcursos;

echo json_encode($array);


// $sqlcursos = "select * from curso_usuario where id_estudiante='$id'";

//  SELECT usuarios.id ,curso_usuario.id_curso, curso_departamento.id_curso, curso_empresa.id_curso FROM `usuarios` LEFT JOIN curso_usuario ON curso_usuario.id_estudiante=usuarios.id LEFT JOIN curso_departamento on curso_departamento.id_departamento=usuarios.id_departamento LEFT JOIN curso_empresa on curso_empresa.id_empresa = usuarios.id_empresa where usuarios.id='$id';