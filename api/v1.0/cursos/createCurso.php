<?php
require "../conexion.php";
$nombre = $_POST['nombre'];

$sqlcursos = "select nombre from cursos";
$resultcursos = $mysqli->query($sqlcursos);
while ($rowcursos = $resultcursos->fetch_assoc()) {
  if ($rowcursos['nombre'] == $nombre) {
    $res = array(
      "err" => false,
      "insert" => false,
      "statusText" => "nombre ya registrado"
    );

    echo json_encode($res);
    return;
  }
}

if (is_uploaded_file($_FILES['logo']['tmp_name'])) {
  $logo = $_FILES['logo']['name'];
  $ruta = "../../../assets/cursos/$logo";
  copy($_FILES['logo']['tmp_name'], $ruta);
}

$insert = mysqli_query($mysqli, "insert into cursos(nombre, img_curso) values ('$nombre','$logo')");

$res = array(
  "err" => !$insert,
  "nombre" => $nombre
);

echo json_encode($res);
