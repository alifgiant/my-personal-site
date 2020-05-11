---
templateKey: blog-post
hidepost: false
date: 2020-05-08T01:24:28.281Z
title: Perjalanan saya belajar web dan mebuat personal site, untuk blog dan portfolio (Part-2)
description: Domain alifakbar.com sudah dibeli semenjak 2017, tapi site ini baru
  going live di tahun 2020. Find out why!
categories:
  - tech
  - experience
featuredpost: false
featuredimage: " "
tags:
  - Firebase
  - Cloud Function
  - Flamelink
  - Wordpress
  - GCP
---

## Firebase Host, Function dan Flamelink

Tepat ketika saya mencari solusi lain, dan saya mendapatkan informasi mengenai sebuah layanan google menyediakan _free hosting_, bernama [Firebase](https://firebase.github.com) tentu saya sekita lanjut mencoba nya. Firebase membuat saya teringat dengan **github.io** dan **heroku**, kemudahan dalam membuat web dari static html di github dan layanan database, storage, _cloud function_, _authentication_ di heroku.

Saya dengan cepat bisa menggunakan firebase, namun _at some point_, melakukan modifikasi data dengan langsung membuka database _kinda tiring and bug prone_. Jadi, hal berikutnya yang saya lakukan ialah segera mencari sebuah CMS (Content Management System) yang bisa di integrasi kedalam firebase. [Flamelink](https://flamelink.io) adalah jawaban dari pencarian saya. Namun selama mengerjakan web, saya menemukan banyak kesulitan dalam menggunakan SDK flamelink. Dokumentasi yang kurang dan sdk yang belum mature membuat saya kehilangan semangat mengerjakan web pribadi. Tutorial penggunaan firebase dan flamelink akan saya tulis di blog post berikutnya.

### Kelebihan

- Setup _cukup_ mudah, tutorial resmi sudah dibuat step demi step
- _**Hacky** full feature server_
- Terdapat domain default yang keren **(\*.web.app)**, namun kita juga bisa menggunakan custom domain, tentunya beli lagi 🤣
- Terdapat paket **GRATIS** untuk _project_ kecil. Pastinya dengan berbagai limitasi, tapi itupun sudah sangat cukup untuk sebuah _blog_ ataupun _website portfolio_ kecil
- Free SSL
- Integrasi kepada fitur-fitur google tinggal klik (OAuth, Analytic, Admob, dll)

### Kekurangan

- Integrasi kedua sistem walaupun smooth diawal, semakin jauh terasa semakin sulit
- Karena menggunakan 2 sistem yang berbeda maka diperlukan mengecek perubahan _pricing_ ataupul _policy_ di 2 tempat
- melakukan query di NoSQL database sedikit tricky buat yg tidak terbiasa
- Di paket gratis, Tidak bisa melakukan request ke alamat url lain _(crossorigin)_

## Wordpress dan Google Cloud Platform

_Fast forward_ 2 tahun semenjak terakhir mengerjakan web pribadi ini, saya telah bekerja di salah satu perusahaan ecommerce Indonesia sebagai _Android Developer_. Tiba tiba saya mendapatkan email pemberitahuan bahwa domain saya mendekati masa expire dan saya harus memperpanjang nya. Karena merasa sayang jika dibiarkan expire maka saya mau tidak mau harus membayarnya dan kembali melanjutkan proses belajar web saya. Tapi hal ini tidak berjalan baik, karena sekarang saya lebih sibuk dan memilih untuk lebih fokus kepada _development mobile_.

Tak mau rugi, maka saya mencari opsi yang paling simpel dalam membuat web. Kalau bisa pengennya cuma klik-klik. Setelah mencari cari dan menimbang berbagai aspek seperti:

- Harga,
- Plugins,
- Support,
- Kemudahan backup, dll,

Saya akhirnya memilih [Wordpress](https://wordpress.org/). Permasalahannya, wordpress merupakan sebuah web app, tidak dapat di deploy di tempat hosting static web. Untuk menggunakannya saya perlu berlangganan shared hosting, VPS(virtual private server), ataupun Container pod. Range harga layanan ini mulai dari Rp.10 rb hingga ratusan ribu per bulan. Untuk yang murah, size host yang ditawarkan menurut saya terlalu kecil, sedangkan yang mahal, yaahhh **MAHAL** 😂. Sampai akhirnya saya menemukan sebuah video [youtube](https://www.youtube.com/watch?v=vIJdypOqlL4) yang menjelaskan cara untuk mendeploy Wordpress di [GCP](https://cloud.google.com/) (Google Cloud Platform) dengan harga **\$0** (baca: gratis). Yang menarik dengan harga \$0 itu saya mendapatkan resource yg sama (bahkan terkadang lebih) daripada low tier shared host. Walaupun sama-sama kecil tapi gratis, mudah diintegrasi dengan produk lain google, jaringan CDN di seluruh dunia, rasanya _it's a no brainer choice_. Setup mengikuti step by step dari video sebelumnya, lalu membeli template, install, klik, klik, klik... and _its done_.

### Kelebihan

- _Gratis_
- Kemudahan itegrasi dengan sistem google lainnya
- Karena dideploy di sebuah full feature server. _Everything is possible_, email, analytic, _everything! you name it_ (\*selama resouce masih sanggup)
- Terdapat ribuan template (ratusan gratis), hampir semua usecase ada template gratis nya
- Begitu juga plugin nya, ga perlu ngoding, klik, klik, _done_. Bahkan bikin simple ecommerce pun bisa 😎.

### Kekurangan

- Resource kecil (jangan terlalu serakah 🤭, sukur sukur gratis)
- Perlu Kartu debit/credit yang berlabel VISA / Master Card dan aktif untuk transaksi digital (_Bank Mandiri's Debit Card is A No_)
- Need to be familiar in handling linux system
- Setengah prosesnya _Has No GUI setup_
- Ilmu yang didapat selama proses paling sedikit 😱
- Template memang banyak tapi customization terbatas, jadi harus ganti template lagi atau mencoba _coding_ di environtment yg sangat berbeda

[Lanjut ke part 3](/blog/2020-05-10-my-journey-on-creating-personal-website-full-code-untill-configuration-magic-part-3)
