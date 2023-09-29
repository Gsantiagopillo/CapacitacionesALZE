<?php
require "../conexion.php";
$idUsuario = $_POST['idUsuario'];
$idEmpresa = $_POST['empresa'];
$idDepartamento = $_POST['departamento'];
$nombre = $_POST['nombre'];
$apellidoPaterno = $_POST['apellidoPaterno'];
$apellidoMaterno = $_POST['apellidoMaterno'];
$puesto = $_POST['puesto'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];
$typeUser = $_POST['tipo'];

$sqlusers = "select id, correo from usuarios";
$resultusers = $mysqli->query($sqlusers);
//$array = [];
while ($rowusers = $resultusers->fetch_assoc()) {
  if ($rowusers['correo'] == $correo and $rowusers['id'] != $idUsuario) {
    //$array[] = $rowusers['correo'];
    $res = array(
      "err" => false,
      "insert" => false,
      "statusText" => "correo ya registrado para otro usuario"
    );

    echo json_encode($res);
    return;
  }
}

if (isset($_POST['passw'])) {
  $passw = $_POST['passw'];
  $passw = password_hash($passw, PASSWORD_DEFAULT);

  $update = mysqli_query($mysqli, "update usuarios set nombre='$nombre',apellido_paterno='$apellidoPaterno', apellido_materno='$apellidoMaterno', correo='$correo', passw='$passw',id_empresa='$idEmpresa', id_departamento='$idDepartamento', puesto='$puesto',telefono='$telefono', id_rol='$typeUser'  where id=$idUsuario");

  $res = array(
    "err" => !$update,
    "nombre" => $nombre
  );

  echo json_encode($res);
} else {
  $update = mysqli_query($mysqli, "update usuarios set nombre='$nombre',apellido_paterno='$apellidoPaterno', apellido_materno='$apellidoMaterno', correo='$correo',id_empresa=$idEmpresa, id_departamento=$idDepartamento, puesto='$puesto',telefono='$telefono', id_rol=$typeUser  where id=$idUsuario");

  $res = array(
    "err" => !$update,
    "nombre" => $nombre
  );

  echo json_encode($res);
}
