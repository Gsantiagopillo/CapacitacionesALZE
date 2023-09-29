<?php
require "../conexion.php";
$idEmpresa = $_POST['empresa'];
$idDepartamento = $_POST['departamento'];
$nombre = $_POST['nombre'];
$apellidoPaterno = $_POST['apellidoPaterno'];
$apellidoMaterno = $_POST['apellidoMaterno'];
$puesto = $_POST['puesto'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];
$passw = $_POST['passw'];
$typeUser = $_POST['tipo'];

$sqlusers = "select correo from usuarios";
$resultusers = $mysqli->query($sqlusers);
//$array = [];
while ($rowusers = $resultusers->fetch_assoc()) {
  if ($rowusers['correo'] == $correo) {
    //$array[] = $rowusers['correo'];
    $res = array(
      "err" => false,
      "insert" => false,
      "statusText" => "correo ya registrado"
    );

    echo json_encode($res);
    return;
  }
}


$passw = password_hash($passw, PASSWORD_DEFAULT);

$insert = mysqli_query($mysqli, "insert into usuarios(nombre, apellido_paterno, apellido_materno, correo,passw,id_empresa,id_departamento,puesto,telefono,id_rol) values ('$nombre','$apellidoPaterno','$apellidoMaterno','$correo','$passw','$idEmpresa','$idDepartamento','$puesto','$telefono','$typeUser')");

$res = array(
  "err" => !$insert,
  "nombre" => $nombre,
  "apellido" => $apellidoPaterno
);

echo json_encode($res);
