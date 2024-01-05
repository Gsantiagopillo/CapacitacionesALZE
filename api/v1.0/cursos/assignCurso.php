<?php
require "../conexion.php";

$id = $_POST['id'];
$assignTo = $_POST['assignTo'];


if ($assignTo == "EMPRESA") {
  $delete = mysqli_query($mysqli, "delete from curso_empresa where id_empresa='$id'");
  $inactive = mysqli_query($mysqli, "update curso_usuario set type_assign='USUARIO', id_assign='', status_course='0' where id_assign='$id'");

  if (!$delete) {
    $res = array(
      "err" => !$delete,
      "statusText" => "error al validar cursos asignados"
    );

    echo json_encode($res);
  }

  $courses = json_decode($_POST['courses']);

  foreach ($courses as $el) {
    $insert = mysqli_query($mysqli, "insert into curso_empresa(id_curso, id_empresa) values ('$el','$id')");

    $sql1 = "select id, id_empresa from usuarios where id_empresa='$id' ";
    $result1 = $mysqli->query($sql1);
    $usersEmpresa = [];
    while ($row1 = $result1->fetch_assoc())   $usersEmpresa[] = $row1;

    foreach ($usersEmpresa as $el2) {
      $userEmpresa = $el2['id'];
      $sql2 = "select id from curso_usuario where id_estudiante='$userEmpresa' AND id_curso='$el' ";
    }

    // $sqlcursos = "select curso_usuario.id, curso_usuario.id_curso, curso_usuario.id_estudiante from curso_usuario  inner join usuarios on usuarios.id_empresa='$id' inner join curso_usuario on curso_usuario.id_curso='$el'";
    // $resultcursos = $mysqli->query($sqlcursos);
    // $usersWCourse = [];
    // while ($rowcursos = $resultcursos->fetch_assoc())   $usersWCourse[] = $rowcursos;

    // // $exist=


    if (!$insert) {
      $res = array(
        "err" => !$insert,
        "statusText" => "error al asignar cursos"
      );

      echo json_encode($res);
      break;
    }
  }
}
if ($assignTo == "DEPTO") {
  $delete = mysqli_query($mysqli, "delete from curso_departamento where id_departamento='$id'");

  if (!$delete) {
    $res = array(
      "err" => !$delete,
      "statusText" => "error al validar cursos asignados"
    );

    echo json_encode($res);
  }

  $courses = json_decode($_POST['courses']);

  foreach ($courses as $el) {
    $insert = mysqli_query($mysqli, "insert into curso_departamento(id_curso, id_departamento) values ('$el','$id')");

    if (!$insert) {
      $res = array(
        "err" => !$insert,
        "statusText" => "error al asignar cursos"
      );

      echo json_encode($res);
      break;
    }
  }
}
if ($assignTo == "USER") {
  $delete = mysqli_query($mysqli, "delete from curso_usuario where id_estudiante='$id'");

  if (!$delete) {
    $res = array(
      "err" => !$delete,
      "statusText" => "error al validar cursos asignados"
    );

    echo json_encode($res);
  }

  $courses = json_decode($_POST['courses']);

  foreach ($courses as $el) {
    $insert = mysqli_query($mysqli, "insert into curso_usuario(id_curso, id_estudiante) values ('$el','$id')");

    if (!$insert) {
      $res = array(
        "err" => !$insert,
        "statusText" => "error al asignar cursos"
      );

      echo json_encode($res);
      break;
    }
  }
}


$res = array(
  "err" => false,
  "statusText" => "cursos asignados"
);

echo json_encode($res);
