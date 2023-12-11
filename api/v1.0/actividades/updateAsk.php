<?php
require "../conexion.php";
$id = $_POST['id'];
$name = $_POST['name'];
$ans1 = $_POST['ans1'];
$ans2 = $_POST['ans2'];
$ans3 = $_POST['ans3'];
$ansC = $_POST['ansC'];

$update = mysqli_query($mysqli, "update formulario set pregunta='$name', resp1='$ans1',resp2='$ans2', resp3='$ans3', respcorr='$ansC' where id=$id");

$res = array(
  "err" => !$update
);

echo json_encode($res);
