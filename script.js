// ================================
// GOOGLE SHEET (CSV)
// ================================
const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT7AvSKtZDxCSOyCviX5IIRj57OAD06nbiPVuHWX02-urpQmyQkYAxlsmT87zD0bzVDZvbPjrb1sL-X/pub?output=csv";

let dataAset = [];

// ================================
// LOAD DATA
// ================================
fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n");
    for (let i = 1; i < rows.length; i++) {
      const col = rows[i].split(",");
      if (col.length < 7) continue;

      dataAset.push({
        req_id: col[0].trim(),
        no: col[1],
        entity: col[2],
        entity_name: col[3],
        dept: col[4],
        desc: col[5],
        brand: col[6]
      });
    }
  });

// ================================
// CARI ASET
// ================================
function cariAset() {
  const reqid = document.getElementById("reqid").value.trim();
  const hasil = document.getElementById("hasil");

  const data = dataAset.find(d => d.req_id === reqid);

  hasil.innerHTML = data
    ? `
      <div class="card">
        <div class="card-header">DETAIL ASET</div>
        <div class="card-body">
          <div class="data-row"><div class="label">REQ ID</div><div class="value">${data.req_id}</div></div>
          <div class="data-row"><div class="label">Entity</div><div class="value">${data.entity}</div></div>
          <div class="data-row"><div class="label">Entity Name</div><div class="value">${data.entity_name}</div></div>
          <div class="data-row"><div class="label">Departemen</div><div class="value">${data.dept}</div></div>
          <div class="data-row"><div class="label">Deskripsi</div><div class="value">${data.desc}</div></div>
          <div class="data-row"><div class="label">Brand</div><div class="value">${data.brand}</div></div>
        </div>
      </div>
    `
    : `<div class="error">Data tidak ditemukan</div>`;
}

// ================================
// SCAN BARCODE (KAMERA)
// ================================
let html5QrCode;

function bukaKamera() {
  const reader = document.getElementById("reader");
  reader.style.display = "block";

  html5QrCode = new Html5Qrcode("reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 250, height: 150 } },
    (decodedText) => {
      html5QrCode.stop();
      reader.style.display = "none";

      let reqId = decodedText;
      if (decodedText.includes("req_id=")) {
        const params = new URLSearchParams(decodedText.split("?")[1]);
        reqId = params.get("req_id");
      }

      document.getElementById("reqid").value = reqId;
      cariAset();
    }
  );
}

// ================================
// TOMBOL LINK
// ================================
function bukaLaporan() {
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSfNmNSnM3ywD-7QbuQ6h6hAI1xx9P6sbruGXKYGrbn3Y37GPA/viewform",
    "_blank"
  );
}

function bukaDaftar() {
  window.open(
    "https://docs.google.com/spreadsheets/d/1fXFZYyHJnhDpVaMJ8P5UjjZdVe5mYwzz7rxoMmvoHCQ/edit?gid=989863131#gid=989863131",
    "_blank"
  );
}

// ================================
// AUTO SEARCH DARI URL (?req_id=)
// ================================
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const reqId = params.get("req_id");
  if (reqId) {
    document.getElementById("reqid").value = reqId;
    cariAset();
  }
};
