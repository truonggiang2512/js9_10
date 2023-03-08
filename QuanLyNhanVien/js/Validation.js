function Validation() {
  this.kiemTraRong = function (value, idError, namee) {
    if (value.trim() === "") {
      document.getElementById(
        idError
      ).innerHTML = `Vui lòng nhập giá trị ${namee} !`;
      return false;
    }
    document.getElementById(idError).innerHTML = "";
    return true;
  };
  this.kiemTraKyTu = function (value, idError, namee) {
    var regexLetter = /\p{Letter}/u;
    if (regexLetter.test(value)) {
      document.getElementById(idError).innerHTML = "";
      return true;
    }
    document.getElementById(idError).innerHTML = `${namee} Không hợp lệ`;
    return false;
  };

  this.kiemTraEmail = function (value, idError, namee) {
    var regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexEmail.test(value)) {
      document.getElementById(idError).innerHTML = "";
      return true;
    }
    document.getElementById(idError).innerHTML = `${namee} Không hợp lệ`;
    return false;
  };
  this.kiemTraSo = function (value, idError, namee) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
      document.getElementById(idError).innerHTML = "";
      return true;
    }
    document.getElementById(idError).innerHTML = ` Vui lòng chọn ${namee} `;
    return false;
  };
  this.kiemTraMatKhau = function (value, idError, namee) {
    var regexMatKhau = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (regexMatKhau.test(value)) {
      document.getElementById(idError).innerHTML = "";
      return true;
    }
    document.getElementById(idError).innerHTML = `${namee} Không hợp lệ`;
    return false;
  };
  this.kiemTraDoDai = function (value, idError, namee, minLength, maxLength) {
    if (value.trim().length < minLength || value.trim().length > maxLength) {
      document.getElementById(
        idError
      ).innerHTML = `${namee} từ ${minLength} đến ${maxLength} ký tự!`;
      return false;
    }
    document.getElementById(idError).innerHTML = "";
    return true;
  };
  this.kiemTraGioiHanSo = function (value, idError, min, max) {
    if (Number(value) < min || Number(value) > max) {
      document.getElementById(
        idError
      ).innerHTML = `nhập giá trị từ ${min} tới ${max}`;
      return false;
    }
    document.getElementById(idError).innerHTML = "";
    return true;
  };
}
