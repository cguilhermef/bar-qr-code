window.addEventListener("load", () => {
  (function () {
    let codeReader = null;
    let selectedDevice = 0;
    let selectedDeviceId = null;

    // event listeners
    $(document).on("click", ".js-bqc-button-read", (el) => {
      showOverlay();
      start($(el.target).data("target-pkItem"));
    });

    $(document).on("click", "#bqc-btn-back", () => {
      hideOverlay();
    });

    $(document).on("click", "#bqc-btn-change", () => {
      selectedDevice = selectedDevice === 1 ? 0 : 1;
      codeReader.reset();
      start();
    });

    $(document).on("click", "#bqc-btn-close", () => {
      hideOverlay();
    });

    // methods
    const showOverlay = () => {
      $("#bqc-overlay").css("display", "flex");
    };
    const hideOverlay = () => {
      codeReader.reset();
      codeReader.stopContinuousDecode();
      codeReader = null;
      $("#bqc-overlay").css("display", "none");
    };

    const setValueOnTarget = (target, val) => {
      $(`input[data-pkItem="${target}"]`).val(val);
    };

    const start = (fieldTarget) => {
      if (codeReader) {
        codeReader.reset();
        codeReader = null;
      }
      codeReader = new ZXing.BrowserMultiFormatReader();
      codeReader.listVideoInputDevices().then((videoInputDevices) => {
        selectedDeviceId = videoInputDevices[selectedDevice].deviceId;

        if (videoInputDevices.length > 1) {
          $("#bqc-btn-change").show();
        } else {
          $("#bqc-btn-change").hide();
        }
        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          "video",
          (result, err) => {
            if (result) {
              setValueOnTarget(fieldTarget, result.text);
              hideOverlay();
            }
            if (err && !(err instanceof ZXing.NotFoundException)) {
              hideOverlay();
            }
          }
        );
      });
    };
  })();
});
