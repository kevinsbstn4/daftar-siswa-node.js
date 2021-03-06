getData();
async function getData() {
  const response = await fetch("/read");
  const json = await response.json();
  console.log(json);
  showData(json);
}

const btnSave = document.getElementById("btn_save");
btnSave.addEventListener("click", async event => {
  const action = btnSave.textContent;

  const nis = document.getElementById("nis").value;
  const nama_pasien = document.getElementById("nama_pasien").value;
  const umur_pasien = document.getElementById("umur_pasien").value;
  const asal_rs = document.getElementById("asal_rs").value;
  const status = document.getElementById("status").value;
  const asal_rumah = document.getElementById("asal_rumah").value;

  let data = {
    nis: nis,
    nama_pasien: nama_pasien,
    umur_pasien: umur_pasien,
    asal_rs: asal_rs,
    status: status,
    asal_rumah: asal_rumah,
    action: action
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  const response = await fetch("/api", options);
  const json = await response.json();
  console.log(json);

  getData();

  $("#exampleModal").modal("hide");

  if (action === "Simpan") {
    $.alert("Data Berhasil ditambah!");
  } else {
    $.alert("Data Berhasil dirubah!");
  }
});

$(document).ready(function() {
  $(".chkbx").click(function() {
    var text = "";
    $(".chkbx:checked").each(function() {
      text += $(this).val() + ",";
    });
    text = text.substring(0, text.length - 1);
    $("#selectedtext").val(text);
    var count = $("[type='checkbox']:checked").length;
    $("#count").val($("[type='checkbox']:checked").length);
  });
});

$(document).ready(function() {
  $("#myForm input").on("change", function() {
    var selvalue = $("[type='radio']:checked").val();
    $("#selvalue").val($("[type='radio']:checked").val());
  });
});

function showData(json) {
  let tr = "";
  $("#databody").html("");
  let no;
  for (let i = 0; i < json.length; i++) {
    no = i + 1;
    tr = $("<tr/>");
    tr.append("<td>" + no + "</td>");
    tr.append("<td>" + json[i].nis + "</td>");
    tr.append("<td>" + json[i].nama_pasien + "</td>");
    tr.append("<td>" + json[i].umur_pasien + "</td>");
    tr.append("<td>" + json[i].asal_rs + "</td>");
    tr.append("<td>" + json[i].status + "</td>");
    tr.append("<td>" + json[i].asal_rumah + "</td>");
    tr.append(
      `
              <td>
                  <button type="button" class="btn btn-warning btnEdit" data-nis="` +
        json[i].nis +
        `">
                      Edit
                  </button>
                  <button type="button" class="btn btn-danger btnHapus" data-nis="` +
        json[i].nis +
        `">
                      Hapus
                  </button>
              </td>`
    );
    $("#databody").append(tr);
  }

  //Jquery Selector
  $(function() {
    $(".btnTambahData").on("click", function() {
      document.getElementById("nis").readOnly = false;
      document.getElementById("nis").value = "";
      document.getElementById("nama_pasien").value = "";
      document.getElementById("umur_pasien").value = "";
      document.getElementById("asal_rs").value = "";
      document.getElementById("status").value = "";
      document.getElementById("asal_rumah").value = "";

      $("#exampleModalLabel").html("Tambah Data Siswa");
      $(".modal-footer button[id=btn_save]").html("Simpan");
    });

    $(".btnEdit").on("click", async function() {
      let nis = $(this).data("nis");
      console.log(nis);

      const url = `readbynis/${nis}`;
      const response = await fetch(url);
      const json = await response.json();
      console.log(json[0].nis);

      document.getElementById("nis").readOnly = true;
      document.getElementById("nis").value = json[0].nis;
      document.getElementById("nama_pasien").value = json[0].nama_pasien;
      document.getElementById("umur_pasien").value = json[0].umur_pasien;
      document.getElementById("asal_rs").value = json[0].asal_rs;
      document.getElementById("status").value = json[0].status;
      document.getElementById("asal_rumah").value = json[0].asal_rumah;

      $("#exampleModalLabel").html("Ubah Data Siswa");
      $(".modal-footer button[id=btn_save]").html("Ubah Data");
      $("#exampleModal").modal("show");
    });

    $(".btnHapus").on("click", async function() {
      let nis = $(this).data("nis");

      $.confirm({
        title: "Hapus Data Siswa",
        content: "Apakah Anda Yakin...???",
        buttons: {
          ya: {
            text: "YA",
            btnClass: "btn-blue",
            action: async function() {
              const url = `hapus/${nis}`;
              const response = await fetch(url);
              const json = await response.json();
              $.alert("Data Berhasil dihapus!");
              getData();
            }
          },
          tidak: function() {}
        }
      });
    });
  });
}
