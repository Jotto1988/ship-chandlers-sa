<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Honeypot Check (Anti-Spam)
    if (!empty($_POST['_trap'])) {
        die("Spam detected.");
    }

    $to = "capetown@shipchandlers.co.za"; // Lindsay's Email
    $subject = "New Quote Request: " . $_POST['ship_name'];
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $ship = $_POST['ship_name'];
    $message = $_POST['message'];

    // 2. Email Body
    $body = "Name: $name\nShip/IMO: $ship\nEmail: $email\nPhone: $phone\n\nRequirements:\n$message";

    // 3. Handle File Attachment
    $boundary = md5(time());
    $headers = "From: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    // Plain text part
    $multipart = "--$boundary\r\n";
    $multipart .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
    $multipart .= "Content-Transfer-Encoding: 7bit\r\n\n";
    $multipart .= $body . "\r\n";

    // Attachment part
    if (isset($_FILES['upload']) && $_FILES['upload']['error'] == UPLOAD_ERR_OK) {
        $file_name = $_FILES['upload']['name'];
        $file_size = $_FILES['upload']['size'];
        $file_tmp  = $_FILES['upload']['tmp_name'];
        $file_type = $_FILES['upload']['type'];
        
        $handle = fopen($file_tmp, "r");
        $content = fread($handle, $file_size);
        fclose($handle);
        $encoded_content = chunk_split(base64_encode($content));

        $multipart .= "--$boundary\r\n";
        $multipart .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
        $multipart .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
        $multipart .= "Content-Transfer-Encoding: base64\r\n\n";
        $multipart .= $encoded_content . "\r\n";
    }

    $multipart .= "--$boundary--";

    if (mail($to, $subject, $multipart, $headers)) {
        header("Location: contact.html?status=success");
    } else {
        header("Location: contact.html?status=error");
    }
}
?>
