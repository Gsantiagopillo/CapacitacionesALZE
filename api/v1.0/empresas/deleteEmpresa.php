<?php
require "../conexion.php";
$idEmpresa = $_POST['id'];

$delete = mysqli_query($mysqli, "delete from empresas where id='$idEmpresa'");

$res = array(
  "err" => !$delete,
  "id" => $idEmpresa
);

echo json_encode($res);
