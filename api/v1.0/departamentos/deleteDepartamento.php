<?php
require "../conexion.php";
$idDepto = $_POST['id'];

$delete = mysqli_query($mysqli, "delete from departamentos where id='$idDepto'");

$res = array(
  "err" => !$delete,
  "id" => $idDepto
);

echo json_encode($res);
