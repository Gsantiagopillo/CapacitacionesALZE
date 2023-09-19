<?php
require "../conexion.php";
session_start();
$mail = $_POST['email'];
$mail = str_replace(" ", "", $mail);
$passwd = $_POST['passw'];
$session_active = $_POST['sessionActive'];

$sqlLogin = "select * from usuarios where correo='$mail'";
$resultLogin = $mysqli->query($sqlLogin);
$rowLogin = $resultLogin->fetch_assoc();

if ($rowLogin) {

  $paswd = $rowLogin['passw'];

  // $verifyPasw = password_verify($passwd, $paswd);
  $verifyPasw = $paswd === $passwd ? true : false;


  if ($verifyPasw) {
    // genera un ide unico de session y luego lo inserta
    // $prefijo = "id" . $id . "-";
    // $idSession = uniqid($prefijo);
    // $ipCliente = $_SERVER['REMOTE_ADDR'];
    // $dateCreate = date('d-m-Y');


    // mysqli_query($mysqli, "insert into sessions(id,user_id,ip_address,date_create) values ('$idSession','$id','$ipCliente','$dateCreate')");


    $res = array(
      "err" => false,
      ...$rowLogin
    );

    echo json_encode($res);
  } else {
    $res = array(
      "err" => true,
      "causa" => "1",
      "verify" => $verifyPasw,
      "passsend" => $passwd,
      "passSave" => $paswd
    ); // causa=1 contraseña invalida....... causa=2 usuario invalido
    echo json_encode($res);
  }
} else {
  $res = array(
    "err" => true,
    "causa" => "2"
  );
  echo json_encode($res);
}
