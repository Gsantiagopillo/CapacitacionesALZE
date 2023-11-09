<?php
require "../conexion.php";
$idTema = $_POST['idTema'];
$actividad = $_POST['actividad'];
$descAct = $_POST['descAct'];
$logo = '';
if (is_uploaded_file($_FILES['videoAct']['tmp_name'])) {
  $logo = $_FILES['videoAct']['name'];
  $ruta = "../../../assets/actividades/$logo";
  copy($_FILES['videoAct']['tmp_name'], $ruta);
}

$insertAct = mysqli_query($mysqli, "insert into actividades(nombre, video,descripcion,id_tema) values ('$actividad','$logo','$descAct','$idTema')");


if (!$insertAct) {
  $res = array(
    "err" => true,
    "stausText" => "Error al insertar Actividad"
  );
  echo json_encode($res);
  return;
}

$sqlact = "select id from actividades order by id desc limit 1";
$resultact = $mysqli->query($sqlact);
$rowact = $resultact->fetch_assoc();

$id_actividad = $rowact['id'];

$res = array(
  "err" => false,
  "actividad" => $id_actividad
);

echo json_encode($res);
