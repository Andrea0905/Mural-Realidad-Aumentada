const storyCard =
  document.querySelector("#story-card");

const storyName =
  document.querySelector("#story-name");

const storyQuote =
  document.querySelector("#story-quote");


let people = {};


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
    // MOSTRAR INFORMACIÓN
    // ========================================

    storyName.textContent =
      person.name;

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
      "Panel mostrado:",
      person.name
    );

  }
);


// ============================================
// TARGET PERDIDO
// ============================================
//
// IMPORTANTE:
//
// YA NO OCULTAMOS EL PANEL.
//
// El panel permanecerá fijo hasta
// presionar el botón X.
//

window.addEventListener(
  "person-lost",
  () => {

    console.log(
      "Marcador perdido. El panel permanece fijo."
    );

  }
);