<?php
require "../conexion.php";

$id = $_POST['id'];
$assignTo = $_POST['assignTo'];
$aux = 0;

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
      $aux = "$userEmpresa-$el";
      $sql2 = "select id from curso_usuario where id_estudiante='$userEmpresa' AND id_curso='$el' ";
      $result2 = $mysqli->query($sql2);
      $row2 = $result2->fetch_assoc();

      if ($row2) {
        $idRow = $row2['id'];
        $update = mysqli_query($mysqli, "update curso_usuario set type_assign='EMPRESA', id_assign='$id', status_course='1' where id=$idRow");

        if (!$update) {
          $res = array(
            "err" => !$update,
            "statusText" => "error al asignar cursos"
          );

          echo json_encode($res);
          // break;
        }
      } else {
        $insert = mysqli_query($mysqli, "insert into curso_usuario(id_curso,id_estudiante,type_assign,id_assign,status_course) values ('$el','$userEmpresa','EMPRESA','$id','1' )");

        if (!$insert) {
          $res = array(
            "err" => !$insert,
            "statusText" => "error al asignar cursos"
          );

          echo json_encode($res);
          // break;
        }
      }
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
  "aux" => $aux,
  "statusText" => "cursos asignados"
);

echo json_encode($res);
