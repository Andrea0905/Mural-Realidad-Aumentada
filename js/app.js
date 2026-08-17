const storyCard =
  document.querySelector("#story-card");

const storyQuote =
  document.querySelector("#story-quote");


let people = {};


// ============================================
// ESTADO DEL PANEL
// ============================================

let panelLocked = false;


// ============================================
// CARGAR PEOPLE.JSON
// ============================================

async function loadPeople() {

  try {

    const response =
      await fetch("./data/people.json");

    const data =
      await response.json();

    data.forEach((person) => {

      people[person.id] = person;

    });

    console.log(
      "Personas cargadas:",
      people
    );

  }

  catch (error) {

    console.error(
      "Error cargando people.json:",
      error
    );

  }

}


loadPeople();


// ============================================
// TARGET ENCONTRADO
// ============================================

window.addEventListener(
  "person-found",
  (event) => {

    /*
     * SI YA HAY UNA HISTORIA ABIERTA,
     * NO CAMBIAMOS EL PANEL.
     */

    if (panelLocked) {

      console.log(
        "Panel bloqueado. No se cambia la información."
      );

      return;

    }


    const personId =
      event.detail.personId;


    const person =
      people[personId];


    if (!person) {

      console.warn(
        "No existe información para:",
        personId
      );

      return;

    }


    // ========================================
    // BLOQUEAR PANEL
    // ========================================

    panelLocked = true;


    // ========================================
    // MOSTRAR FRASE
    // ========================================

    storyQuote.textContent =
      person.quote;


    // ========================================
    // CONFIGURAR AUDIO
    // ========================================

    AudioController.setSource(
      person.audio
    );


    // ========================================
    // MOSTRAR PANEL
    // ========================================

    storyCard.classList.remove(
      "hidden"
    );


    console.log(
      "Panel bloqueado para:",
      personId
    );

  }
);


// ============================================
// TARGET PERDIDO
// ============================================

window.addEventListener(
  "person-lost",
  () => {

    /*
     * NO HACEMOS NADA.
     *
     * El panel permanece fijo.
     */

    console.log(
      "Marcador perdido. Panel permanece fijo."
    );

  }
);


// ============================================
// FUNCIÓN PARA CERRAR EL PANEL
// ============================================

function unlockStoryPanel() {

  panelLocked = false;

  storyCard.classList.add(
    "hidden"
  );

  storyQuote.textContent = "";

  console.log(
    "Panel desbloqueado."
  );

}


// ============================================
// HACER DISPONIBLE GLOBALMENTE
// ============================================

window.unlockStoryPanel =
  unlockStoryPanel;