const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT7AvSKtZDxCSOyCviX5IIRj57OAD06nbiPVuHWX02-urpQmyQkYAxlsmT87zD0bzVDZvbPjrb1sL-X/pub?output=csv";

let dataAset = [];

fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      if (row.length < headers.length) continue;

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

    console.log("DATA LOADED:", dataAset.length);
  });

function cariAset() {
  const input = document.getElementById("reqid").value.trim();

  const hasil = dataAset.find(d => d.req_id === input);

  document.getElementById("hasil").innerHTML = hasil
    ? `
      <p><b>REQ_ID:</b> ${hasil.req_id}</p>
      <p><b>ENTITY:</b> ${hasil.entity}</p>
      <p><b>ENTITY NAME:</b> ${hasil.entity_name}</p>
      <p><b>DEPT:</b> ${hasil.dept}</p>
      <p><b>DESC:</b> ${hasil.desc}</p>
      <p><b>BRAND:</b> ${hasil.brand}</p>
    `
    : "<p style='color:red'>Data tidak ditemukan</p>";
}
