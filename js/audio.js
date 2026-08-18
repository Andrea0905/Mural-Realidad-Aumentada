const storyAudio = document.querySelector("#story-audio");
const audioButton = document.querySelector("#audio-button");
const audioButtonLabel = document.querySelector("#audio-button-label");
const audioIcon = audioButton.querySelector(".audio-icon");

let currentAudioSource = "";


// =====================================================
// ACTUALIZAR BOTÓN
// =====================================================

function updateAudioButton(isPlaying) {

  if (isPlaying) {

    audioButtonLabel.textContent = "Pausar audio";
    audioIcon.textContent = "Ⅱ";

  } else {

    audioButtonLabel.textContent = "Reproducir audio";
    audioIcon.textContent = "▶";

  }

}


// =====================================================
// CARGAR AUDIO
// =====================================================

function setAudioSource(src) {

  console.log("=================================");
  console.log("Cargando audio:");
  console.log(src);
  console.log("=================================");


  // Detener audio anterior
  storyAudio.pause();

  storyAudio.currentTime = 0;


  currentAudioSource = src || "";


  // IMPORTANTE:
  // El botón NO se oculta.
  // Siempre debe aparecer para las maestras.

  audioButton.hidden = false;

  audioButton.style.display = "flex";

  audioButton.disabled = false;


  updateAudioButton(false);


  if (!src) {

    console.warn(
      "Esta maestra no tiene una ruta de audio."
    );

    return;

  }


  storyAudio.src = src;

  storyAudio.load();


  console.log(
    "Audio preparado:",
    storyAudio.src
  );

}


// =====================================================
// BOTÓN REPRODUCIR
// =====================================================

audioButton.addEventListener(
  "click",
  async () => {

    console.log(
      "Botón de audio presionado."
    );

    console.log(
      "Audio actual:",
      currentAudioSource
    );


    if (!currentAudioSource) {

      console.warn(
        "No hay audio configurado para esta maestra."
      );

      return;

    }


    if (storyAudio.paused) {

      try {

        await storyAudio.play();

        updateAudioButton(true);

        console.log(
          "Audio reproduciéndose correctamente."
        );

      }

      catch (error) {

        console.error(
          "ERROR AL REPRODUCIR AUDIO:",
          error
        );

      }

    }

    else {

      storyAudio.pause();

      updateAudioButton(false);

    }

  }
);


// =====================================================
// CUANDO TERMINA EL AUDIO
// =====================================================

storyAudio.addEventListener(
  "ended",
  () => {

    updateAudioButton(false);

  }
);


// =====================================================
// ERROR AL CARGAR EL AUDIO
// =====================================================

storyAudio.addEventListener(
  "error",
  () => {

    console.error(
      "NO SE PUDO CARGAR EL AUDIO:"
    );

    console.error(
      storyAudio.src
    );

  }
);


// =====================================================
// CONTROLADOR GLOBAL
// =====================================================

window.AudioController = {

  setSource: setAudioSource,

  stop() {

    storyAudio.pause();

    storyAudio.currentTime = 0;

    updateAudioButton(false);

  }

};