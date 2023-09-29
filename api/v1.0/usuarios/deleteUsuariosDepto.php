<?php
require "../conexion.php";
$idDepto = $_POST['id'];

$delete = mysqli_query($mysqli, "delete from usuarios where id_departamento ='$idDepto'");

$res = array(
  "err" => !$delete
);

echo json_encode($res);
