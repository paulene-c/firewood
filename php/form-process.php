<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}


// EMAIL
if (empty($_POST["email"])) {
} else {
    $email = $_POST["email"];
}

if (empty($_POST["phone"])) {
    $errorMSG .= "Phone number is required ";
} else {
    $phone = $_POST["phone"];
}

if (empty($_POST["address"])) {
    $errorMSG .= "Delivery address is required ";
} else {
    $address = $_POST["address"];
}

//ORDER
if (empty($_POST["order"])) {
} else {
    $order = $_POST["order"];
}


$EmailTo = "orders@firewoodunlimited.co.nz";
$Subject = "Order from Firewood Unlimited website";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Phone: ";
$Body .= $phone;
$Body .= "\n";
$Body .= "Address: ";
$Body .= $address;
$Body .= "\n";
$Body .= "Order: ";
$Body .= $order;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>
