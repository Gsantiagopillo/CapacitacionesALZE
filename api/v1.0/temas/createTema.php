<?php
require "../conexion.php";
$curso = $_POST['idCurso'];
$nombre = $_POST['tema'];

$sqltemas = "select nombre from temas where id_curso=$curso";
$resulttemas = $mysqli->query($sqltemas);
$array = [];
while ($rowtemas = $resulttemas->fetch_assoc()) {
  if ($rowtemas['nombre'] == $nombre) {
    //$array[] = $rowusers['correo'];
    $res = array(
      "err" => false,
      "insert" => false,
      "statusText" => "tema ya registrado para este curso"
    );

    echo json_encode($res);
    return;
  }
}

if (is_uploaded_file($_FILES['img']['tmp_name'])) {
  $logo = $_FILES['img']['name'];
  $ruta = "../../../assets/temas/$logo";
  copy($_FILES['img']['tmp_name'], $ruta);
}


$insert = mysqli_query($mysqli, "insert into temas(nombre, img_tema, id_curso) values ('$nombre','$logo','$curso')");

$res = array(
  "err" => !$insert,
  "nombre" => $nombre
);

echo json_encode($res);
