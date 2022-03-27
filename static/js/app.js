new QRCode(document.getElementById("qrcodecanvas"), {
  text: "通过",
  width: 128,
  height: 128,
  colorDark : "green",
  correctLevel : QRCode.CorrectLevel.L
});

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
  }));
}

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

const meta_code_list = [
  '6K6h566X5py65a2m6Zmi77yI5Zu95a6256S66IyD5oCn6L2v5Lu25a2m6Zmi77yJfOW+kOmAuOi+sHwyMDE4MjEzNTU1',
];

const urlParams = new URLSearchParams(window.location.search);
const meta_code = urlParams.get('q')
const code_type = urlParams.get('t')

console.log(meta_code)

const meta = b64DecodeUnicode(meta_code).split('|');
console.log(meta);

document.getElementById("affiliation").innerHTML = "当前部门：" + meta[0];
document.getElementById("affiliation_2").innerHTML = meta[0];
document.getElementById("name").innerHTML = meta[1];
document.getElementById("sid").innerHTML = meta[2];

if (code_type == 0) {
  document.getElementById("code_type").innerHTML = "允许出校";
} else {
  document.getElementById("code_type").innerHTML = "允许入校";
}

document.getElementById("avatar").src = "/files/" + meta[3];

const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const datetime = date + ' ' + time;

console.log("setting datetime to " + datetime)

document.getElementById("datetime").innerHTML = datetime;
