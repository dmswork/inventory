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

  // Versi HP: layout vertikal, mudah dibaca
  hasil.innerHTML = `
  <div class="card">
    <div class="card-header">DETAIL ASET</div>
    <div class="card-body">
      <div class="item"><div class="label">REQ ID</div><div class="value">${d.req}</div></div>
      <div class="item"><div class="label">Entity</div><div class="value">${d.entity}</div></div>
      <div class="item"><div class="label">Nama</div><div class="value">${d.name}</div></div>
      <div class="item"><div class="label">Departemen</div><div class="value">${d.dept}</div></div>
      <div class="item"><div class="label">Deskripsi</div><div class="value">${d.desc}</div></div>
      <div class="item"><div class="label">Brand</div><div class="value">${d.brand}</div></div>
    </div>
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
