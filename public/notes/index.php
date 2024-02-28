<?php

function decode($str)
{
    $asArray = true;
    $depth = 512;
    $fdata = rawurldecode($str);

    return json_decode($fdata, $asArray, $depth, JSON_THROW_ON_ERROR);
}

function encode($obj)
{
    return json_encode($obj, JSON_UNESCAPED_UNICODE);
}

if (!session_id()) {
    session_start();
}

if (!isset($_SESSION["nextId"])) {
    $notes = [];
    $nextId = 1;
} else {
    $notes = decode($_SESSION["notes"] ?? "[]");
    $nextId = intval($_SESSION["nextId"]);
}

$isPOST = $_SERVER["REQUEST_METHOD"] == "POST";
$isDELETE = $_SERVER["REQUEST_METHOD"] == "DELETE";

if ($isPOST) {
    $input = file_get_contents("php://input");
    $requestData = decode($input);

    $requestData["id"] = $nextId;
    $nextId++;

    $notes[] = $requestData;
} else if ($isDELETE) {
    $route = $_GET["route"];
    $itemId = intval($route);

    $res = [];
    foreach ($notes as $note) {
        if ($note["id"] !== $itemId) {
            $res[] = $note;
        }
    }

    $notes = $res;
}

$_SESSION["notes"] = encode((array)$notes);
$_SESSION["nextId"] = $nextId;

if ($isPOST || $isDELETE) {
    header("HTTP/1.1 204 No Content", true, 204);
}

if (!$isPOST && !$isDELETE) {
    $res = $_SESSION["notes"];
    echo ($res);
}
