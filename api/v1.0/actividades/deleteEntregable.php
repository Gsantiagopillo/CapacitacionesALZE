<?php
require "../conexion.php";
$id = $_POST['id'];

$delete = mysqli_query($mysqli, "delete from entregables_actividad where id_actividad ='$id'");

$res = array(
  "err" => !$delete
);

echo json_encode($res);
