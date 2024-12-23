// Validasi form sebelum mengirim ke server
const uploadTaskForm = document.getElementById('uploadTaskForm');
const messageBox = document.getElementById('messageBox');

uploadTaskForm.addEventListener('submit', (e) => {
    const taskTitle = document.getElementById('task-title').value.trim();
    const taskCategory = document.getElementById('task-category').value;
    const taskDescription = document.getElementById('task-description').value.trim();
    const taskFile = document.getElementById('task-file').files[0];

    // Reset pesan
    messageBox.innerHTML = '';

    // Validasi Judul Tugas
    if (taskTitle === '') {
        e.preventDefault();
        messageBox.innerHTML = '<p style="color: red;">Judul tugas tidak boleh kosong.</p>';
        return;
    }

    // Validasi Kategori
    if (taskCategory === '') {
        e.preventDefault();
        messageBox.innerHTML = '<p style="color: red;">Pilih kategori tugas.</p>';
        return;
    }

    // Validasi Deskripsi
    if (taskDescription === '') {
        e.preventDefault();
        messageBox.innerHTML = '<p style="color: red;">Deskripsi tidak boleh kosong.</p>';
        return;
    }

    // Validasi File
    if (!taskFile) {
        e.preventDefault();
        messageBox.innerHTML = '<p style="color: red;">File tugas harus diunggah.</p>';
        return;
    }

    // Periksa ukuran file (maksimum 5MB)
    if (taskFile.size > 5000000) {
        e.preventDefault();
        messageBox.innerHTML = '<p style="color: red;">Ukuran file terlalu besar. Maksimum 5MB.</p>';
        return;
    }

    // Periksa tipe file
    const allowedTypes = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
    const fileType = taskFile.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileType)) {
        e.preventDefault();
        messageBox.innerHTML = '<p style="color: red;">Format file tidak didukung. Gunakan PDF, DOC, DOCX, PPT, atau PPTX.</p>';
        return;
    }
});
// Ambil elemen pop-up dan tombol
const popup = document.getElementById("uploadTaskPopup");
const openPopupButton = document.querySelector(".cta-button");
const closePopupButton = document.getElementById("closePopup");

// Tampilkan pop-up saat tombol diklik
openPopupButton.onclick = function() {
    popup.style.display = "flex";
}

// Sembunyikan pop-up saat tombol ditutup diklik
closePopupButton.onclick = function() {
    popup.style.display = "none";
}

// Sembunyikan pop-up saat pengguna mengklik di luar pop-up
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}
const searchInput = document.querySelector('.task-search-input');
const searchButton = document.querySelector('.task-search-button');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        // Kirim permintaan pencarian (bisa menggunakan fetch atau form submission)
        console.log(`Mencari tugas dengan kata kunci: ${query}`);
        // Implementasi pencarian sesuai backend
    } else {
        alert("Masukkan kata kunci pencarian.");
    }
});
