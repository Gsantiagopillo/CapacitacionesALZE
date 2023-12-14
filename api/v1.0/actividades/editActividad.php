<?php
require "../conexion.php";

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$desc = $_POST['descripcion'];

$update = true;

$sqlActividades = "select id, nombre from actividades";
$resultactividades = $mysqli->query($sqlActividades);
while ($rowAct = $resultactividades->fetch_assoc()) {
  if ($rowAct['nombre'] == $nombre and $rowAct['id'] != $id) {
    $res = array(
      "err" => false,
      "update" => false,
      "statusText" => "Actividad ya registrada"
    );

    echo json_encode($res);
    return;
  }
}

if (isset($_FILES['logo'])) {
  $logo = $_FILES['logo']['name'];
  $ruta = "../../../assets/actividades/$logo";
  copy($_FILES['logo']['tmp_name'], $ruta);

  $update = mysqli_query($mysqli, "update actividades set nombre='$nombre',video='$logo', descripcion='$desc' where id=$id");
} else {
  $update = mysqli_query($mysqli, "update actividades set nombre='$nombre', descripcion='$desc' where id=$id");
}


$res = array(
  "err" => false,
  "err2" => !$update,
  "nombre" => $nombre
);

echo json_encode($res);
