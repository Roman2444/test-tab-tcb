<?php

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (json_last_error() === JSON_ERROR_NONE) {
    return true;
} else {
    return false;
}

?>