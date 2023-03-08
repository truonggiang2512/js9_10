/* input bài toán:
Tài khoản, họ tên,email,mật khẩu,ngày,lương cơ bản chức vụ,giờ làm 
progress :
+ nếu chức vụ là giám đốc: tổng lương = lương cơ bản * 3
+ nếu chức vụ là trưởng phòng: tổng lương = lương cơ bản * 2
+ nếu chức vụ là nhân viên: tổng lương = lương cơ bản *
- xếp loại
+nếu nhân viên có giờ làm trên 192h (>=192): nhân viên xuất sắc
+nếu nhân viên có giờ làm trên 176h (>=176): nhân viên giỏi
+nếu nhân viên có giờ làm trên 160h (>=160): nhân viên khá
+nếu nhân viên có giờ làm dưới 160h: nhân viên trung bình
Xóa nhân viên
+ Cập nhật nhân viên (có validation)
+ Tìm Nhân Viên theo loại (xuất săc, giỏi, khá...) và hiển thị
output:
htmlString` (tạo ra một mảng chứa các phần tử tr td bên trong cho
chạy vòng lặp duyệt mảng trong table để tạo ra các nhân viên chứa các input đã cho  )`
*/

/*---------------- */
//input
mangNhanVien = [];
var kiemtra = new Validation();
document.getElementById("btnThemNV").onclick = function () {
  //input nhanvien.NhanVien
  var nv = new NhanVien();
  nv.taiKhoan = document.querySelector("#tknv").value;
  nv.hoTen = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.ngayLam = document.querySelector("#datepicker").value;
  nv.chucVu = document.querySelector("#chucvu").value;
  nv.luongCoBan = document.querySelector("#luongCB").value;
  nv.heSoChucVu = document.querySelector("#chucvu").value;
  nv.gioLam = document.querySelector("#gioLam").value;
  nv.matKhau = document.querySelector("#password").value;

  console.log(nv);
  nv.tongLuong = nv.luongCoBan * nv.heSoChucVu;
  //kiem tra chuc vu
  valid = kiemtra.kiemTraSo(nv.chucVu, "tbChucVu", "Chức Vụ");
  var tagSelect = document.getElementById("chucvu");
  var viTri = tagSelect.selectedIndex;
  var chucvu = tagSelect.options[viTri].innerHTML;
  nv.chucVu = chucvu;

  if (Number(nv.gioLam) >= 192) {
    nv.xepLoai = "Xuất Sắc";
  } else if (Number(nv.gioLam) < 192 && Number(nv.gioLam) >= 176) {
    nv.xepLoai = "Giỏi";
  } else if (Number(nv.gioLam) < 176 && Number(nv.gioLam) >= 160) {
    nv.xepLoai = "Khá";
  } else if (Number(nv.gioLam) <= 160) {
    nv.xepLoai = "Trung Bình";
  }

  //   finddingRenderTableNhanVien(nv.xepLoai);
  if (nv.gioLam >= 192) {
    console.log("vd1", Object.values(nv));
  } else if (nv.gioLam < 192 && nv.gioLam >= 176) {
    console.log("vd2", Object.values(nv));
  } /* -----------------Validation-------------- */
  //Khoảng trắng
  var valid = true;
  //  Kiểm tra mật khẩu
  valid = kiemtra.kiemTraMatKhau(nv.matKhau, "error-matKhau", "Mật khẩu");
  if (!valid) {
    return;
  }
  valid =
    kiemtra.kiemTraRong(nv.taiKhoan, "error-required-taiKhoan", "Tài Khoản") &
    kiemtra.kiemTraRong(nv.hoTen, "error-required-hoTen", "Họ Tên") &
    kiemtra.kiemTraRong(nv.email, "error-required-email", "Email") &
    kiemtra.kiemTraRong(nv.matKhau, "error-required-matKhau", "Mật Khẩu") &
    kiemtra.kiemTraRong(nv.luongCoBan, "error-required-luong", "Lương cơ bản") &
    kiemtra.kiemTraRong(nv.gioLam, "error-required-gioLam", "Giờ làm") &
    kiemtra.kiemTraRong(nv.ngayLam, "tbNgay", "Ngày làm");

  //Kiếm tra ký tự
  valid = kiemtra.kiemTraKyTu(nv.hoTen, "error-hoTen", "Họ tên");
  // Kiểm tra Email
  valid = kiemtra.kiemTraEmail(nv.email, "error-email", "Email");
  //Kiem tra gioi han
  valid = kiemtra.kiemTraGioiHanSo(
    nv.luongCoBan,
    "error-luong",
    1000000,
    20000000
  );
  valid = kiemtra.kiemTraGioiHanSo(nv.gioLam, "error-gioLam", 80, 200);
  // Kiểm tra độ dài
  valid =
    kiemtra.kiemTraDoDai(nv.taiKhoan, "error-taiKhoan", "Tai Khoan", 1, 6) &
    kiemtra.kiemTraDoDai(nv.matKhau, "error-pass", "Mật Khẩu", 6, 10);

  if (!valid) {
    return;
  }

  mangNhanVien.push(nv);
  luuStorage();
  renderTableNhanVien(mangNhanVien);
  //progress
};

