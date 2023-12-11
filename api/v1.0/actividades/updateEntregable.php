<?php
require "../conexion.php";
$id = $_POST['id'];
$name = $_POST['name'];
$desc = $_POST['desc'];

if (isset($_FILES['archivo'])) {
  $archivo = $_FILES['archivo']['name'];
  $ruta = "../../../assets/entregables/actividad/$archivo";
  copy($_FILES['archivo']['tmp_name'], $ruta);
}

$update = mysqli_query($mysqli, "update entregables_actividad set nombre='$nombre', descripcion='$desc',archivo='$archivo' where id=$id");

$res = array(
  "err" => !$update
);

echo json_encode($res);
