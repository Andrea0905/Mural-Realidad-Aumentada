const storyCard =
  document.querySelector("#story-card");

const storyQuote =
  document.querySelector("#story-quote");

let people = {};

/*
 * Indica si ya existe una historia seleccionada.
 *
 * false = se puede seleccionar una persona
 * true  = la historia actual está bloqueada
 */
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
     * SI YA HAY UNA PERSONA SELECCIONADA,
     * IGNORAMOS CUALQUIER OTRO TARGET.
     */

    if (panelLocked) {

      console.log(
        "Panel bloqueado. Se ignora nuevo reconocimiento."
      );

      return;

    }


    const personId =
      event.detail.personId;


    /*
     * El target 0 es el título/mural.
     * No mostramos panel de profesora.
     */

    if (personId === "titulo") {

      return;

    }


    const person =
      people[personId];


    if (!person) {

      console.warn(
        "No existe información para:",
        personId
      );

      return;

    }


    /*
     * ========================================
     * BLOQUEAMOS LA SELECCIÓN
     * ========================================
     */

    panelLocked = true;


    /*
     * ========================================
     * MOSTRAR SOLAMENTE LA FRASE
     *
     * El nombre ya NO se muestra.
     * ========================================
     */

    storyQuote.textContent =
      person.quote;


    /*
     * ========================================
     * CONFIGURAR AUDIO
     * ========================================
     */

    AudioController.setSource(
      person.audio
    );


    /*
     * ========================================
     * MOSTRAR PANEL
     * ========================================
     */

    storyCard.classList.remove(
      "hidden"
    );


    console.log(
      "Historia seleccionada:",
      personId
    );

  }
);


// ============================================
// TARGET PERDIDO
// ============================================

window.addEventListener(
  "person-lost",
  (event) => {

    /*
     * IMPORTANTE:
     *
     * NO cerramos el panel.
     * NO cambiamos la información.
     * NO desbloqueamos.
     */

    console.log(
      "Target perdido:",
      event.detail?.personId,
      "La historia permanece fija."
    );

  }
);


// ============================================
// DESBLOQUEAR PANEL
// ============================================

function unlockStoryPanel() {

  panelLocked = false;


  /*
   * Limpiar contenido anterior.
   */

  storyQuote.textContent = "";


  /*
   * Ocultar panel.
   */

  storyCard.classList.add(
    "hidden"
  );


  console.log(
    "Panel desbloqueado. Se puede seleccionar otra persona."
  );

}


// ============================================
// HACER FUNCIÓN DISPONIBLE
// PARA EL SISTEMA DEL BOTÓN X
// ============================================

window.unlockStoryPanel =
  unlockStoryPanel;