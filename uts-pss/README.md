# UTS PSS — Aplikasi CRUD (Produk & User) + Docker Compose (ExpressJS + MySQL)

Aplikasi web sederhana menggunakan **ExpressJS** (Node.js) dan **MySQL** dengan antarmuka **EJS** untuk melakukan CRUD **Produk** dan **User**, lengkap dengan **Docker Compose** untuk menjalankan multi‑container (**web** + **database**) dengan satu perintah.

## Arsitektur
```
+---------------------+          +----------------------+
|  web (Node.js)      | <------> |  db (MySQL 8)        |
|  Express + EJS      |  TCP     |  Volume: db_data     |
|  Port: 3000         |          |  Init SQL: /docker-entrypoint-initdb.d
+---------------------+          +----------------------+
```

- **Komunikasi:** web ↔ db via network compose (service name `db`).
- **Persistensi:** data MySQL disimpan ke volume `db_data`.
- **Inisialisasi skema:** otomatis via folder `db/init`.

## Jalankan dengan Docker Compose
1. Salin env contoh: `cp .env.example .env`
2. Build & up: `docker-compose up -d --build`
3. Akses: `http://localhost:3000`
4. Hentikan: `docker-compose down` (tambahkan `-v` jika ingin hapus volume)

## Jalankan Lokal (tanpa Docker)
1. Nyalakan MySQL, buat DB `pss_db`.
2. Import `db/init/01_schema.sql`.
3. `cp .env.example .env` dan sesuaikan kredensial.
4. `npm install` lalu `npm run dev`.
5. Buka `http://localhost:3000`.

## Catatan
- Minimal untuk UTS: CRUD **Produk** & **User**.
- Belum ada autentikasi (bisa ditambah).
- Menggunakan prepared statement via `mysql2/promise`.
