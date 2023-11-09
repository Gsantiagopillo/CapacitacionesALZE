<?php
require "../conexion.php";

$id_actividad = $_POST['idActividad'];
$pregunta = $_POST['pregunta'];
$ans1 = $_POST['ans1'];
$ans2 = $_POST['ans2'];
$ans3 = $_POST['ans3'];
$ansCorrect = $_POST['anscorrect'];
$insertPreg = mysqli_query($mysqli, "insert into formulario(pregunta,resp1,resp2,resp3,respcorr,id_act) values ('$pregunta','$ans1','$ans2','$ans3','$ansCorrect','$id_actividad')");

if (!$insertPreg) {
  $res = array(
    "err" => true,
    "statusText" => "Error al insertar pregunta"
  );
  echo json_encode($res);
  return;
} else {
  $res = array(
    "err" => false,
    "statusText" => "Pregunta Creada"
  );
  echo json_encode($res);
}
