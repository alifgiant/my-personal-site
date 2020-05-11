---
templateKey: blog-post
hidepost: false
thumbnail: /images/uploads/dr-tauhid.jpeg
date: 2020-05-06T01:24:28.281Z
title: My journey on creating personal website, full code untill configuration magic
description: Domain alifakbar.com sudah dibeli semenjak 2017, tapi site ini baru
  going live di tahun 2020. Find out why!
categories:
  - tech
  - experience
featuredpost: false
featuredimage: /images/uploads/netlify-cms-admin.png
tags:
  - Netlify
  - Netlify CMS
  - Gatsby
  - React
  - JAM stack
rating: 4
---
## Awal mula

Di ujung tahun 2017, mendekati masa akhir kuliah (sambil mengerjakan skripsi pastinya 👨🏼‍🎓), saya mulai memikirkan perlunya sebuah personal website untuk personal branding dan menyebarkan ilmu kepada lebih banyak orang. Saya lantas membeli domain [alifakbar.com](https://alifakbar.com), sebuah domain dengann nama saya. Kemudian hal berikutnya, saya perlu mulai belajar membuat web. Saya memang berlatar belangkang kuliah di jurusan IT, namun mata kuliah pembuatan web tidak sempat saya ambil. Dari situlah perjalanan saya dimulai.. 🏃🏻

> **Disclaimer**: Saya tidak menjamin semua yang saya ceritakan dibawah ini masih sesuai dengan kondisi terkini.


## \*.github.io

Website pribadi saya yang pertama di host menggunakan fitur static host milik github. Saya cukup mendaftar di website [Github.com](https://github.com) lalu membuat sebuah repository dengan format **\[username].github.io** kemudian github akan secara otomatis menghost repository tersebut dengan halaman home berupa file **/index.html**. Contoh milik saya bisa dilihat di [alifgiant.github.io](https://alifgiant.github.io) dengan [repo](https://github.com/alifgiant/alifgiant.github.io). Sebenarnya website ini bukan saya buat diakhir 2017. 

Saya sudah mulai membuatnya lebih awal sekitar tahun 2015, dalam rangka belajar web mandiri. Pada saat itu saya hanya mencari template gratisan 🤫 lalu mengeditnya sedikit demi sedikit. Saya memasukkan **.github.io** ke dalam list ini karena walaupun sudah lebih dahulu dibuat, karena mungkin buat kamu yang baru mulai belajar, ini bisa menjadi referensi (*after all*, website di github.io sangat mudah untuk dibuat). Tutorial pembuatannya akan saya tulis di blog post berikutnya.

### Kelebihan
- Setup mudah
- Domain suffix **.github.io** sounds _geeky/techy_
- Kapasistas penyimpanan (Repository) hingga 100GB dan maksimum ukuran file 100MB (berasa seperti ∞ blog post)
- **GRATIS**, pas buat yg kantong tipis

### Kekurangan
- Tidak memiliki integrasi database (secara default)
- Tidak bisa menggunakan custom domain
- Tidak bisa mengirim email

Kekurang fitur tidak adanya database ini sangat menganggu, karena menyebabkan saya tidak bisa mengedit konten web tanpa harus melakukan _git push_ secara manual.

## Heroku
Pencarian berlanjut, saya menemukan cloud service bernama [**Heroku**](https://heroku.com). Di heroku kita bisa melakukan deployment sebuah server secara complete, tanpa keribetan berbagai macam konfigurasi. Seperti menginstall runtime dan menginstall database. Semuanya sudah tersedia. Disinilah awal mula saya benar-benar belajar membuat web. Mulai dari backend, restful service, hingga frontend client side render. 

Kurva pembelajaran yang saya lalui sangat tajam. Sebelumnya saya hanya mengedit html namun kini saya harus belajar sangat banyak hal baru, routing, caching, contoller, middleware, _and so much other things_. Sebenarnya pengalaman ini sengat menyenangkan bagi saya yang sangat haus ilmu! Namun, karena saya harus fokus menyelesaikan tugas akhir pembelajaran saya di web harus ditunda.

### Kelebihan
- _Full feature server_
- Terdapat domain default namun juga bisa custom domain, tentunya beli lagi 🤣
- Terdapat paket **GRATIS** untuk _project_ kecil. Pastinya dengan berbagai limitasi, tapi itupun sudah sangat cukup untuk sebuah _blog_ ataupun _website portfolio_ kecil

### Kekurangan
- Tidak semudah yang di-iklan kan, perlu beberapa pengalaman dalam hal _development web_
- Server tidak menyala terus menerus, setelah sekian waktu akan mati, sehingga jika akses web berikutnya akan cukup memakan waktu karena server baru di _restart_
- Di paket gratis, Tidak bisa melakukan request ke alamat url lain _(crossorigin)_

## Firebase Host dan Function
Tepat ketika saya mencari solusi lain, dan saya mendapatkan informasi mengenai sebuah layanan google menyediakan _free hosting_ tentu saya sekita lanjut mencoba nya.