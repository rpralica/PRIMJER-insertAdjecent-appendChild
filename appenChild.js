const displayNames = new Intl.DisplayNames(['bs'], { type: 'region' });

function getCountryName(code) {
  return displayNames.of(code.toUpperCase());
}

async function fetchNationality(name) {
  try {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();
    renderNationality(data);
    console.log(data);
  } catch (error) {
    console.error('Greška prilikom poziva API-ja:', error);
  }
}

const nameContainer = document.getElementById('nameContainer');
const inpName = document.getElementById('inpName');
const btnShowName = document.getElementById('btnShowName');

function renderNationality(data) {
  // Čistimo sadržaj da ne bismo duplirali tabele
  nameContainer.innerHTML = '';

  // Kreiramo tabelu samo JEDNOM
  const table = document.createElement('table');
  table.classList.add('table', 'table-borderless');
  table.style.fontSize = 'larger';
  table.style.textAlign = 'center';

  // Dodajemo thead (samo jednom)
  table.innerHTML = `
    <thead>
      <tr>
        <th>#</th>
        <th>Država</th>
        <th>Vjerovatnoća</th>
      </tr>
    </thead>
    <tbody id="tBody"></tbody> 
  `;

  // Dodajemo cijelu tabelu u nameContainer
  nameContainer.appendChild(table);

  const tBody = table.querySelector('#tBody');

  // Dodajemo redove za svaku državu
  data.country.forEach((countryData, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${getCountryName(countryData.country_id)}</td>
      <td>${(countryData.probability * 100).toFixed(2)}%</td>
    `;
    tBody.appendChild(row); // Dodajemo red u tbody
  });
}

btnShowName.addEventListener('click', function () {
  const name = inpName.value.trim();
  if (name) {
    fetchNationality(name);
  } else {
    alert('Unesite ime kako biste dobili rezultate.');
  }
});
