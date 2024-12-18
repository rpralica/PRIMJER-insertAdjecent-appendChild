const displayNames = new Intl.DisplayNames(['bs'], { type: 'region' });
function getCountryName(code) {
  return displayNames.of(code.toUpperCase());
}
console.log(getCountryName('RS'));

async function fetchNationality(name) {
  try {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();
    rendernationality(data);
    console.log(data);
  } catch (error) {
    console.error('Greška prilikom poziva API-ja:', error);
  }
}

const tBody = document.getElementById('tBody');
const inpName = document.getElementById('inpName');
const btnShowName = document.getElementById('btnShowName');

function rendernationality(data) {
  data.country.forEach((el, i) => {
    el = `
              <tr>
                <td>${i + 1}</td>
                <td>${getCountryName(data.country[i].country_id)}</td>
                <td>${data.country[i].probability.toFixed(2) * 950}</td>
              </tr>
            </tbody>
    `;
    tBody.insertAdjacentHTML('beforeend', el);
  });
}

btnShowName.addEventListener('click', function () {
  // tBody.innerHTML = '';
  fetchNationality(inpName.value);
});
