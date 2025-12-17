/* ================================
   GOOGLE SHEET CSV LINKS
================================ */
const sheetURLs = [
  // HOUSEKEEPING (HK)
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7AvSKtZDxCSOyCviX5IIRj57OAD06nbiPVuHWX02-urpQmyQkYAxlsmT87zD0bzVDZvbPjrb1sL-X/pub?gid=1355133399&single=true&output=csv",

  // IT
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7AvSKtZDxCSOyCviX5IIRj57OAD06nbiPVuHWX02-urpQmyQkYAxlsmT87zD0bzVDZvbPjrb1sL-X/pub?gid=102934549&single=true&output=csv",

  // OFFICE EQUIPMENT
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7AvSKtZDxCSOyCviX5IIRj57OAD06nbiPVuHWX02-urpQmyQkYAxlsmT87zD0bzVDZvbPjrb1sL-X/pubhtml?gid=883800458&single=true&output=csv"
];

let dataAset = [];

/* ================================
   LOAD DATA DARI SEMUA SHEET
================================ */
function loadSheet(url) {
  return fetch(url)
    .then(res => res.text())
    .then(csv => {
      const rows = csv.trim().split("\n");

      for (let i = 1; i < rows.length; i++) {
        const c = rows[i].split(",");

        if (c.length < 7) continue;

        dataAset.push({
          req: c[0].trim(),
          entity: c[1]?.trim() || "",
          name: c[2]?.trim() || "",
          dept: c[3]?.trim() || "",
          desc: c[4]?.trim() || "",
          brand: c[5]?.trim() || ""
        });
      }
    });
}

// Load semua sheet sekaligus
Promise.all(sheetURLs.map(loadSheet))
  .then(() => {
    console.log("✅ Semua data HK, IT, OFFICE berhasil dimuat");
  })
  .catch(err => {
    console.error("❌ Gagal load data:", err);
  });

/* ================================
   SEARCH / CARI ASET
================================ */
function cariAset() {
  const input = document.getElementById("reqid");
  const hasil = document.getElementById("hasil");
  const id = input.value.trim().toUpperCase();

  if (!id) {
    hasil.innerHTML = `<div class="error">Masukkan REQ ID</div>`;
    return;
  }

  const d = dataAset.find(x => x.req.toUpperCase() === id);

  if (!d) {
    hasil.innerHTML = `<div class="error">Data tidak ditemukan</div>`;
    return;
  }

  hasil.innerHTML = `
  <div class="card">
    <div class="card-header">DETAIL ASET</div>
    <div class="card-body">
      <div class="item"><div class="label">REQ ID</div><div class="value">${d.req}</div></div>
      <div class="item"><div class="label">Entity</div><div class="value">${d.entity}</div></div>
      <div class="item"><div class="label">Nama</div><div class="value">${d.name}</div></div>
      <div class="item"><div class="label">Departemen</div><div class="value">${d.dept}</div></div>
      <div class="item"><div class="label">Location</div><div class="value">${d.desc}</div></div>
      <div class="item"><div class="label">Brand</div><div class="value">${d.brand}</div></div>
    </div>
  </div>`;
}

/* ================================
   SCAN BARCODE / QR
================================ */
let qr;

function bukaKamera() {
  const reader = document.getElementById("reader");
  reader.style.display = "block";

  qr = new Html5Qrcode("reader");

  qr.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    text => {
      qr.stop().then(() => {
        reader.style.display = "none";
      });

      document.getElementById("reqid").value = text.trim();
      cariAset();
    },
    err => {}
  );
}

/* ================================
   LINK EKSTERNAL
================================ */
function bukaLaporan() {
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSfNmNSnM3ywD-7QbuQ6h6hAI1xx9P6sbruGXKYGrbn3Y37GPA/viewform",
    "_blank"
  );
}

function bukaDaftar() {
  window.open(
    "https://docs.google.com/spreadsheets/d/1fXFZYyHJnhDpVaMJ8P5UjjZdVe5mYwzz7rxoMmvoHCQ/edit",
    "_blank"
  );
}
