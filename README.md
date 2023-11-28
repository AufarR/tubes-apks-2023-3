# tubes-apks-2023

#Requirements

#1. Docker

#2. NPM

#Cara Penggunaan

#1. Jalankan npm install

#2. Jalankan ./up.sh pada terminal Bash

## Run Test

jalankan pada device lain

### Pilihan Test (gunakan npm run [jenis test])

- smoke
- load
- breakpoint
- stress
- spike
- endurance
- tests  (menjalankan semua tests di atas)

mohon install terlebih dahulu [K6](https://k6.io/docs/get-started/installation/) dan [Prometheus](https://prometheus.io/download/) untuk menggunakan testing dan monitoring tools

simpan folder yang mengandung **prometheus.exe** satu level dengan repo ini. Ubah nama folder tersebut menjadi **"prometheus"**

**CATATAN**: untuk versi aplikasi ini, script testing tidak sepenuhnya diimplementasikan

## Testing

testing yang diimplementasikan beserta keteranganya sebagai berikut

### Smoke testing

testing ini terdiri dari satu skenario. Skenario tersebut merupakan kegiatan CRUD pada umumnya dari setiap skema yang ada di database, hanya saja, login dilakukan sebelum melakukan CRUD tersebut

beberapa variabel yang perlu diubah sesuai kebutuhan:

- options - sebagai opsi testing
- host
- username
- password
- app_port

### Load testing

testing ini menggunakan skenario yang dijelaskan di bagian main testing, variabel opsi pada testing ini disesuaikan selayaknya load testing pada umumnya

beberapa variabel yang perlu diubah sesuai kebutuhan:

- options - sebagai opsi testing
- host
- app_port

### Main testing (additional)

testing ini terdiri dari skenario umum user dalam menggunakan aplikasi

beberapa variabel yang perlu diubah sesuai kebutuhan:

- username
- password

### [Other] testing (missing? no)

testing yang lain tidak diimplementasikan karena seluruh fungsionalitas yang tidak lulus tes pada smoke testing. Yang mana setiap fungsionalitas hanya dapat menampung sangat sedikit user. Ketika user bertambah, kegagalan virtual user terhadap fungsionalitas yang membutuhkan login meningkat secara signifikan

beberapa perubahan yang (setidaknya) dilakukan pada repo ini:

- perubahan konfigurasi server
- perubahan konfigurasi mongo-express (sebelumnya sangat buruk, tidak dapat berjalan terutama selain di unix)
- perubahan konfigurasi aplikasi
- perubahan di atas mencakup perubahan yang dilakukan di .env.example
- konfigurasi package.json
- role dijadikan parameter pada pembuatan user (yang dapat dilakukan strict role="superadmin" apabila NODE_ENV diatur ke selain development)
