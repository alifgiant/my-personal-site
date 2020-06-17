---
templateKey: blog-post
date: 2020-06-17T11:01:56.515Z
hidepost: false
title: Flutter x VS Code Server = "Mobile" Developer (PART-3)
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
## Instalasi Flutter
Di post sebelumnya (part-2), saya memaparkan bagaimana cara melakukan setup VM dan instalasi VS Code. Sebenarnya tutorial ini bisa berhenti hanya di part-2. Karena sepertinya programmer flutter pasti sudah tau bagaimana cara instalasinya. Tapi demi _kesempurnaan cinta_, eh kelengkapan tutorial sebaiknya step di _cover_ semua. Langkah yang akan dijelaskan disini merupakan gabungan dari 2 guide yang sudah sangat lengkap mengenai [cara install flutter di linux](https://flutter.dev/docs/get-started/install/linux) dan [membuat aplikasi web dengan flutter](https://flutter.dev/docs/get-started/web). 

Oke, langsung saja.. mula mula buka kembali window ssh terminal dari vm mu, lalu..

### Bentar kak, Kok tiba-tiba flutter web? Bukannya ini tutorial mobile?
Ada yang menjadi bingung di paragraph sebelumnya? Jadi begini, tampilan mobile dan web yang dihasilkan flutter ialah sama persis. Apa yang bisa kamu buat untuk di web merupakan representasi yang sama dengan mobile nya. Jadi, untuk _most usecase_ kamu bisa membuat aplikasi web namun juga sekaligus membuat aplikasi mobile nya. 

Lantas bagaimana jika terkait penggunaan sensor? atau penggunaan library yg spesifik mobile? Jika hal itu "tidak kritikal" (bisa ditunda pengerjaannya ke lain waktu) kamu bisa membuat _no-op class_ atau _mock instance_ dari objek yang kamu butuhkan. Simpelnya, bohongi dulu sistem mu seolah itu bekerja, gunakan pengecekan platform untuk memberikan objek yang sesuai atau gunakan mekanisme _depedency injection_. Sedangkan jika hal itu "kritikal" (memang harus fitur itu yang dikerjakan), kamu bisa memanfaatkan pipeline [codemagic.io](https://codemagic.io) untuk mengenerate apk maupun ios.app untuk digunakan pada real device.

Tapi, kalau gitu bagaimana debugging nya? Iyap betul ini masih salah satu kekurangan yang ada, kamu belum bisa melakukan debugging kekinian (breakpoint) dengan cara diatas. Tapi, kamu bisa membuat logging, kan? Nah, buat logging dan kirim logging itu ke firebase. Lihat hasilnya disana, bagaimana, solved?

Oke sekarang beneran ke step tutorial nya..

### Step Instalasi Flutter Web
1. Buat folder "development", folder ini akan menjadi tempat mu menyimpan binary flutter.
```bash
$ mkdir development
```

2. Download binary terbaru flutter.
```bash
$ wget https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_1.17.3-stable.tar.xz
```

3. Extract binary tersebut ke folder "development"
```bash
$ cd ~/development
$ tar xf ~/flutter_linux_1.17.3-stable.tar.xz
```

4. Setup path agar bisa mengakses flutter binary secara global
```bash
$ cd ~/
$ sudo nano .bashrc
# copy line berikut ke paling bawah file
PATH="$PATH:$HOME/development/flutter/bin"
$ sudo source .bashrc
$ flutter doctor
```

5. Sampai langkah ke 4 tadi, sebenarnya instalasi flutter telah selesai tapi kita perlu melanjutkan instalasi untuk mengaktifkan mode development web di flutter. Setelah menyelesaikan langkah ini, kamu akan melihat opsi target build `Web Server • web-server • web-javascript • Flutter Tools`

```bash
$ flutter channel beta
$ flutter upgrade
$ flutter config --enable-web
$ flutter doctor
```

### A little trick

Langkah 5 diatas adalah akhir dari proses instalasi. Kita dapat menjalankan aplikasi flutter (baik existing maupun _project_ baru) sebagai web server, yang mana akan memiliki sebuah port. Perlu di ingat jika menjalankan existing project tidak semua library dapat digunakan perlu dilakukan modifikasi mocking seperti yang disebutkan diatas.

Tapi.. jika kalian perhatikan, port yang diberikan sistem, selalu berubah setiap kali kalian menjalankan

```bash
$ flutter run
```
Lantas apa gunanya kita melakukan setup DNS dilangkah sebelumnya? bukannya kita ingin build ini berada port 3600? Cukup mudah, kalian perlu menambahkan opsi run menjadi:

```bash
$ flutter run --web-port 3600
```

Kita sudah melakukan konfigurasi reverse proxy dan DNS dilangkah sebelumnya, perintah diatas akan menyambungkan semuanya. Semuanya berjalan seperti kartu domino yang berjatuhan.

### UUD - Ujung Ujungnya Duit
Konfigurasi ini tentunya akan menghabiskan uang. Apakah semua hal ini _worth the money_? Kalian bisa mencoba menghitung pengeluaran kalian menggunakan [kalkulator GCP](https://cloud.google.com/products/calculator/). Perlu diperharikan disitu perhitungan harga ialah perbulan atau perjam. Kita bisa menghemat banyak jika setelah menggunakan VM, instance tersebut dimatikan. Yaa, bayangkan aja seperti warnet yang bisa diakses dari mana saja. Asalkan punya tablet yang support keyboard.

Waktu yang saya habiskan untuk melakukan _tinkering_ ini kurang lebih 6 jam secara total (beberapa kali mati-nyala kan VM). Dan ketika saya mengecek billing, saya hanya mendapatkan tagihan kurang dari Rp 10rb. Jadi bayangkan saja kalian sedang jalan ke cafe, beli kopi susu seharga Rp 23rb, keluarkan tablet mulai _code_ dan setelah selesai kalian bisa melihat tagihan yang sama atau malah kurang dari harga kopi susu. Kalian sekarang bisa tetap produktif dan tampil gaya ketika nongkrong, dengan membawa _sling bag_ atau _tote bag_ yang berisi tablet kece kalian. Siapa tau, bisa dapat jodoh kan.. di cafe 😏.

Atau mungkin? kalian ingin presentasi di kantor _client_? Buka tablet, pasang adapter type-c, sambungkan HDMI. Ada yang perlu di tulis? ambil stylus coret-coret. Buka laptop, pake pointer? aww.. _so last decade_. 

Atau.. lagi kuliah di kelas (_disclaimer: kelas anak IT_)? Sambil nyatet nyatet, mau coba algoritma yang dijelaskan dosen? Miringkan tablet, langsuung...

_"Oh Good-Bye Days~~"_ kini saatnya menjadi "mobile" developer. **It's worth or will worth the money** 😎.

---

Mungkin cukup sekian tutorial yang bisa saya jelaskan. Sampai berjumpa di blog post berikutnya 😆.

> Have fun! 

> Ciaoo~