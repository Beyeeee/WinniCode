pada bagian backend: 

di bagian storage yang ada di public, jika ada kendala/error dalam mengaksesnya lakukan command di bawah ini (di terminal vsc)
rm public/storage (untuk hapus storagenya)
php artisan storage:link (untuk mencoba link kembali)

pada bagian env dan untuk database berada di drive
https://drive.google.com/drive/folders/1cDUiNWWfW0ypbRX7FsaEa4FARLnooJwa?usp=sharing 

untuk bagian mail 
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME="${APP_NAME}"

jika ingin ditest untuk verifikasi akun saat register akun pengguna/pembaca pada bagian ini bisa diikuti modul yang berada di drive.

jadi untuk portal berita yang sudah dibuat itu terdapat tampilan berita di home page yang dimana itu diatur berdasarkan trending dan berita terkini, untuk berita trending ditampilkan berdasarkan jumlah view yang ada di berita tersebut. jika berita terkini akan memuncul berita dengan tanggal terkini.

pada bagian navbar terdapat navigate about us, contact, service yang dimana bisa diset sesuai keinginan link apa yang dituju. Untuk bagian search bisa search berita sesuai dengan judul berita dan kategori berita.

pada bagian admin terdapat bagian home admin yang dimana kegunaannya adalah untuk menampilkan berapa jumlah berita, kategori, dan iklan yang sudah ada. untuk page berita, kategori, dan iklan adalah CRUD yang dapat diatur oleh admin.

untuk bagian MO adalah untuk mengurus pegawai dan role.

pada bagian pembaca terdapat beberapa hal yang dapat dilakukan seperti profile yang dimana dapat mengubah photo profile, dan bisa menambahkan favorit untuk berita yang mereka suka, serta dapat melakukan komentar.

untuk password dari data yang sudah ada itu passwordnya adalah 123456



