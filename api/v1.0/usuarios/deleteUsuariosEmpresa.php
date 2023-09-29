<?php
require "../conexion.php";
$idEmpresa = $_POST['id'];

$delete = mysqli_query($mysqli, "delete from usuarios where id_empresa ='$idEmpresa'");

$res = array(
  "err" => !$delete
);

echo json_encode($res);
