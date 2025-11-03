const image = document.getElementById("hover-image-extension2");
const dropdown = document.getElementById("dropdown-content-extension2");

image.addEventListener("click", function (e) {
  e.stopPropagation(); 
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
    net_contract_dropdown.style.display = "none";
  }
});

const net_contract_Icon = document.getElementById("net_contract_Icon");
const net_contract_dropdown = document.getElementById("net_contract_dropdown");

net_contract_Icon.addEventListener("click", function (e) {
  e.stopPropagation(); 
  if (net_contract_dropdown.style.display === "block") {
    net_contract_dropdown.style.display = "none";
  } else {
    net_contract_dropdown.style.display = "block";
    dropdown.style.display = "none";
  }
});

document.addEventListener("click", function (e) {
  if (!dropdown.contains(e.target) && !image.contains(e.target)) {
    dropdown.style.display = "none";
  }
  
  if (!net_contract_dropdown.contains(e.target) && !net_contract_Icon.contains(e.target)) {
    net_contract_dropdown.style.display = "none";
  }
});

dropdown.addEventListener("click", function (e) {
  e.stopPropagation();
});

net_contract_dropdown.addEventListener("click", function (e) {
  e.stopPropagation();
});
document.addEventListener("DOMContentLoaded", function () {
  var formElements = document.querySelectorAll(
    "#contract-extension2-form input, #contract-extension2-form select, #contract-extension2-form textarea"
  );
  var firstInput = document.getElementById("days-number-input");

  firstInput.focus();

  formElements.forEach((element, index) => {
    element.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        var nextElement = formElements[index + 1];
        if (nextElement) {
          nextElement.focus();
        } else {
          document.getElementById("contract-extension2-form").submit();
        }
      }
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // //////////////////////////////////////////////// رفع صورة التوقيع ////////////////////////////////////////////////////////////////////////

//variables//
let saveSignatureBtn = null;

document
  .getElementById("UploadSigntaurePic")
  .addEventListener("click", function () {
    saveSignatureBtn = "UploadSigntaurePic";
  });

document
  .getElementById("WriteSignature")
  .addEventListener("click", function () {
    saveSignatureBtn = "WriteSignature";
  });
const uploadContainer = document.querySelector(".upload-container");
const mainContainer = document.querySelector(".Signature-main-container");
const UploadSigntaurePic = document.getElementById("UploadSigntaurePic");
const imageUpload = document.getElementById("imageUpload");
var imgeURL;
const uploadedImg = null;
//

UploadSigntaurePic.addEventListener("click", function () {
  imageUpload.click();
});

imageUpload.addEventListener("change", async function () {
  const file = imageUpload.files[0];
  if (!file) return;

  const isHEIC =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif");

  const handleSignaturePreview = (dataURL) => {
    const previewImage = document.createElement("img");
    previewImage.classList.add("preview-image");
    previewImage.src = dataURL;
    previewImage.id = "signatureImage";
    imgeURL = dataURL;

    mainContainer.innerHTML =
      '<i class="fa-regular fa-circle-xmark xmark-icon"></i>';
    uploadContainer.innerHTML = "";
    uploadContainer.appendChild(previewImage);
    uploadContainer.classList.add("previewing");
  };

  if (isHEIC) {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9,
      });

      const reader = new FileReader();
      reader.onload = function (e) {
        handleSignaturePreview(e.target.result);
      };
      reader.readAsDataURL(convertedBlob);
    } catch (err) {
      console.error("HEIC conversion failed", err);
      alert("فشل تحويل صورة HEIC، يرجى اختيار صورة بصيغة أخرى.");
    }
  } else {
    const reader = new FileReader();
    reader.onload = function (e) {
      handleSignaturePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

removeSignatureImg.addEventListener("click", function (event) {
  event.preventDefault();
  if (uploadContainer.firstChild) {
    uploadContainer.innerHTML = "";
    mainContainer.innerHTML = "";
    uploadContainer.classList.remove("previewing");
    uploadContainer.innerHTML =
      ' <img class="upload-icon" src="img/Rectangle 144.png" alt="Upload Icon"><p>ارفق صورة التوقيع</p>';
  }
});
// // //////////////////////////////////////////////// كتابة التوقيع ////////////////////////////////////////////////////////////////////////
const WriteSignature = document.getElementById("WriteSignature");
WriteSignature.addEventListener("click", function () {
  document.body.classList.add("no-scroll");
  uploadContainer.innerHTML = "";
  mainContainer.innerHTML = "";
  uploadContainer.innerHTML =
    '<canvas id="canvas" width="200" height="200" class="mb-2  bg-white"></canvas>';
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 4;

  var drawing = false;
  var prevX = 0;
  var prevY = 0;
  var currX = 0;
  var currY = 0;

  function drawLine(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
  }

  canvas.addEventListener("mousedown", handleMouseDown, false);
  canvas.addEventListener("mousemove", handleMouseMove, false);
  canvas.addEventListener("mouseup", handleMouseUp, false);

  canvas.addEventListener("touchstart", handleTouchStart, false);
  canvas.addEventListener("touchmove", handleTouchMove, false);
  canvas.addEventListener("touchend", handleTouchEnd, false);

  function handleMouseDown(e) {
    drawing = true;
    prevX = e.clientX - canvas.getBoundingClientRect().left;
    prevY = e.clientY - canvas.getBoundingClientRect().top;
  }

  function handleMouseMove(e) {
    if (!drawing) return;
    currX = e.clientX - canvas.getBoundingClientRect().left;
    currY = e.clientY - canvas.getBoundingClientRect().top;

    drawLine(prevX, prevY, currX, currY);
    prevX = currX;
    prevY = currY;
  }

  function handleMouseUp() {
    drawing = false;
  }

  function handleTouchStart(e) {
    drawing = true;
    prevX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    prevY = e.touches[0].clientY - canvas.getBoundingClientRect().top;
  }

  function handleTouchMove(e) {
    if (!drawing) return;
    currX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    currY = e.touches[0].clientY - canvas.getBoundingClientRect().top;

    drawLine(prevX, prevY, currX, currY);
    prevX = currX;
    prevY = currY;
  }

  function handleTouchEnd() {
    drawing = false;
  }
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  document.getElementById("clear").addEventListener("click", function () {
    clearCanvas();
  });
});
function SaveWrittenSignature() {
  document.body.classList.remove("no-scroll");
  var canvas = document.getElementById("canvas");
  var dataURL = canvas.toDataURL();
  var link = document.createElement("a");
  link.href = dataURL;
  console.log(link.href);
  $("#signature-modal").modal("hide");
}
// Save the uploded signature image
function SaveUplodedSignature() {
  const img = document.getElementById("signatureImage");
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext("2d");
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  const base64 = canvas.toDataURL("image/png");
  console.log(base64);
  $("#signature-modal").modal("hide");
}
document.getElementById("save").addEventListener("click", function () {
  if (saveSignatureBtn === "UploadSigntaurePic") {
    SaveUplodedSignature();
  } else if (saveSignatureBtn === "WriteSignature") {
    SaveWrittenSignature();
  } else {
    console.log("No button has been clicked yet");
  }
});
