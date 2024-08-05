<?php
$servername = "localhost";
$username = "mefe";
$password = "12345";
$dbname = "mydatabase";

// Veritabanı bağlantısını oluştur
$conn = new mysqli($servername, $username, $password, $dbname);

// Bağlantıyı kontrol et
if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}
echo "Başarıyla bağlandı!";
?>
