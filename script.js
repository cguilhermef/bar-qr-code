window.addEventListener("load", () => {
  (function () {
    let codeReader = null;
    let selectedDevice = 0;
    let selectedDeviceId = null;
    let currentFieldTarget = null;

    const methods = {
      showOverlay: () => {
        $("#bqc-overlay").css("display", "flex");
      },
      hideOverlay: () => {
        codeReader.reset();
        codeReader.stopContinuousDecode();
        codeReader = null;
        currentFieldTarget = null;
        $("#bqc-overlay").css("display", "none");
      },
      setValueOnTarget: (target, val) => {
        $(`input[data-pkitem="${target}"]`).val(val);
      },
      start: (fieldTarget) => {
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
                methods.setValueOnTarget(fieldTarget, result.text);
                methods.hideOverlay();
              }
              if (err && !(err instanceof ZXing.NotFoundException)) {
                methods.hideOverlay();
              }
            }
          );
        });
      },
    };

    // event listeners
    $(document).on("click", ".js-bqc-button-read", function () {
      currentFieldTarget = $(this).attr("data-target-item");
      console.log(currentFieldTarget);
      methods.showOverlay();
      methods.start(currentFieldTarget);
    });

    $(document).on("click", "#bqc-btn-back", () => {
      methods.hideOverlay();
    });

    $(document).on("click", "#bqc-btn-change", () => {
      selectedDevice = selectedDevice === 1 ? 0 : 1;
      codeReader.reset();
      methods.start(currentFieldTarget);
    });

    $(document).on("click", "#bqc-btn-close", () => {
      methods.hideOverlay();
    });

    // methods
  })();
});
