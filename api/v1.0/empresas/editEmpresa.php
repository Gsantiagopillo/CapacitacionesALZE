<?php
require "../conexion.php";

$id = $_POST['id'];
$nombre = $_POST['nombre'];

$sqlempresas = "select nombre from empresas";
$resultempresas = $mysqli->query($sqlempresas);
while ($rowempresas = $resultempresas->fetch_assoc()) {
  if ($rowempresas['nombre'] == $nombre) {
    $res = array(
      "err" => false,
      "update" => false,
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

  $update = mysqli_query($mysqli, "update empresas set nombre='$nombre',logo='$logo' where id=$id");
} else {
  $update = mysqli_query($mysqli, "update empresas set nombre='$nombre' where id=$id");
}


$res = array(
  "err" => !$update,
  "nombre" => $nombre
);

echo json_encode($res);
