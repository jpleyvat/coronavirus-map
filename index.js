import styles from './styles.js';

const $map = document.querySelector('#map');

const map = new window.google.maps.Map($map, {
  center: {
    lat: 39.381266,
    lng: -97.922211
  },
  zoom: 4,
  styles: styles
});

renderData();

async function getData() {
  const response = await fetch(
    ' https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest'
    // 'https://coronavirus-tracker-api.herokuapp.com/v2/locations'
    // 'http://shiny.john-coene.com:8080/dxy'
  );
  const data = await response.json();
  return data;
}

const popup = new window.google.maps.InfoWindow();

async function renderData() {
  const data = await getData();
  console.log(data);

  data.forEach(item => {
    if (item.confirmed) {
      const marker = new window.google.maps.Marker({
        position: {
          lat: item.location.lat,
          lng: item.location.lng
        },
        map,
        icon: './virus.png'
      });
      marker.addListener('click', () => {
        popup.setContent(renderMoreData(item));
        popup.open(map, marker);
      });
    }
  });
}

function renderMoreData({
  confirmed,
  deaths,
  recovered,
  provincestate,
  countryregion
}) {
  return `
    <div>
    <p><strong>${provincestate} - ${countryregion}</strong></p>
    <p>Confirmed: ${confirmed}</p>
    <p>Deaths: ${deaths}</p>
    <p>Recovered: ${recovered}</p>
    </div>
    `;
}
