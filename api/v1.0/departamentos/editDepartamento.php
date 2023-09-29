<?php
require "../conexion.php";
$idEmpresa = $_POST['idEmpresa'];
$idDepartamento = $_POST['id'];
$nombre = $_POST['nombre'];

$sqldeptos = "select nombre from departamentos where id_empresa='$idEmpresa' ";
$resultdeptos = $mysqli->query($sqldeptos);
while ($rowdeptos = $resultdeptos->fetch_assoc()) {
  if ($rowdeptos['nombre'] == $nombre) {
    $res = array(
      "err" => false,
      "update" => false,
      "statusText" => "Departamento ya registrado para esta empresa"
    );

    echo json_encode($res);
    return;
  }
}

$update = mysqli_query($mysqli, "update departamentos set nombre='$nombre' where id=$idDepartamento");

$res = array(
  "err" => !$update,
  "nombre" => $nombre,
  "statusText" => "Departamento actualizado"
);

echo json_encode($res);
