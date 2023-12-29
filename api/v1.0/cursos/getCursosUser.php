<?php
require "../conexion.php";

$id = $_POST['id'];

$array = [];
$sqlcursos = "select * from curso_usuario where id_estudiante='$id'";
$resultcursos = $mysqli->query($sqlcursos);
$array = [];
while ($rowcursos = $resultcursos->fetch_assoc())   $array[] = $rowcursos;

echo json_encode($array);


// $sqlcursos = "select * from curso_usuario where id_estudiante='$id'";

//  SELECT usuarios.id ,curso_usuario.id_curso, curso_departamento.id_curso, curso_empresa.id_curso FROM `usuarios` LEFT JOIN curso_usuario ON curso_usuario.id_estudiante=usuarios.id LEFT JOIN curso_departamento on curso_departamento.id_departamento=usuarios.id_departamento LEFT JOIN curso_empresa on curso_empresa.id_empresa = usuarios.id_empresa where usuarios.id=12;