const infoPage = document.querySelector('#info-container');
const closeBtn = document.getElementById('x-btn');

// Lägger till x-knappen och gör den klickbar
closeBtn.addEventListener('click', () => {
    const saturnus = document.querySelector('#Saturnus');
    infoPage.classList.add('hide');
    saturnus.classList.remove('hide-before');
});

// Funktion som hämtar all data om himlakropparna
async function fetchData() {
    // Hämtar API key
    let keyResp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST'
    })
  
    let keyData = await keyResp.json();
    let apiKey = keyData.key;
  
    // Hämtar information från sidan i 'bodies'
    let bodiesResp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
        method: 'GET',
        headers: {'x-zocom': apiKey}
    })
    let bodiesData = await bodiesResp.json();
    return bodiesData;
}

// Funktion för att göra varje himlakropp till en knapp
async function dataBtns() {
    try {
        let bodiesData = await fetchData();
        // console.log('Data himlakroppar:', bodiesData.bodies);

        // Gör en forEach loop på arrayen 'bodiesData.bodies' som går genom varje element i arrayen, där varje element är ett objekt som representerar en himlakropp 'bodie'
        bodiesData.bodies.forEach(bodie => {

            // Varje 'name' i listan blir en knapp med det specifika namnet i varje knapp och får ett id med himlakroppens namn
            const nameBtn = document.createElement('button');
            nameBtn.setAttribute('data-name', bodie.name);
            nameBtn.setAttribute('id', bodie.name);

            // Lägger knapparna i en div i html
            document.getElementById('btns-container').append(nameBtn);

            nameBtn.addEventListener('click', () => {
                bodiesInfo(bodie);
                checkButtonId(nameBtn);
                infoPage.classList.remove('hide');
            });

        })
    } catch (error) {
        console.error('dataBtns', error);
    }
}

// Funktion för att hämta info om varje himlakropp
function bodiesInfo(bodie) {
    try {
        // let bodiesData = await fetchData();
        const infoDiv = document.getElementById('info-div');

        // Skapar en array med namnen på alla månar, med map()-metoden
        // Gör arrayen till en string med join()-metoden och separerar varje mån-namn med kommatecken och mellanslag
        let moonNames = bodie.moons.map(moon => moon).join(', ');

        // Lista med info som hämtas
        infoDiv.innerHTML = 
        `<h2>${bodie.name}</h2>
        <h3>${bodie.latinName}</h3>
        <p>${bodie.desc}</p>
        <div><section><p><span>OMKRETS</span> ${bodie.circumference.toLocaleString()}</p>
        <p><span>KM FRÅN SOLEN</span> ${bodie.distance.toLocaleString()}</p></section>
        <section><p><span>TEMPERATUR DAG</span> ${bodie.temp.day}C</p>
        <p><span>TEMPERATUR NATT</span> ${bodie.temp.night}C</p></section></div>
        <p><span>MÅNAR:</span> ${moonNames}</p>`;

    } catch (error) {
        console.error('bodiesInfo', error);
    }
}

// Funktion för att ändra färg på planeten på infosidan, där man använder knappens id som en nyckel för att hämta rätt färg från objektet 'planetColors'.
function checkButtonId(button) {
    let divElement = document.getElementById('element');
    const saturnus = document.querySelector('#Saturnus');

    let planetColors = {
        'Solen': 'rgba(255, 208, 41, 1)',
        'Merkurius': 'rgba(136, 136, 136, 1)',
        'Venus': 'rgba(231, 205, 205, 1)',
        'Jorden': 'rgba(66, 142, 212, 1)',
        'Mars': 'rgba(239, 95, 95, 1)',
        'Jupiter': 'rgba(226, 148, 104, 1)',
        'Saturnus': 'rgba(199, 170, 114, 1)',
        'Uranus': 'rgba(201, 212, 241, 1)',
        'Neptunus': 'rgba(122, 145, 167, 1)'
    }

    divElement.style.backgroundColor = planetColors[button.id];
    saturnus.classList.add('hide-before');
}

fetchData();
dataBtns();