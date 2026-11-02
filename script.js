// Inisialisasi State dari localStorage (atau gunakan data default)
const savedPortofolio = JSON.parse(localStorage.getItem("portofolio"));
const savedKomentar = JSON.parse(localStorage.getItem("komentar"));
const savedTema = localStorage.getItem("tema");
const savedAside = localStorage.getItem("asideVisible");

const state = {
    tema: savedTema || "terang",
    asideVisible: savedAside !== null ? JSON.parse(savedAside) : true,
    portofolio: savedPortofolio || [
        {
            judul: "Program Manajemen Gudang",
            link: "https://github.com/christianalexanderyap/Proyek-PBO.git",
            deskripsi: "Membuat program untuk mengelola data barang, stok barang, barang masuk, dan barang keluar menggunakan bahasa pemrograman Java.",
            likes: 0
        },
        {
            judul: "Program Klinik",
            link: "https://github.com/christianalexanderyap/Proyek_SDL.git",
            deskripsi: "Rencana program untuk mengelola data pasien, dokter, jadwal pemeriksaan, dan informasi pelayanan klinik.",
            likes: 0
        }
    ],
    komentar: savedKomentar || []
};

// Selektor Elemen DOM
const containerArtikel = document.querySelector(".daftar-artikel");
const btnTambah = document.querySelector("#btn-tambah");
const formKomentar = document.querySelector("#form-komentar");
const inputNama = document.querySelector("#input-nama");
const inputPesan = document.querySelector("#input-pesan");
const daftarKomentar = document.querySelector("#daftar-komentar");
const errorPesan = document.querySelector("#error-pesan");
const btnHapusSemua = document.querySelector("#btn-hapus-semua");
const btnToggleAside = document.querySelector("#btn-toggle-aside");
const elemenAside = document.querySelector("aside");
const tombolTema = document.querySelector("#btn-tema");

function renderPortofolio() {
    containerArtikel.innerHTML = "";

    state.portofolio.forEach((data, index) => {
        const article = document.createElement("article");

        const judul = document.createElement("h3");
        const a = document.createElement("a");
        a.href = data.link;
        a.textContent = data.judul;
        a.target = "_blank";
        judul.appendChild(a);

        const isi = document.createElement("p");
        isi.textContent = data.deskripsi;

        // Tombol Like
        const tombolLike = document.createElement("button");
        tombolLike.textContent = `Like (${data.likes})`;
        tombolLike.classList.add("btn-like");
        tombolLike.dataset.index = index;

        // Tombol Hapus
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.classList.add("btn-hapus");
        tombolHapus.dataset.index = index;

        article.appendChild(judul);
        article.appendChild(isi);
        article.appendChild(tombolLike);
        article.appendChild(document.createElement("br"));
        article.appendChild(tombolHapus);

        containerArtikel.appendChild(article);
    });
}

function renderKomentar() {
    daftarKomentar.innerHTML = "";

    state.komentar.forEach((kom, index) => {
        const itemKomentar = document.createElement("li");
        itemKomentar.innerHTML = `<span><b>${kom.nama}</b>: ${kom.pesan}</span> <button class="btn-hapus-komentar" data-index="${index}">Hapus</button>`;
        daftarKomentar.appendChild(itemKomentar);
    });
}

function renderTema() {
    if (state.tema === "dark") {
        document.body.classList.add("dark-mode");
        if (tombolTema) tombolTema.textContent = "Mode Terang";
    } else {
        document.body.classList.remove("dark-mode");
        if (tombolTema) tombolTema.textContent = "Mode Gelap";
    }
}

function renderAside() {
    if (elemenAside && btnToggleAside) {
        if (state.asideVisible) {
            elemenAside.style.display = "block";
            btnToggleAside.textContent = "Sembunyikan Kontak";
        } else {
            elemenAside.style.display = "none";
            btnToggleAside.textContent = "Tampilkan Kontak";
        }
    }
}

// Fungsi utama untuk memperbarui tampilan sekaligus menyimpan ke localStorage (JSON.stringify)
function updateAndSave() {
    localStorage.setItem("portofolio", JSON.stringify(state.portofolio));
    localStorage.setItem("komentar", JSON.stringify(state.komentar));
    localStorage.setItem("tema", state.tema);
    localStorage.setItem("asideVisible", JSON.stringify(state.asideVisible));

    renderPortofolio();
    renderKomentar();
    renderTema();
    renderAside();
}

// Inisialisasi pertama kali saat halaman dimuat
updateAndSave();

// Tambah Data Portofolio
if (btnTambah) {
    btnTambah.addEventListener("click", () => {
        state.portofolio.push({
            judul: "Proyek Web Portofolio Interaktif",
            link: "#",
            deskripsi: "Pengembangan website profil diri menggunakan JavaScript DOM, manipulasi elemen, dan Client-side State (localStorage).",
            likes: 0
        });
        updateAndSave();
    });
}

