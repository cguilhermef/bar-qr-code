window.addEventListener("load", () => {
  (function () {
    const buttonBack = document.getElementById("bqc-btn-back");
    const buttonChange = document.getElementById("bqc-btn-change");
    const buttonClose = document.getElementById("bqc-btn-close");
    const buttonRead = document.querySelector(".js-bqc-button-read");
    const divOverlay = document.getElementById("bqc-overlay");
    const inputResult = document.querySelector(".js-bqc-result-output");

    let tmpImage = null;
    let tmpInputFile = document.createElement("input");
    tmpInputFile.type = "file";
    tmpInputFile.accept = "image/*";
    tmpInputFile.capture = "camera";

    let codeReader = null;
    let selectedDevice = 0;
    let selectedDeviceId = null;

    // event listeners
    buttonRead.addEventListener("click", () => {
      showOverlay();
      start();
    });

    buttonBack.addEventListener("click", () => {
      hideOverlay();
    });

    buttonChange.addEventListener("click", () => {
      selectedDevice = selectedDevice === 1 ? 0 : 1;
      codeReader.reset();
      start();
    });

    buttonClose.addEventListener("click", () => {
      hideOverlay();
    });

    tmpInputFile.onchange = (event) => {
      // log("change no input");
      tmpImage = new Image();
      tmpImage.src = URL.createObjectURL(event.target.files[0]);
      fromImage();
    };

    // methods
    const showOverlay = () => {
      divOverlay.style.display = "flex";
    };
    const hideOverlay = () => {
      codeReader.reset();
      divOverlay.style.display = "none";
    };

    const fromImage = () => {
      codeReader = new ZXing.BrowserMultiFormatReader();
      // log("iniciado o reader");
      codeReader
        .decodeFromImage(tmpImage)
        .then((result) => {
          // log("pronto");
          // console.log(result);
          inputResult.value = result.text;
        })
        .catch((err) => {
          // log("erro");
          // console.error(err);
          inputResult.value = err;
        });
    };

    const start = () => {
      if (codeReader) {
        codeReader.reset();
        codeReader = null;
      }
      codeReader = new ZXing.BrowserMultiFormatReader();
      codeReader.listVideoInputDevices().then((videoInputDevices) => {
        selectedDeviceId = videoInputDevices[selectedDevice].deviceId;

        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          "video",
          (result, err) => {
            if (result) {
              // console.log(result);
              // log("sucesso", result);
              inputResult.value = result.text;
              hideOverlay();
            }
            if (err && !(err instanceof ZXing.NotFoundException)) {
              // console.error(err);
              // log("error", err);
              inputResult.value = err;
              hideOverlay();
            }
          }
        );
      });
    };

    // const log = (msg) => {
    //   document.getElementById("log").textContent = msg;
    // };
  })();
});
