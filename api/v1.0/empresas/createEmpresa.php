<?php
require "../conexion.php";
$nombre = $_POST['nombre'];

$sqlempresas = "select nombre from empresas";
$resultempresas = $mysqli->query($sqlempresas);
while ($rowempresas = $resultempresas->fetch_assoc()) {
  if ($rowempresas['nombre'] == $nombre) {
    $res = array(
      "err" => false,
      "insert" => false,
      "statusText" => "nombre ya registrado"
    );

    echo json_encode($res);
    return;
  }
}

if (is_uploaded_file($_FILES['logo']['tmp_name'])) {
  $logo = $_FILES['logo']['name'];
  $ruta = "../../../assets/empresas/$logo";
  copy($_FILES['logo']['tmp_name'], $ruta);
}

$insert = mysqli_query($mysqli, "insert into empresas(nombre, logo) values ('$nombre','$logo')");

$res = array(
  "err" => !$insert,
  "nombre" => $nombre
);

echo json_encode($res);
