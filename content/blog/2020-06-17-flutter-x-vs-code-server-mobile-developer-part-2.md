---
templateKey: blog-post
date: 2020-06-17T03:12:38.961Z
hidepost: false
title: Flutter x VS Code Server = "Mobile" Developer (PART-2)
description: Mobile developer kini bisa lebih bebas dari keterbatasan platform
  dan tempat. Hal yang selama ini menjadi kelebihan utama web developer.
  Kebebasan pertama ialah terkait cross platform yang dibawa oleh kehadiran
  flutter (dan react native). Kebebasan kedua ialah terkait ketergantungan sama
  laptop/pc untuk bisa "bekerja". Kombinasi Flutter dan VS code di server
  membawa berbagai kemungkinan baru untuk "mobile" developer.
categories:
  - tech
featuredpost: false
tags:
  - Flutter
  - Vs Code
  - Code-Serve
  - Google Cloud Platform
---
# Tutorial Setup VS Code Server
Di post sebelumnya ([part-1](/blog/2020-06-16-flutter-x-vs-code-server-mobile-developer-part-1)), saya menceritakan kenapa tutorial ini sangat menarik. Kebebasan yang ditawarkan konfigurasi ini sangat menggiurkan.

## Prerequisite
Sebelum kita mulai, ada beberapa hal yang perlu disiapkan yaitu:
1. Akun Google Cloud Platform dan terpasang billing
2. Domain pribadi, tutorial dibawah domain dibeli di [https://domain.google](http://domain.google/)

Saya memilih Google cloud platform (GCP) karena kemudahan integrasi kepada sistem google yang lain, termasuk ke DNS nya, adanya opsi pembayaran menggunakan rupiah, dan tersedianya data center di Indonesia. Data center ini merupakan hal yang sangat penting, karena dapat menekan kecepatan akses ke server google. Jika sebelumnya yang terdekat adalah ke singapura dan rata rata ping bernilai ratusan ms, ke jakarta kini hanya membutuhkan puluhan ms.

Tutorial kali ini akan terbagi menjadi 3 step yaitu:
1. Setup Virtual Machine (VM)
2. Setup Domain DNS
3. Instalasi Flutter


## Setup Virtual Machine
Di GCP produk VM disebut [compute engine](https://console.cloud.google.com/compute/instances). Kita akan mengikuti petunjuk yang sama dengan official guide dari [code-server](https://github.com/cdr/code-server/blob/master/doc/guide.md). Hanya saja, saya akan lebih mendetailkan dan memberi langkah tambahan sebagai tips. Mari kita mulai..
### VM Creation
1. Masuk ke menu [compute engine](https://console.cloud.google.com/compute/instances), lalu klik "create instance".
2. Beri nama instance dan label sesuai kemauan mu.
3. Pilih Region "asia-southeast2(Jakarta" dan pilih salah satu zona yang tersedia.
4. Pilih seri mesin "E2" dangan tipe mesin "e2-highcpu-2(2 vCPU, 2 GB Memory)".
5. Klik "change" di menu Boot Disk, pilih os Debian GNU / Linux 10 (buster). Lalu pilih tipe dan ukuran disk yang diinginkan. Pada guide resmi, mereka merekomendasikan 32 GB SSD. Namun, **saya merekomendasikan 20 GB standard persistant disk**, karena selain lebih murah, saya rasa segitu sudah cukup dan tidak ada penurunan kecepatan disk yang signifikan terasa (jika memang terbiasa menggunakan HDD di laptop). 
6. Centang allow http traffic dan allow https traffic di menu firewall.
7. Klik "Management, security, disks, networking, sole tenancy" untuk mebuka menu advance.
8. Pada Kolom Automation masukkan Startup Script berikut, hal ini akan membantu kita untuk menjalankan code-server secara otomatis setiap menyalakan VM kita. Karena VM ini akan selalu kita mati nyalakan untuk menghemat biaya. 
```bash
systemctl --user restart code-server
```

9. Klik "create" dan tunggu vm ready dan klik tombol "ssh" untuk membuka window ssh terminal.

### VM Setup
VM yang baru dibuat benar benar kosong, ada beberapa hal yang perlu kita install dana atur..
0. Lakukan apt update untuk memastikan mendapat version terbaru dari program yang akan diinstall
```bash
$ sudo apt-get update
```

1. Install htop, untuk melihat penggunaan resource dalam sistem.
```bash
$ sudo apt-get install htop
```

2. Install wget, untuk membantu mendownload file.
```bash
$ sudo apt-get install wget
```

3. Install unzip, untuk melakukan ekstraksi terhadap file yang di _compress_.
```bash
$ sudo apt-get install unzip
```

4. Install git, untuk ... _well git's things_
```bash
$ sudo apt-get install git
```

5. Enable alias untuk command "ll". Untuk mempermudah melihat isi directory
```bash
$ sudo nano .bashrc
alias ll='ls -lAF'
$ sudo source .bashrc
```

6. Setup swap file sebesar 1 GB. Apa itu swap file? google aja..
```bash
$ sudo fallocate -l 1G /swapfile
$ sudo dd if=/dev/zero of=/swapfile bs=1024 count=1048576
$ sudo chmod 600 /swapfile
$ sudo mkswap /swapfile
$ sudo swapon /swapfile
$ sudo nano /etc/fstab
# copy paste line berikut ke baris terakhir
/swapfile swap swap defaults 0 0
$ sudo nano mount -a
```

7. Pastikan swap telah muncul sebesar 1GB dengan menjalankan htop
```bash
$ htop
```

### Code Server Installation

1. Download dan jalankan script instalasi [code-server](https://github.com/cdr/code-server)
```bash
$ curl -fsSL https://code-server.dev/install.sh | sh
$ systemctl --user restart code-server
```

2. Ganti password admin dari code-server
```bash
$ sudo nano ~/.config/code-server/config.yaml
$ systemctl --user restart code-server
```

3. Install caddy server dan setup menjadi reverse proxy, caddy akan secara otomatis menggunakan certificate yang dibuat di [let's encrypt](https://letsencrypt.org/). Jika terdapat certificate, akses domain kalian menggunakan https, jika tidak gunakan http.
```bash
$ echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" \
    | sudo tee -a /etc/apt/sources.list.d/caddy-fury.list
$ sudo apt update
$ sudo apt install caddy
$ sudo nano /etc/caddy/Caddyfile
```
```
# hapus semua tulisan yang sudah ada dan ganti menjadi
# ganti tulisan _mydomain.com_ menjadi nama domain anda
# subdomain vscode berfungsi untuk mengakses code-server
# subdomain flutter untuk mengakses hasil run dari flutter
vscode.mydomain.com {
    reverse_proxy 127.0.0.1:8080
}
flutter.mydomain.com {
    reverse_proxy localhost:3600
}
```

## Setup Domain DNS
Sepertinya bagian yang ini kalian sudah sangat paham. Karena jika kalian punya domain pasti sudah terbiasa mengatur DNS. Yap betul, kalian perlu:
1. Melihat _External IP_ dari VM yang kalian buat di console compute engine.
2. Copy alamat IP tersebut
3. Ke halaman pengaturan DNS dari domain kalian
4. Buat sebuah A Record dengan host vscode dan flutter menuju alamat IP yang sudah di copy.

| hostname | record type | Time To Live (TTL) |     Data        |
| -------- | ----------- | ------------------ | --------------- |
| vscode   | A           | 5m                 | copas ip disini |
| flutter  | A           | 5m                 | copas ip disini |

5. Walaupun muncul tulisan kamu diminta menunggu 48 jam, jika kalian menggunakan DNS google, cukup menunggu sekitar 5-10 menit saja.

----

Sampai sejauh ini, kalian sudah dapat menggunakan VS Code di browser dengan membuka [vscode.mydomain.com](vscode.mydomain.com) di browser kalian. Jika belum muncul silahkan coba tunggu beberapa menit lalu coba refresh. Bisa jadi juga, halaman putih tapi sebenarnya hanya loading untuk memunculkan halaman vscode, cukup tunggu beberapa detik. Hal ini bisa kalian cek dengan memastikan apakah _favicon_ sudah muncul.

## Instalasi Flutter
Ini bagian penutup dan paling mudah, seperti nya tidak perlu tutorial kan.. 🤓?
Iya, iya.., saya buatin tutorialnya di next post yaa..


[Lanjut ke part 3](/blog/2020-06-17-flutter-x-vs-code-server-mobile-developer-part-3)