// ================================
// KONFIGURASI GOOGLE SHEET (CSV)
// ================================
const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT7AvSKtZDxCSOyCviX5IIRj57OAD06nbiPVuHWX02-urpQmyQkYAxlsmT87zD0bzVDZvbPjrb1sL-X/pub?output=csv";

let dataAset = [];

// ================================
// LOAD DATA DARI GOOGLE SHEET
// ================================
fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const lines = csv.split("\n");
    
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");

      if (row.length < 7) continue;

      dataAset.push({
        req_id: row[0].trim(),
        no: row[1],
        entity: row[2],
        entity_name: row[3],
        dept: row[4],
        desc: row[5],
        brand: row[6]
      });
    }

    console.log("DATA BERHASIL DIMUAT:", dataAset.length);
  })
  .catch(err => {
    console.error("GAGAL LOAD DATA:", err);
  });

// ================================
// FUNGSI CARI ASET
// ================================
function cariAset() {
  const input = document.getElementById("reqid").value.trim();
  const hasilDiv = document.getElementById("hasil");

  if (!input) {
    hasilDiv.innerHTML = `<div class="error">REQ_ID belum diisi</div>`;
    return;
  }

  const hasil = dataAset.find(d => d.req_id === input);

  hasilDiv.innerHTML = hasil
    ? `
      <div class="card">
        <p><b>REQ_ID:</b> ${hasil.req_id}</p>
        <p><b>ENTITY:</b> ${hasil.entity}</p>
        <p><b>ENTITY NAME:</b> ${hasil.entity_name}</p>
        <p><b>DEPT:</b> ${hasil.dept}</p>
        <p><b>DESKRIPSI:</b> ${hasil.desc}</p>
        <p><b>BRAND:</b> ${hasil.brand}</p>
      </div>
    `
    : `<div class="error">Data tidak ditemukan</div>`;
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
