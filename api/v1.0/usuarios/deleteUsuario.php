<?php
require "../conexion.php";
$idUsuario = $_POST['id'];

$delete = mysqli_query($mysqli, "delete from usuarios where id ='$idUsuario'");

$res = array(
  "err" => !$delete,
  "id" => $idUsuario
);

echo json_encode($res);
