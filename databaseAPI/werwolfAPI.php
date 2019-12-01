<?php

header("Access-Control-Allow-Origin: *");

$playername = $_POST["newPlayerName"];

if($playername == "") {
    echo "Should not be non-empty.";
    break;
}



$con = mysqli_connect("dbAddress", "dbUser", "userPwd", "TableName");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$stmt = $con->prepare("INSERT INTO players (name) VALUES (?)");
$stmt->bind_param('s', $playername);

if ($stmt->execute() === TRUE) {
    echo "Success!";
} else {
    echo "Error:". $con->error;
}
?>
