<?php
require "../conexion.php";


$nombreEnt = $_POST['nombre'];
$descEnt = $_POST['desc'];
$id_actividad = $_POST['idActividad'];


if (is_uploaded_file($_FILES['file']['tmp_name'])) {
  $fileEnt = $_FILES['file']['name'];
  $ruta = "../../../assets/entregables/actividad/$fileEnt";
  copy($_FILES['file']['tmp_name'], $ruta);
}


$insertEntregable = mysqli_query($mysqli, "insert into entregables_actividad(nombre, descripcion, archivo, id_actividad) values ('$nombreEnt','$descEnt','$fileEnt','$id_actividad')");

if (!$insertEntregable) {
  $res = array(
    "err" => true,
    "stausText" => "Error al insertar Entregable"
  );
  echo json_encode($res);
} else {

  $res = array(
    "err" => false,
    "statusText" => "entregable Creado"
  );
  echo json_encode($res);
}