//output

/*------------function--------------- */

function renderTableNhanVien(arrNhanVien) {
  var htmlString = "";
  for (var index = 0; index < arrNhanVien.length; index++) {
    var nv = arrNhanVien[index];
    htmlString += `
    <tr>
    <td>${nv.taiKhoan}</td>
    <td>${nv.hoTen}</td>
    <td>${nv.email}</td>
    <td>${nv.ngayLam}</td>
    <td>${nv.chucVu}</td>
    <td>${nv.tongLuong}</td>
    <td>${nv.xepLoai}</td>
    <td> <button class=" btn btn-danger" onclick=" xoaPhanTuTheoTenDangNhap ('${nv.taiKhoan}')">Xoá</button>
    <button class="btn btn-primary my-3"data-toggle="modal"
    data-target="#myModal" onclick="layThongTin('${nv.taiKhoan}')">Chỉnh sửa </button></td>

    </tr>
    `;
  }
  document.getElementById("tableDanhSach").innerHTML = htmlString;
  console.log("index1", index);
  return htmlString;
}
function layThongTin(taiKhoanClick) {
  //input maSinhVien

  //output object[index]
  for (var index = 0; index < mangNhanVien.length; index++) {
    if (mangNhanVien[index].taiKhoan === taiKhoanClick) {
      document.getElementById("btnThemNV").disabled = true;
      document.getElementById("tknv").disabled = true;
      document.querySelector("#tknv").value = mangNhanVien[index].taiKhoan;
      document.querySelector("#name").value = mangNhanVien[index].hoTen;
      document.querySelector("#email").value = mangNhanVien[index].email;
      document.querySelector("#datepicker").value = mangNhanVien[index].ngayLam;
      document.querySelector("#luongCB").value = mangNhanVien[index].luongCoBan;
      document.querySelector("#chucvu").value = mangNhanVien[index].chucVu;
      document.querySelector("#gioLam").value = mangNhanVien[index].gioLam;
      document.querySelector("#password").value = mangNhanVien[index].matKhau;
      document.querySelector("#chucvu").value = mangNhanVien[index].heSoChucVu;
      break;
    }
  }
}
debugger;
document.getElementById("btnUpdate").onclick = function () {
  var cnnv = new NhanVien();
  cnnv.taiKhoan = document.querySelector("#tknv").value;
  cnnv.hoTen = document.querySelector("#name").value;
  cnnv.email = document.querySelector("#email").value;
  cnnv.ngayLam = document.querySelector("#datepicker").value;
  cnnv.luongCoBan = document.querySelector("#luongCB").value;
  cnnv.heSoChucVu = document.querySelector("#chucvu").value;
  cnnv.gioLam = document.querySelector("#gioLam").value;
  cnnv.matKhau = document.querySelector("#password").value;
  cnnv.chucVu = document.querySelector("#chucvu").value;
  cnnv.heSoChucVu = document.querySelector("#chucvu").value;
  cnnv.tongLuong = cnnv.luongCoBan * cnnv.heSoChucVu;
  if (Number(cnnv.gioLam) >= 192) {
    cnnv.xepLoai = "Xuất Sắc";
  } else if (Number(cnnv.gioLam) < 192 && Number(cnnv.gioLam) >= 176) {
    cnnv.xepLoai = "Giỏi";
  } else if (Number(cnnv.gioLam) < 176 && Number(cnnv.gioLam) >= 160) {
    cnnv.xepLoai = "Khá";
  } else if (Number(cnnv.gioLam) <= 160) {
    cnnv.xepLoai = "Trung Bình";
  }
  valid = kiemtra.kiemTraSo(cnnv.chucVu, "tbChucVu", "Chức Vụ");
  if (!valid) {
    return;
  }
  var tagSelect = document.getElementById("chucvu");
  var viTri = tagSelect.selectedIndex;
  var chucvu = tagSelect.options[viTri].innerHTML;
  cnnv.chucVu = chucvu;
  var valid = true;
  //  Kiểm tra mật khẩu
  valid = kiemtra.kiemTraMatKhau(cnnv.matKhau, "error-matKhau", "Mật khẩu");
  if (!valid) {
    return;
  }
  valid =
    kiemtra.kiemTraRong(cnnv.taiKhoan, "error-required-taiKhoan", "Tài Khoản") &
    kiemtra.kiemTraRong(cnnv.hoTen, "error-required-hoTen", "Họ Tên") &
    kiemtra.kiemTraRong(cnnv.email, "error-required-email", "Email") &
    kiemtra.kiemTraRong(cnnv.matKhau, "error-required-matKhau", "Mật Khẩu") &
    kiemtra.kiemTraRong(
      cnnv.luongCoBan,
      "error-required-luong",
      "Lương cơ bản"
    ) &
    kiemtra.kiemTraRong(cnnv.gioLam, "error-required-gioLam", "Giờ làm") &
    kiemtra.kiemTraRong(cnnv.ngayLam, "tbNgay", "Ngày làm");
  if (!valid) {
    return;
  }
  //Kiếm tra ký tự
  valid =
    kiemtra.kiemTraGioiHanSo(
      cnnv.luongCoBan,
      "error-luong",
      1000000,
      20000000
    ) & kiemtra.kiemTraGioiHanSo(cnnv.gioLam, "error-gioLam", 80, 200);
  if (!valid) {
    return;
  }
  valid = kiemtra.kiemTraKyTu(cnnv.hoTen, "error-hoTen", "Họ tên");
  // Kiểm tra Email
  valid = kiemtra.kiemTraEmail(cnnv.email, "error-email", "Email");
  if (!valid) {
    return;
  }
  // Kiểm tra độ dài
  valid =
    kiemtra.kiemTraDoDai(cnnv.taiKhoan, "error-taiKhoan", "Tai Khoan", 1, 6) &
    kiemtra.kiemTraDoDai(cnnv.matKhau, "error-pass", "Mật Khẩu", 6, 10);

  if (!valid) {
    return;
  }

  for (var index = 0; index < mangNhanVien.length; index++) {
    if (mangNhanVien[index].taiKhoan === cnnv.taiKhoan) {
      mangNhanVien[index].hoTen = cnnv.hoTen;
      mangNhanVien[index].email = cnnv.email;
      mangNhanVien[index].ngayLam = cnnv.ngayLam;
      mangNhanVien[index].chucVu = cnnv.chucVu;
      mangNhanVien[index].luongCoBan = cnnv.luongCoBan;
      mangNhanVien[index].ChucVu = cnnv.chucVu;
      mangNhanVien[index].gioLam = cnnv.gioLam;
      mangNhanVien[index].matKhau = cnnv.matKhau;
      mangNhanVien[index].chucVu = cnnv.chucVu;
      mangNhanVien[index].tongLuong = cnnv.tongLuong;
      mangNhanVien[index].xepLoai = cnnv.xepLoai;
      break;
    }
  }
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
  luuStorage();
  renderTableNhanVien(mangNhanVien);
};

