# Bookshelf App

## Deskripsi Proyek

Bookshelf App adalah aplikasi web yang memungkinkan pengguna untuk mengelola koleksi buku mereka dengan mudah. Pengguna dapat menambahkan, memindahkan, dan menghapus buku dari rak yang tersedia. Aplikasi ini menggunakan teknologi HTML, CSS, dan JavaScript, serta memanfaatkan localStorage untuk menyimpan data buku secara permanen, bahkan setelah halaman ditutup.

## Fitur Utama

1. **Menambahkan Buku**: Pengguna dapat menambahkan buku baru dengan mengisi formulir yang disediakan. Setiap buku terdiri dari atribut seperti judul, penulis, tahun rilis, dan status (selesai dibaca atau belum).
  
2. **Rak Buku**: Terdapat dua rak buku:
   - **Belum Selesai Dibaca**: Menyimpan buku-buku yang belum selesai dibaca.
   - **Selesai Dibaca**: Menyimpan buku-buku yang telah selesai dibaca.

3. **Memindahkan Buku Antar Rak**: Buku dapat dipindahkan dari satu rak ke rak lainnya dengan mudah.

4. **Menghapus Buku**: Pengguna dapat menghapus buku dari rak, dan perubahan ini juga akan terupdate di localStorage.

5. **Penyimpanan Lokal**: Data buku disimpan menggunakan localStorage, sehingga tetap ada setelah halaman dimuat ulang.

## Kriteria Wajib

Aplikasi ini memenuhi lima kriteria wajib sebagai berikut:

1. **Penyimpanan dengan localStorage**: Data buku yang disimpan tetap ada walaupun halaman ditutup. Setiap buku disimpan sebagai objek JavaScript dengan format:
   ```javascript
   {
     id: string | number,
     title: string,
     author: string,
     year: number,
     isComplete: boolean,
   }
   ```

2. **Menambahkan Buku**: Buku baru dapat ditambahkan melalui formulir. ID buku dihasilkan secara otomatis menggunakan timestamp.

3. **Dua Rak Buku**: Terdapat dua rak buku yang jelas, yaitu "Belum selesai dibaca" dan "Selesai dibaca".

4. **Memindahkan Buku**: Buku dapat dipindahkan antar rak, dan statusnya akan diperbarui di localStorage.

5. **Menghapus Buku**: Buku dapat dihapus dari rak dan akan dihapus dari localStorage juga.

## Cara Instalasi

1. **Clone Repositori**: 
   ```bash
   git clone [URL_REPOSITORI]
   cd Bookshelf-Apps
   ```

2. **Buka File HTML**: Buka file `index.html` di browser pilihan Anda.

3. **Gunakan Aplikasi**: Anda dapat mulai menambahkan, memindahkan, dan menghapus buku sesuai keinginan.

## Contoh Penggunaan

1. **Menambahkan Buku**: Masukkan detail buku pada formulir dan klik "Tambah Buku".
2. **Memindahkan Buku**: Klik tombol untuk memindahkan status buku antara "Belum Selesai Dibaca" dan "Selesai Dibaca".
3. **Menghapus Buku**: Klik tombol "Hapus Buku" untuk menghapus buku dari rak.
