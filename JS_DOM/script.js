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

const btnToggleAside = document.querySelector("#btn-toggle-aside");
const elemenAside = document.querySelector("aside");

if (btnToggleAside && elemenAside) {
    btnToggleAside.addEventListener("click", () => {
        // Cek apakah aside sedang disembunyikan atau tidak
        if (elemenAside.style.display === "none") {
            elemenAside.style.display = "block";
            btnToggleAside.textContent = "Sembunyikan Kontak";
        } else {
            elemenAside.style.display = "none";
            btnToggleAside.textContent = "Tampilkan Kontak";
        }
    });
}

// Seleksi elemen container artikel
const containerArtikel = document.querySelector(".daftar-artikel");

// Fungsi untuk merender ulang seluruh daftar portofolio ke DOM
function renderPortofolio() {
    // Kosongkan container terlebih dahulu agar tidak terjadi duplikasi saat render ulang
    containerArtikel.innerHTML = "";

    daftarPortofolioforEachSafe((data, index) => {
        // Buat elemen <article>
        const article = document.createElement("article");

        // Buat elemen <h3>
        const judul = document.createElement("h3");
        const a = document.createElement("a");
        a.href = data.link;
        a.textContent = data.judul;
        a.target = "_blank"; // Buka di tab baru
        judul.appendChild(a);

        // Buat elemen <p> untuk deskripsi
        const isi = document.createElement("p");
        isi.textContent = data.deskripsi;

        // Buat Tombol Hapus per item
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.classList.add("btn-hapus");
        // Simpan index data agar bisa dihapus dari array
        tombolHapus.dataset.index = index;

        // Masukkan elemen ke dalam <article>
        article.appendChild(judul);
        article.appendChild(isi);
        article.appendChild(tombolHapus);

        // Masukkan <article> ke container utama
        containerArtikel.appendChild(article);
    });
}

// Fungsi bantu pengganti forEach agar bersih
function daftarPortofolioforEachSafe(callback) {
    for (let i = 0; i < daftarPortofolio.length; i++) {
        callback(daftarPortofolio[i], i);
    }
}

// Jalankan render awal saat halaman dimuat
renderPortofolio();

const btnTambah = document.querySelector("#btn-tambah");

btnTambah.addEventListener("click", () => {
    // Contoh data baru yang ditambahkan secara dinamis
    const portofolioBaru = {
        judul: "Proyek Web Portofolio Interaktif",
        link: "#",
        deskripsi: "Pengembangan website profil diri menggunakan JavaScript DOM, manipulasi elemen, dan event handling."
    };

    // Tambahkan data ke dalam array
    daftarPortofolio.push(portofolioBaru);

    // Render ulang tampilan portofolio
    renderPortofolio();
});

containerArtikel.addEventListener("click", (e) => {
    // Periksa apakah yang diklik adalah tombol dengan class "btn-hapus"
    if (e.target.classList.contains("btn-hapus")) {
        const index = e.target.dataset.index;
        
        // Hapus data dari array berdasarkan index
        daftarPortofolio.splice(index, 1);
        
        // Render ulang DOM
        renderPortofolio();
    }
});

const tombolTema = document.querySelector("#btn-tema");

if (tombolTema) {
    tombolTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        // Mengubah teks tombol secara dinamis
        if (document.body.classList.contains("dark-mode")) {
            tombolTema.textContent = "Mode Terang";
        } else {
            tombolTema.textContent = "Mode Gelap";
        }
    });
}