// Event Delegation untuk Portofolio (Like & Hapus)
if (containerArtikel) {
    containerArtikel.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (index === undefined) return;

        if (e.target.classList.contains("btn-like")) {
            state.portofolio[index].likes += 1;
            updateAndSave();
        }

        if (e.target.classList.contains("btn-hapus")) {
            state.portofolio.splice(index, 1);
            updateAndSave();
        }
    });

    // Efek hover artikel
    containerArtikel.addEventListener("mouseover", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.add("artikel-hover");
    });

    containerArtikel.addEventListener("mouseout", (e) => {
        const article = e.target.closest("article");
        if (article) article.classList.remove("artikel-hover");
    });
}

// Form Komentar
if (formKomentar) {
    formKomentar.addEventListener("submit", (e) => {
        e.preventDefault();

        const nama = inputNama.value.trim();
        const pesan = inputPesan.value.trim();

        if (nama === "" || pesan === "") {
            errorPesan.textContent = "Nama dan komentar wajib diisi!";
            errorPesan.style.display = "block";
            return;
        }

        if (pesan.length < 5) {
            errorPesan.textContent = "Komentar minimal harus berisi 5 karakter!";
            errorPesan.style.display = "block";
            return;
        }

        errorPesan.style.display = "none";

        // Simpan ke state komentar
        state.komentar.push({ nama, pesan });
        updateAndSave();

        formKomentar.reset();
    });
}

// Hapus Komentar Satuan
if (daftarKomentar) {
    daftarKomentar.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-hapus-komentar")) {
            const index = e.target.dataset.index;
            state.komentar.splice(index, 1);
            updateAndSave();
        }
    });
}

// Hapus Semua Komentar
if (btnHapusSemua) {
    btnHapusSemua.addEventListener("click", () => {
        state.komentar = [];
        updateAndSave();
        if (errorPesan) errorPesan.style.display = "none";
    });
}

// Toggle Sembunyikan/Tampilkan Aside Kontak
if (btnToggleAside) {
    btnToggleAside.addEventListener("click", () => {
        state.asideVisible = !state.asideVisible;
        updateAndSave();
    });
}

// Fitur Dark Mode & Tombol Tema
function ubahTema() {
    state.tema = state.tema === "dark" ? "terang" : "dark";
    updateAndSave();
}

if (tombolTema) {
    tombolTema.addEventListener("click", ubahTema);
}

// Pintasan Keyboard 'd' atau 'D' untuk Dark Mode
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "d" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        ubahTema();
    }
});

// Form Pendaftaran & Validasi Field (Sesuai Modul Sebelumnya)
const formDaftar = document.querySelector("#form-daftar");
const errorKonfirmasi = document.querySelector("#error-konfirmasi");

if (formDaftar && errorKonfirmasi) {
    formDaftar.addEventListener("submit", (e) => {
        e.preventDefault();
        const password = document.querySelector("#password").value;
        const konfirmasi = document.querySelector("#konfirmasi").value;
        if (password !== konfirmasi) {
            errorKonfirmasi.textContent = "Konfirmasi password tidak sama dengan password";
        } else {
            errorKonfirmasi.textContent = "";
            alert("Pendaftaran berhasil (simulasi)!");
            formDaftar.reset();
        }
    });
}

function validasiField(input, errorElement) {
    if (!input.checkValidity()) {
        errorElement.textContent = input.validationMessage;
    } else {
        errorElement.textContent = "";
    }
}

[
    ["#username", "#error-username"],
    ["#email", "#error-email"],
    ["#password", "#error-password"],
].forEach(([fieldSel, errorSel]) => {
    const field = document.querySelector(fieldSel);
    const errEl = document.querySelector(errorSel);
    if (field && errEl) {
        field.addEventListener("input", () => validasiField(field, errEl));
    }
});

// ==========================================
// KODE TAMBAHAN UNTUK FETCH KOMENTAR API
// ==========================================
const loadingKomentar = document.querySelector("#loading-komentar");

async function muatKomentarDariAPI() {
    // Pastikan elemen loading ada sebelum dijalankan
    if (!loadingKomentar) return;

    // Tampilkan spinner loading
    loadingKomentar.style.display = "flex";
    if (errorPesan) errorPesan.style.display = "none";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1/comments");

        if (!response.ok) {
            throw new Error(`Gagal terhubung ke server (HTTP Status: ${response.status})`);
        }

        const dataKomentar = await response.json();

        // Masukkan 5 data komentar pertama ke state komentar
        state.komentar = dataKomentar.slice(0, 5).map(item => ({
            nama: item.name,
            pesan: item.body
        }));

        // Simpan ke localStorage dan render ulang tampilan komentar
        updateAndSave();
    } catch (error) {
        console.error("Gagal mengambil data komentar:", error);
        if (errorPesan) {
            errorPesan.textContent = `⚠️ Terjadi Kesalahan: ${error.message || "Gagal memuat komentar awal."}`;
            errorPesan.style.display = "block";
        }
    } finally {
        // Sembunyikan spinner loading apapun hasil fetch-nya
        if (loadingKomentar) loadingKomentar.style.display = "none";
    }
}

// Jalankan otomatis saat halaman dibuka (jika komentar masih kosong)
if (state.komentar.length === 0) {
    muatKomentarDariAPI();
} else {
    // Jika sudah ada data di localStorage, pastikan spinner disembunyikan
    if (loadingKomentar) loadingKomentar.style.display = "none";
}