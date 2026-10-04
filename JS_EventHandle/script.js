// Data awal portofolio yang akan ditampilkan ke halaman web
const daftarPortofolio = [
    {
        judul: "Program Manajemen Gudang",
        link: "https://github.com/christianalexanderyap/Proyek-PBO.git",
        deskripsi: "Membuat program untuk mengelola data barang, stok barang, barang masuk, dan barang keluar menggunakan bahasa pemrograman Java."
    },
    {
        judul: "Program Klinik",
        link: "https://github.com/christianalexanderyap/Proyek_SDL.git",
        deskripsi: "Rencana program untuk mengelola data pasien, dokter, jadwal pemeriksaan, dan informasi pelayanan klinik."
    }
];

const containerArtikel = document.querySelector(".daftar-artikel");

// Fungsi untuk merender daftar portofolio ke dalam elemen HTML secara dinamis
function renderPortofolio() {
    containerArtikel.innerHTML = "";

    daftarPortofolio.forEach((data, index) => {
        const article = document.createElement("article");

        const judul = document.createElement("h3");
        const a = document.createElement("a");
        a.href = data.link;
        a.textContent = data.judul;
        a.target = "_blank";
        judul.appendChild(a);

        const isi = document.createElement("p");
        isi.textContent = data.deskripsi;

        // Tombol Like untuk setiap artikel
        const tombolLike = document.createElement("button");
        tombolLike.textContent = "Like (0)";
        tombolLike.classList.add("btn-like");

        // Tombol Hapus untuk setiap artikel
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

// Panggil fungsi render saat pertama kali halaman dimuat
renderPortofolio();

// Menambahkan data portofolio baru saat tombol diklik
const btnTambah = document.querySelector("#btn-tambah");
btnTambah.addEventListener("click", () => {
    daftarPortofolio.push({
        judul: "Proyek Web Portofolio Interaktif",
        link: "#",
        deskripsi: "Pengembangan website profil diri menggunakan JavaScript DOM, manipulasi elemen, dan event handling."
    });
    renderPortofolio();
});

// Event Delegation untuk menangani klik tombol Like & Hapus Artikel di dalam container
containerArtikel.addEventListener("click", (e) => {
    // Aksi ketika tombol Like diklik
    if (e.target.classList.contains("btn-like")) {
        let jumlah = parseInt(e.target.dataset.like || 0) + 1;
        e.target.dataset.like = jumlah;
        e.target.textContent = `Like (${jumlah})`;
    }

    // Aksi ketika tombol Hapus artikel diklik
    if (e.target.classList.contains("btn-hapus")) {
        const index = e.target.dataset.index;
        daftarPortofolio.splice(index, 1);
        renderPortofolio();
    }
});

// Efek hover (kursor mendekati artikel) menggunakan event mouseover dan mouseout
containerArtikel.addEventListener("mouseover", (e) => {
    const article = e.target.closest("article");
    if (article) article.classList.add("artikel-hover");
});

containerArtikel.addEventListener("mouseout", (e) => {
    const article = e.target.closest("article");
    if (article) article.classList.remove("artikel-hover");
});

// Penanganan Form Komentar dengan validasi in-page dan preventDefault
const formKomentar = document.querySelector("#form-komentar");
const inputNama = document.querySelector("#input-nama");
const inputPesan = document.querySelector("#input-pesan");
const daftarKomentar = document.querySelector("#daftar-komentar");
const errorPesan = document.querySelector("#error-pesan");
const btnHapusSemua = document.querySelector("#btn-hapus-semua");

formKomentar.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah halaman melakukan reload otomatis saat form dikirim

    const nama = inputNama.value.trim();
    const pesan = inputPesan.value.trim();

    // Validasi: Pastikan form tidak kosong
    if (nama === "" || pesan === "") {
        errorPesan.textContent = "Nama dan komentar wajib diisi!";
        errorPesan.style.display = "block";
        return;
    }

    // Validasi: Komentar minimal harus 5 karakter
    if (pesan.length < 5) {
        errorPesan.textContent = "Komentar minimal harus berisi 5 karakter!";
        errorPesan.style.display = "block";
        return;
    }

    // Sembunyikan pesan error jika lolos validasi
    errorPesan.style.display = "none";

    // Buat elemen item komentar baru dan masukkan ke dalam list
    const itemKomentar = document.createElement("li");
    itemKomentar.innerHTML = `<span>${nama}: ${pesan}</span> <button class="btn-hapus-komentar">Hapus</button>`;
    daftarKomentar.appendChild(itemKomentar);

    formKomentar.reset(); // Mengosongkan form setelah berhasil dikirim
});

// Event Delegation untuk menghapus komentar satuan
daftarKomentar.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-hapus-komentar")) {
        e.target.closest("li").remove();
    }
});

// Tombol untuk menghapus seluruh komentar sekaligus
btnHapusSemua.addEventListener("click", () => {
    daftarKomentar.innerHTML = "";
    errorPesan.style.display = "none";
});

// Fitur Sembunyikan / Tampilkan Aside (Kontak)
const btnToggleAside = document.querySelector("#btn-toggle-aside");
const elemenAside = document.querySelector("aside");

if (btnToggleAside && elemenAside) {
    btnToggleAside.addEventListener("click", () => {
        if (elemenAside.style.display === "none") {
            elemenAside.style.display = "block";
            btnToggleAside.textContent = "Sembunyikan Kontak";
        } else {
            elemenAside.style.display = "none";
            btnToggleAside.textContent = "Tampilkan Kontak";
        }
    });
}

// Fitur Dark Mode (Tombol Klik Manual & Pintasan Keyboard 'D')
const tombolTema = document.querySelector("#btn-tema");

function ubahTema() {
    document.body.classList.toggle("dark-mode");
    if (tombolTema) {
        tombolTema.textContent = document.body.classList.contains("dark-mode") ? "Mode Terang" : "Mode Gelap";
    }
}

// Pintasan keyboard menekan tombol 'd' atau 'D'
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "d") {
        ubahTema();
    }
});

if (tombolTema) {
    tombolTema.addEventListener("click", ubahTema);
}