// function xoaPhanTu(indexDel) {
//   mangNhanVien.splice(indexDel, 1);
//   renderTableNhanVien(mangNhanVien);
// }
function xoaPhanTuTheoTenDangNhap(tenDangNhapVao) {
  indexDel = -1;
  for (index = 0; index < mangNhanVien.length; index++) {
    if (mangNhanVien[index].taiKhoan === tenDangNhapVao) {
      indexDel = index;
      break;
    }
  }
  mangNhanVien.splice(indexDel, 1);
  //Tao lai bang table Sinh Vien
  luuStorage();
  renderTableNhanVien(mangNhanVien);
  console.log("cnnv", cnnv);
}
function luuStorage() {
  var stringMangNhanVien = JSON.stringify(mangNhanVien);
  localStorage.setItem("mangNhanVien", stringMangNhanVien);
}
function layStorage() {
  if (localStorage.getItem("mangNhanVien")) {
    var stringMangNhanVien = localStorage.getItem("mangNhanVien");
    mangNhanVien = JSON.parse(stringMangNhanVien);
  }
  renderTableNhanVien(mangNhanVien);
}
layStorage();
// funcition tim kiem nhan vien
document.getElementById("searchName").oninput = function () {
  var tuKhoa = document.getElementById("searchName").value;
  var mangNhanVienTimKiem = [];
  tuKhoa = tuKhoa.toLowerCase().trim();
  tuKhoa = stringToSlug(tuKhoa);
  for (var index = 0; index < mangNhanVien.length; index++) {
    var nv = mangNhanVien[index];
    // so sanh coi co === voi value nhap vao hay khong
    var xepLoai = stringToSlug(nv.xepLoai); // xếp loại của nhân viên thứ n
    if (xepLoai.search(tuKhoa) !== -1) {
      mangNhanVienTimKiem.push(nv);
    }
  }
  renderTableNhanVien(mangNhanVienTimKiem);
};
function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
}
