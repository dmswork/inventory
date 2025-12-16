const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT7AvSKtZDxCSOyCviX5IIRj57OAD06nbiPVuHWX02-urpQmyQkYAxlsmT87zD0bzVDZvbPjrb1sL-X/pub?output=csv";

let dataAset = [];

// LOAD DATA
fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n");
    for (let i = 1; i < rows.length; i++) {
      const c = rows[i].split(",");
      if (c.length < 7) continue;

      dataAset.push({
        req: c[0].trim(),
        entity: c[2],
        name: c[3],
        dept: c[4],
        desc: c[5],
        brand: c[6]
      });
    }
  });

// SEARCH
function cariAset() {
  const id = reqid.value.trim();
  const hasil = document.getElementById("hasil");

  const d = dataAset.find(x => x.req === id);

  if (!d) {
    hasil.innerHTML = `<div class="error">Data tidak ditemukan</div>`;
    return;
  }

  // Versi lebih rapi dengan tabel
  hasil.innerHTML = `
  <div class="card">
    <div class="card-header">DETAIL ASET</div>
    <table class="card-table">
      <tr><th>REQ ID</th><td>${d.req}</td></tr>
      <tr><th>Entity</th><td>${d.entity}</td></tr>
      <tr><th>Nama</th><td>${d.name}</td></tr>
      <tr><th>Departemen</th><td>${d.dept}</td></tr>
      <tr><th>Deskripsi</th><td>${d.desc}</td></tr>
      <tr><th>Brand</th><td>${d.brand}</td></tr>
    </table>
  </div>`;
}

// SCAN
let qr;
function bukaKamera() {
  reader.style.display = "block";
  qr = new Html5Qrcode("reader");

  qr.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    text => {
      qr.stop();
      reader.style.display = "none";
      reqid.value = text;
      cariAset();
    }
  );
}

// LINK
function bukaLaporan() {
  window.open("https://docs.google.com/forms/d/e/1FAIpQLSfNmNSnM3ywD-7QbuQ6h6hAI1xx9P6sbruGXKYGrbn3Y37GPA/viewform");
}

function bukaDaftar() {
  window.open("https://docs.google.com/spreadsheets/d/1fXFZYyHJnhDpVaMJ8P5UjjZdVe5mYwzz7rxoMmvoHCQ/edit");
}
