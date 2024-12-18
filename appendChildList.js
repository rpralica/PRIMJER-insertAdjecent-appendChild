const displayNames = new Intl.DisplayNames(['bs'], { type: 'region' });

function getCountryName(code) {
  return displayNames.of(code.toUpperCase());
}

async function fetchNationality(name) {
  try {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();
    renderNationality(data);
  } catch (error) {
    console.error('Greška prilikom poziva API-ja:', error);
  }
}

const nameContainer = document.getElementById('nameContainer');
const inpName = document.getElementById('inpName');
const btnShowName = document.getElementById('btnShowName');

function renderNationality(data) {
  // Očistimo sadržaj prije dodavanja nove liste
  nameContainer.innerHTML = '';

  // Kreiramo samo jedan <ul> za sve države
  const ul = document.createElement('ul');
  ul.classList.add('list-group'); // Bootstrap klasa za lijepu listu

  // Dodajemo redove za svaku državu
  data.country.forEach((countryData, i) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item'); // Bootstrap stil za listu
    li.innerHTML = `
      <strong>${i + 1}.</strong> 
      Država: ${getCountryName(countryData.country_id)} 
      | Vjerovatnoća: ${(countryData.probability * 100).toFixed(2)}%
    `;
    ul.appendChild(li); // Dodajemo <li> u <ul>
  });

  // Dodajemo cijelu listu u nameContainer
  nameContainer.appendChild(ul);
}

btnShowName.addEventListener('click', function () {
  const name = inpName.value.trim();
  if (name) {
    fetchNationality(name);
  } else {
    alert('Unesite ime kako biste dobili rezultate.');
  }
});
