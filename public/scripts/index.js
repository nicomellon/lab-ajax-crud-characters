console.log("index.js script loaded");

const charactersAPI = new APIHandler("http://localhost:8000");

const charContainer = document.querySelector(".characters-container");

const searchIdInput = document.querySelector(".search-id");
const deleteIdInput = document.querySelector(".delete-id");

const clearList = () => {
  while (charContainer.firstChild) {
    charContainer.removeChild(charContainer.firstChild);
  }
};

const populateList = (character) => {
  const charInfoDiv = document.createElement("div");
  charInfoDiv.classList.add("character-info");

  const charNameDiv = document.createElement("div");
  charNameDiv.classList.add("name");
  charNameDiv.innerText = `Name: ${character.name}`;

  const charOccupationDiv = document.createElement("div");
  charOccupationDiv.classList.add("occupation");
  charOccupationDiv.innerText = `Occupation: ${character.occupation}`;

  const charCartoonDiv = document.createElement("div");
  charCartoonDiv.classList.add("cartoon");
  charCartoonDiv.innerText = `Is a cartoon? ${character.cartoon}`;

  const charWeaponDiv = document.createElement("div");
  charWeaponDiv.classList.add("weapon");
  charWeaponDiv.innerText = `Weapon: ${character.cartoon}`;

  charContainer.appendChild(charInfoDiv);
  charInfoDiv.appendChild(charNameDiv);
  charInfoDiv.appendChild(charOccupationDiv);
  charInfoDiv.appendChild(charCartoonDiv);
  charInfoDiv.appendChild(charWeaponDiv);
};

window.addEventListener("load", () => {
  // FETCH ALL
  document
    .getElementById("fetch-all")
    .addEventListener("click", async (event) => {
      try {
        const responseFromApi = await charactersAPI.getFullList();
        clearList();
        responseFromApi.data.forEach((character) => populateList(character));
      } catch (err) {
        console.error(err);
      }
    });

  // FETCH ONE BY ID
  document
    .getElementById("fetch-one")
    .addEventListener("click", async (event) => {
      try {
        const charId = searchIdInput.value;
        const oneCharacter = await charactersAPI.getOneRegister(charId);
        clearList();

        // if the character exists render in the container, else show invalid ID message
        oneCharacter.data.name
          ? populateList(oneCharacter.data)
          : (charContainer.innerText = "Invalid ID");

        searchIdInput.value = "";
      } catch (err) {
        console.error(err);
        clearList();
        charContainer.innerText = "Invalid ID";
      }
    });

  // DELETE BY ID
  document
    .getElementById("delete-one")
    .addEventListener("click", async (event) => {
      try {
        const charId = deleteIdInput.value;
        await charactersAPI.deleteOneRegister(charId);
        clearList();

        charContainer.innerText = "Character Deleted";
        deleteIdInput.value = "";
      } catch (err) {
        console.error(err);
        clearList();
        charContainer.innerText = "Invalid ID";
      }
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", function (event) {});

  document
    .getElementById("new-character-form")
    .addEventListener("submit", async (event) => {
      try {
        await charactersAPI.createOneRegister(charInfo);
      } catch (err) {
        console.log(err);
      }
    });
});
