<?php
require "../conexion.php";

$id = $_POST['id'];
$nombre = $_POST['nombre'];

$update = true;

$sqltemas = "select id, nombre from temas";
$resulttemas = $mysqli->query($sqltemas);
while ($rowtemas = $resulttemas->fetch_assoc()) {
  if ($rowtemas['nombre'] == $nombre and $rowtemas['id'] != $id) {
    $res = array(
      "err" => false,
      "update" => false,
      "statusText" => "Tema ya registrado"
    );

    echo json_encode($res);
    return;
  }
}

if (isset($_FILES['logo'])) {
  $logo = $_FILES['logo']['name'];
  $ruta = "../../../assets/temas/$logo";
  copy($_FILES['logo']['tmp_name'], $ruta);

  $update = mysqli_query($mysqli, "update temas set nombre='$nombre',img_tema='$logo' where id=$id");
} else {
  $update = mysqli_query($mysqli, "update temas set nombre='$nombre' where id=$id");
}


$res = array(
  "err" => false,
  "err2" => !$update,
  "nombre" => $nombre
);

echo json_encode($res);
