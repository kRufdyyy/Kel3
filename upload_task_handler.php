<?php
// Konfigurasi database
$host = "localhost";
$username = "root";
$password = "";
$database = "review_tugas";

// Koneksi ke database
$conn = new mysqli($host, $username, $password, $database);

// Periksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Periksa apakah form telah dikirim
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $task_title = $_POST['task_title'];
    $task_category = $_POST['task_category'];
    $task_description = $_POST['task_description'];
    $task_file = $_FILES['task_file'];

    // Validasi file upload
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($task_file["name"]);
    $upload_ok = true;

    // Periksa tipe file
    $file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $allowed_types = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
    if (!in_array($file_type, $allowed_types)) {
        echo "Hanya file dengan format PDF, DOC, DOCX, PPT, atau PPTX yang diperbolehkan.";
        $upload_ok = false;
    }

    // Periksa ukuran file (maksimum 5MB)
    if ($task_file["size"] > 5000000) {
        echo "Ukuran file terlalu besar. Maksimum 5MB.";
        $upload_ok = false;
    }

    // Jika validasi berhasil, unggah file
    if ($upload_ok) {
        if (move_uploaded_file($task_file["tmp_name"], $target_file)) {
            // Simpan data tugas ke database
            $stmt = $conn->prepare("INSERT INTO tasks (title, category, description, file_path) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $task_title, $task_category, $task_description, $target_file);

            if ($stmt->execute()) {
                echo "Tugas berhasil diunggah!";
            } else {
                echo "Gagal menyimpan data ke database: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Gagal mengunggah file.";
        }
    }
}

// Tutup koneksi
$conn->close();
?>
