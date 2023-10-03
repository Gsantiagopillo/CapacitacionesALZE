<?php
require "../conexion.php";

$id = $_POST['id'];
$nombre = $_POST['nombre'];

$update = true;

$sqlcursos = "select id, nombre from cursos";
$resultcursos = $mysqli->query($sqlcursos);
while ($rowcursos = $resultcursos->fetch_assoc()) {
  if ($rowcursos['nombre'] == $nombre and $rowcursos['id'] != $id) {
    $res = array(
      "err" => false,
      "update" => false,
      "statusText" => "Curso ya registrado"
    );

    echo json_encode($res);
    return;
  }
}

if (isset($_FILES['logo'])) {
  $logo = $_FILES['logo']['name'];
  $ruta = "../../../assets/cursos/$logo";
  copy($_FILES['logo']['tmp_name'], $ruta);

  $update = mysqli_query($mysqli, "update cursos set nombre='$nombre',img_curso='$logo' where id=$id");
} else {
  $update = mysqli_query($mysqli, "update cursos set nombre='$nombre' where id=$id");
}


$res = array(
  "err" => false,
  "err2" => !$update,
  "nombre" => $nombre
);

echo json_encode($res);
