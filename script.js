window.addEventListener("load", () => {
  (function () {
    let codeReader = null;
    let selectedDevice = 0;
    let selectedDeviceId = null;
    let currentFieldTarget = null;

    // event listeners
    $(document).on("click", ".js-bqc-button-read", (el) => {
      currentFieldTarget = $(el.target).attr("data-target-item");
      showOverlay();
      start(currentFieldTarget);
    });

    $(document).on("click", "#bqc-btn-back", () => {
      hideOverlay();
    });

    $(document).on("click", "#bqc-btn-change", () => {
      selectedDevice = selectedDevice === 1 ? 0 : 1;
      codeReader.reset();
      start(currentFieldTarget);
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
      currentFieldTarget = null;
      $("#bqc-overlay").css("display", "none");
    };

    const setValueOnTarget = (target, val) => {
      $(`input[data-pkitem="${target}"]`).val(val);
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
