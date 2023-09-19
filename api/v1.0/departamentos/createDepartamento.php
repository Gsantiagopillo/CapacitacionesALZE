<?php
require "../conexion.php";
$nombre = $_POST['nombre'];
$empresa = $_POST['empresa'];

$sqldepartamentos = "select nombre from departamentos where id_empresa=$empresa";
$resultdepartamentos = $mysqli->query($sqldepartamentos);
$array = [];
while ($rowdepartamentos = $resultdepartamentos->fetch_assoc()) {
  if ($rowdepartamentos['nombre'] == $nombre) {
    //$array[] = $rowusers['correo'];
    $res = array(
      "err" => false,
      "insert" => false,
      "statusText" => "departamento ya registrado para esa empresa"
    );

    echo json_encode($res);
    return;
  }
}


$insert = mysqli_query($mysqli, "insert into departamentos(nombre, id_empresa) values ('$nombre','$empresa')");

$res = array(
  "err" => !$insert,
  "nombre" => $nombre
);

echo json_encode($res);
