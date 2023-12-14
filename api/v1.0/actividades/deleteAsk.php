<?php
require "../conexion.php";
$id = $_POST['id'];

$delete = mysqli_query($mysqli, "delete from formulario where id ='$id'");

$res = array(
  "err" => !$delete
);

echo json_encode($res);
