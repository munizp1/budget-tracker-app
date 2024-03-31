<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Include PHPMailer autoloader
require 'vendor/autoload.php';

// Retrieve form data
$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

try {
    // Initialize PHPMailer object
    $mail = new PHPMailer(true);

    // Enable SMTP debugging
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;

    // Set mailer to use SMTP
    $mail->isSMTP();

    // Specify SMTP server settings
    $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP server address
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Use STARTTLS encryption
    $mail->Port = 587; // Replace with your SMTP port

    // SMTP authentication credentials
    $mail->Username = 'shafqatmashreky@gmail.com'; // Replace with your email account username
    $mail->Password = 'hvgk pdnw dlfa mwbp'; // Replace with your email account password

    // Set sender and recipient details
    $mail->setFrom($email, $name);
    $mail->addAddress('shafqatmashreky@yahoo.com',$email);

    // Set email subject and body
    $mail->Subject = $subject;
    $mail->Body = $message;
    // Add Reply-To header
    $mail->addReplyTo($email, $name);
    // Send email
    $mail->send();

    // Redirect to a success page
    header("Location: sent.html");
    exit;
} catch (Exception $e) {
    // Handle errors
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
?>
