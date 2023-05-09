const APP = {
    
    urls: {
        base: 'https://swapi.dev/api/',
        People: 'people/',
        Planets: 'planets/',
        Films: 'films/',
        Species: 'species/',
        Vehicles: 'vehicles/',
        Starships: 'starships/',
    },
    init: () => {
        APP.addListeners();
        APP.buildNav();
    },
    addListeners: () => {
        let nav = document.getElementById('nav');
        nav.addEventListener('click', APP.getData);
        footer.addEventListener('click', APP.getData);
    },
    buildNav: () => {
        let df = new DocumentFragment();
        for (let nm in APP.urls) {
          if (nm != 'base') {
              let link = document.createElement('a');
              link.href = `${APP.urls.base}${APP.urls[nm]}`;
              link.textContent = nm;
              link.setAttribute('data-link', `${APP.urls.base}${APP.urls[nm]}`);
              df.append(link);
          }
        }
        document.getElementById('nav').append(df);
    },
    getData: (ev) => {
        if (ev) ev.preventDefault();
      //show overlay / loader
        document.querySelector('.overlay').classList.add('active');
      //get the url
        let link = ev.target;
        let url = link.getAttribute('data-link');
      //fetch the data
        fetch(url)
        .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then(APP.buildList)
        .catch((err) => {
            console.error(err);
            document.querySelector('.overlay').classList.remove('active');
        });
      //call the build function
    },
    buildList: (data) => {
        let m = document.getElementById('main');
        console.log(data);
        console.log(data.next);
        console.log(data.previous);
        if(data.next != null){
          if (data.next.toString().includes("people")){
          //PEOPLE//
              console.log("people")
            //hide the overlay / loader
              document.querySelector('.overlay').classList.remove('active');
            //add the data
              m.innerHTML = data.results
              .map((item) => { 
                // <p>Homeworld: ${item.homeworld}</p>
                //<p>Movie appearances: ${item.films[0]}</p>
                //<p>Flown starships: ${item.starships}</p>
                //<p>Species: ${item.species}</p>
                  let gm = item.gender.charAt(0).toUpperCase() + item.gender.slice(1);
                  let hm = item.hair_color.charAt(0).toUpperCase() + item.hair_color.slice(1);
                  let em = item.eye_color.charAt(0).toUpperCase() + item.eye_color.slice(1);
                  let nm = item.name || item.title;
                  return `<div class="tarjeta">
                  <h1 class="elemento">${nm}</h1>
                  <p>Birth year: ${item.birth_year}.</p>
                  <p>Gender: ${gm}.</p>
                  <p>Hair color: ${hm}.</p>
                  <p>Eye color: ${em}.</p>
                  </div>`;
              })
              .join(' ');
            //add the prev/next navigation
              let footer = document.getElementById('footer');
              footer.innerHTML = '';
              if (data.previous) {
            //previous link
                let prev = document.createElement('a');
                prev.classList.add('ant');
                prev.href = data.previous;
                let url = new URL(data.previous);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                prev.textContent = `<< Previous ${label}`;
                prev.setAttribute('data-link', data.previous);
                footer.append(prev);
                }
              if (data.next) {
            //next link
                let next = document.createElement('a');
                next.classList.add('desp');
                next.href = data.next;
                let url = new URL(data.next);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                next.textContent = `Next ${label} >>`;
                next.setAttribute('data-link', data.next);
                footer.append(next);
                }
          }else if (data.next.toString().includes("species")){
          //SPECIES//
                console.log("species")
              //hide the overlay / loader
              document.querySelector('.overlay').classList.remove('active');
              //add the data
              m.innerHTML = data.results
              .map((item) => { 
              //<p>Homeworld: ${item.homeworld}</p>
              //<p>People: ${item.people}</p>
              //<p>Movie appearances: ${item.films }</p>
                  let cm = item.classification.charAt(0).toUpperCase() + item.classification.slice(1);
                  let dm = item.designation.charAt(0).toUpperCase() + item.designation.slice(1);
                  let om = item.hair_colors.charAt(0).toUpperCase() + item.hair_colors.slice(1);
                  let pm = item.eye_colors.charAt(0).toUpperCase() + item.eye_colors.slice(1);
                  let nm = item.name || item.title;
                  return `<div class="tarjeta">
                  <h1 class="elemento">${nm}</h1>
                  <p>Classification: ${cm}</p>
                  <p>Designation: ${dm}</p>
                  <p>Average height: ${item.average_height} cm.</p>
                  <p>Average lifespan: ${item.average_lifespan} years.</p>
                  <p>Hair colors: ${om}.</p>
                  <p>Eye colors: ${pm}.</p>
                  <p>Language: ${item.language}.</p>                 
                  </div>`;
              })
              .join(' ');
            //add the prev/next navigation
              let footer = document.getElementById('footer');
              footer.innerHTML = '';
              if (data.previous) {
            //previous link
                let prev = document.createElement('a');
                prev.classList.add('ant');
                prev.href = data.previous;
                let url = new URL(data.previous);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                prev.textContent = `<< Previous ${label}`;
                prev.setAttribute('data-link', data.previous);
                footer.append(prev);
                }
              if (data.next) {
            //next link
                let next = document.createElement('a');
                next.classList.add('desp');
                next.href = data.next;
                let url = new URL(data.next);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                next.textContent = `Next ${label} >>`;
                next.setAttribute('data-link', data.next);
                footer.append(next);
                }
          }else if (data.next.toString().includes("starships")){
          //STARSHIPS//
                console.log("starships")
                //hide the overlay / loader
                document.querySelector('.overlay').classList.remove('active');
              //add the data
              m.innerHTML = data.results
              .map((item) => { 
                //<p>Movie appearances: ${item.films}</p>
                //<p>Pilots: ${item.pilots}</p>
                  let cm = item.starship_class.charAt(0).toUpperCase() + item.starship_class.slice(1);
                  let nm = item.name || item.title;
                  return `<div class="tarjeta">
                  <h1 class="elemento">${nm}</h1>
                  <p>Model: ${item.model}.</p>
                  <p>Starship class: ${cm}.</p>
                  <p>Manufacturer: ${item.manufacturer}.</p>
                  <p>Cost: ${item.cost_in_credits} Galactic credits.</p>
                  <p>Length: ${item.length} meters.</p>
                  <p>Crew: ${item.crew}.</p>
                  <p>Passengers: ${item.passengers}.</p>
                  <p>Max. Atmospheric speed: ${item.max_atmosphering_speed} Km/h.</p>
                  <p>Hyperdrive rating: ${item.hyperdrive_rating}.</p>
                  <p>Maximum number of Megalights: ${item.MGLT}.</p>
                  <p>Cargo capacity: ${item.cargo_capacity} Kg.</p>
                  <p>Consumables: ${item.consumables}.</p>
                  </div>`;
              })
              .join(' ');
            //add the prev/next navigation
              let footer = document.getElementById('footer');
              footer.innerHTML = '';
      
              if (data.previous) {
            //previous link
                let prev = document.createElement('a');
                prev.classList.add('ant');
                prev.href = data.previous;
                let url = new URL(data.previous);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                prev.textContent = `<< Previous ${label}`;
                prev.setAttribute('data-link', data.previous);
                footer.append(prev);
              }
              if (data.next) {
            //next link
                let next = document.createElement('a');
                next.classList.add('desp');
                next.href = data.next;
                let url = new URL(data.next);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                next.textContent = `Next ${label} >>`;
                next.setAttribute('data-link', data.next);
                footer.append(next);
              }
          }else if (data.next.toString().includes("vehicles")){
              console.log("vehicles")
          //VEHICLES//
              //hide the overlay / loader
              document.querySelector('.overlay').classList.remove('active');
            //add the data
            m.innerHTML = data.results
            .map((item) => { 
              //<p>Movie appearances: ${item.films}</p>
              //<p>Pilots: ${item.pilots}</p>
                let vm = item.vehicle_class.charAt(0).toUpperCase() + item.vehicle_class.slice(1);
                let nm = item.name || item.title;
                return `<div class="tarjeta">
                <h1 class="elemento">${nm}</h1>
                <p>Model: ${item.model}</p>
                <p>Vehicle class: ${vm}</p>
                <p>Manufacturer: ${item.manufacturer}</p>
                <p>Length: ${item.length} meters.</p>
                <p>Cost: ${item.cost_in_credits} Galactic Credits.</p>
                <p>Crew: ${item.crew}.</p>
                <p>Passengers: ${item.passengers}.</p>
                <p>Max. Atmospheric speed: ${item.max_atmosphering_speed} Km/h.</p>
                <p>Cargo capacity: ${item.cargo_capacity} kg.</p>
                <p>Consumables: ${item.consumables}.</p>
                </div>`;
            })
            .join(' ');
          //add the prev/next navigation
            let footer = document.getElementById('footer');
            footer.innerHTML = '';
            if (data.previous) {
          //previous link
              let prev = document.createElement('a');
              prev.classList.add('ant');
              prev.href = data.previous;
              let url = new URL(data.previous);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              prev.textContent = `<< Previous ${label}`;
              prev.setAttribute('data-link', data.previous);
              footer.append(prev);
            }
            if (data.next) {
          //next link
              let next = document.createElement('a');
              next.classList.add('desp');
              next.href = data.next;
              let url = new URL(data.next);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              next.textContent = `Next ${label} >>`;
              next.setAttribute('data-link', data.next);
              footer.append(next);
            }
          }else if (data.next.toString().includes("planets")){
          //PLANETS//
              console.log("planets")
            //hide the overlay / loader
            document.querySelector('.overlay').classList.remove('active');
            //add the data
            m.innerHTML = data.results
            .map((item) => { 
              //<p>Movie appearances: ${item.films}</p>
              //<p>Residents: ${item.residents}</p>
                let tm = item.terrain.charAt(0).toUpperCase() + item.terrain.slice(1);
                let cm = item.climate.charAt(0).toUpperCase() + item.climate.slice(1);
                let nm = item.name || item.title;
                return `<div class="tarjeta">
                <h1 class="elemento">${nm}</h1>
                <p>Diameter: ${item.diameter}  Km.</p>
                <p>Rotation period: ${item.rotation_period} Hours.</p>
                <p>Orbital period: ${item.orbital_period} Days.</p>
                <p>Gravity: ${item.gravity} G.</p>
                <p>Population: ${item.population} habitants.</p>
                <p>Climate: ${cm}.</p>
                <p>Terrain: ${tm}.</p>
                
                
                </div>`;
            })
            .join(' ');
    
          //add the prev/next navigation
            let footer = document.getElementById('footer');
            footer.innerHTML = '';
    
            if (data.previous) {
          //previous link
              let prev = document.createElement('a');
              prev.classList.add('ant');
              prev.href = data.previous;
              let url = new URL(data.previous);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              prev.textContent = `<< Previous ${label}`;
              prev.setAttribute('data-link', data.previous);
              footer.append(prev);
            }
            if (data.next) {
          //next link
              let next = document.createElement('a');
              next.classList.add('desp');
              next.href = data.next;
              let url = new URL(data.next);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              next.textContent = `Next ${label} >>`;
              next.setAttribute('data-link', data.next);
              footer.append(next);
            }  
          }
        }else if (data.previous != null) {
          if (data.previous.toString().includes("people")){
            //PEOPLE//
            console.log("people")
            //hide the overlay / loader
              document.querySelector('.overlay').classList.remove('active');
            //add the data
              m.innerHTML = data.results
              .map((item) => { 
                  // <p>Homeworld: ${item.homeworld}</p>
                //<p>Movie appearances: ${item.films[0]}</p>
                //<p>Flown starships: ${item.starships}</p>
                //<p>Species: ${item.species}</p>
                let gm = item.gender.charAt(0).toUpperCase() + item.gender.slice(1);
                let hm = item.hair_color.charAt(0).toUpperCase() + item.hair_color.slice(1);
                let em = item.eye_color.charAt(0).toUpperCase() + item.eye_color.slice(1);
                let nm = item.name || item.title;
                return `<div class="tarjeta">
                <h1 class="elemento">${nm}</h1>
                <p>Birth year: ${item.birth_year}.</p>
                <p>Gender: ${gm}.</p>
                <p>Hair color: ${hm}.</p>
                <p>Eye color: ${em}.</p>
                </div>`;
              })
              .join(' ');
            //add the prev/next navigation
              let footer = document.getElementById('footer');
              footer.innerHTML = '';
              if (data.previous) {
            //previous link
                let prev = document.createElement('a');
                prev.classList.add('ant');
                prev.href = data.previous;
                let url = new URL(data.previous);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                prev.textContent = `<< Previous ${label}`;
                prev.setAttribute('data-link', data.previous);
                footer.append(prev);
                }
              if (data.next) {
            //next link
                let next = document.createElement('a');
                next.classList.add('desp');
                next.href = data.next;
                let url = new URL(data.next);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                next.textContent = `Next ${label} >>`;
                next.setAttribute('data-link', data.next);
                footer.append(next);
                }
          }else if (data.previous.toString().includes("species")){
            //SPECIES//
            console.log("species")
            //hide the overlay / loader
            document.querySelector('.overlay').classList.remove('active');
            //add the data
            m.innerHTML = data.results
            .map((item) => { 
              //<p>Homeworld: ${item.homeworld}</p>
              //<p>People: ${item.people}</p>
              //<p>Movie appearances: ${item.films }</p>
              let cm = item.classification.charAt(0).toUpperCase() + item.classification.slice(1);
              let dm = item.designation.charAt(0).toUpperCase() + item.designation.slice(1);
              let om = item.hair_colors.charAt(0).toUpperCase() + item.hair_colors.slice(1);
              let pm = item.eye_colors.charAt(0).toUpperCase() + item.eye_colors.slice(1);
              let nm = item.name || item.title;
              return `<div class="tarjeta">
              <h1 class="elemento">${nm}</h1>
              <p>Classification: ${cm}</p>
              <p>Designation: ${dm}</p>
              <p>Average height: ${item.average_height} cm.</p>
              <p>Average lifespan: ${item.average_lifespan} years.</p>
              <p>Hair colors: ${om}.</p>
              <p>Eye colors: ${pm}.</p>
              <p>Language: ${item.language}.</p>                 
              </div>`;
            })
            .join(' ');
          //add the prev/next navigation
            let footer = document.getElementById('footer');
            footer.innerHTML = '';
            if (data.previous) {
          //previous link
              let prev = document.createElement('a');
              prev.classList.add('ant');
              prev.href = data.previous;
              let url = new URL(data.previous);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              prev.textContent = `<< Previous ${label}`;
              prev.setAttribute('data-link', data.previous);
              footer.append(prev);
              }
            if (data.next) {
          //next link
              let next = document.createElement('a');
              next.classList.add('desp');
              next.href = data.next;
              let url = new URL(data.next);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              next.textContent = `Next ${label} >>`;
              next.setAttribute('data-link', data.next);
              footer.append(next);
              }
          }else if (data.previous.toString().includes("starships")){
             //STARSHIPS//
                console.log("starships")
                //hide the overlay / loader
                document.querySelector('.overlay').classList.remove('active');
              //add the data
              m.innerHTML = data.results
              .map((item) => { 
                //<p>Movie appearances: ${item.films}</p>
                //<p>Pilots: ${item.pilots}</p>
                let cm = item.starship_class.charAt(0).toUpperCase() + item.starship_class.slice(1);
                let nm = item.name || item.title;
                return `<div class="tarjeta">
                <h1 class="elemento">${nm}</h1>
                <p>Model: ${item.model}.</p>
                <p>Starship class: ${cm}.</p>
                <p>Manufacturer: ${item.manufacturer}.</p>
                <p>Cost: ${item.cost_in_credits} Galactic credits.</p>
                <p>Length: ${item.length} meters.</p>
                <p>Crew: ${item.crew}.</p>
                <p>Passengers: ${item.passengers}.</p>
                <p>Max. Atmospheric speed: ${item.max_atmosphering_speed} Km/h.</p>
                <p>Hyperdrive rating: ${item.hyperdrive_rating}.</p>
                <p>Maximum number of Megalights: ${item.MGLT}.</p>
                <p>Cargo capacity: ${item.cargo_capacity} Kg.</p>
                <p>Consumables: ${item.consumables}.</p>
                </div>`;
              })
              .join(' ');
            //add the prev/next navigation
              let footer = document.getElementById('footer');
              footer.innerHTML = '';
      
              if (data.previous) {
            //previous link
                let prev = document.createElement('a');
                prev.classList.add('ant');
                prev.href = data.previous;
                let url = new URL(data.previous);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                prev.textContent = `<< Previous ${label}`;
                prev.setAttribute('data-link', data.previous);
                footer.append(prev);
              }
              if (data.next) {
            //next link
                let next = document.createElement('a');
                next.classList.add('desp');
                next.href = data.next;
                let url = new URL(data.next);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                next.textContent = `Next ${label} >>`;
                next.setAttribute('data-link', data.next);
                footer.append(next);
              }
            
          }else if (data.previous.toString().includes("vehicles")){
            console.log("vehicles")
            //VEHICLES//
                //hide the overlay / loader
                document.querySelector('.overlay').classList.remove('active');
              //add the data
              m.innerHTML = data.results
              .map((item) => { 
                  //<p>Movie appearances: ${item.films}</p>
                  //<p>Pilots: ${item.pilots}</p>
                let vm = item.vehicle_class.charAt(0).toUpperCase() + item.vehicle_class.slice(1);
                let nm = item.name || item.title;
                return `<div class="tarjeta">
                <h1 class="elemento">${nm}</h1>
                <p>Model: ${item.model}</p>
                <p>Vehicle class: ${vm}</p>
                <p>Manufacturer: ${item.manufacturer}</p>
                <p>Length: ${item.length} meters.</p>
                <p>Cost: ${item.cost_in_credits} Galactic Credits.</p>
                <p>Crew: ${item.crew}.</p>
                <p>Passengers: ${item.passengers}.</p>
                <p>Max. Atmospheric speed: ${item.max_atmosphering_speed} Km/h.</p>
                <p>Cargo capacity: ${item.cargo_capacity} kg.</p>
                <p>Consumables: ${item.consumables}.</p>
                </div>`;
              })
              .join(' ');
            //add the prev/next navigation
              let footer = document.getElementById('footer');
              footer.innerHTML = '';
              if (data.previous) {
            //previous link
                let prev = document.createElement('a');
                prev.classList.add('ant');
                prev.href = data.previous;
                let url = new URL(data.previous);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                prev.textContent = `<< Previous ${label}`;
                prev.setAttribute('data-link', data.previous);
                footer.append(prev);
              }
              if (data.next) {
            //next link
                let next = document.createElement('a');
                next.classList.add('desp');
                next.href = data.next;
                let url = new URL(data.next);
                let labels = url.pathname.split('/');
                let label = labels[labels.length - 2];
                next.textContent = `Next ${label} >>`;
                next.setAttribute('data-link', data.next);
                footer.append(next);
              }
          }else if (data.previous.toString().includes("planets")){
            //PLANETS//
            console.log("planets")
            //hide the overlay / loader
            document.querySelector('.overlay').classList.remove('active');
            //add the data
            m.innerHTML = data.results
            .map((item) => { 
              //<p>Movie appearances: ${item.films}</p>
              //<p>Residents: ${item.residents}</p>
              let tm = item.terrain.charAt(0).toUpperCase() + item.terrain.slice(1);
              let cm = item.climate.charAt(0).toUpperCase() + item.climate.slice(1);
              let nm = item.name || item.title;
              return `<div class="tarjeta">
              <h1 class="elemento">${nm}</h1>
              <p>Diameter: ${item.diameter}  Km.</p>
              <p>Rotation period: ${item.rotation_period} Hours.</p>
              <p>Orbital period: ${item.orbital_period} Days.</p>
              <p>Gravity: ${item.gravity} G.</p>
              <p>Population: ${item.population} habitants.</p>
              <p>Climate: ${cm}.</p>
              <p>Terrain: ${tm}.</p>
              
              
              </div>`;
            })
            .join(' ');
          //add the prev/next navigation
            let footer = document.getElementById('footer');
            footer.innerHTML = '';
    
            if (data.previous) {
          //previous link
              let prev = document.createElement('a');
              prev.classList.add('ant');
              prev.href = data.previous;
              let url = new URL(data.previous);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              prev.textContent = `<< Previous ${label}`;
              prev.setAttribute('data-link', data.previous);
              footer.append(prev);
            }
            if (data.next) {
          //next link
              let next = document.createElement('a');
              next.classList.add('desp');
              next.href = data.next;
              let url = new URL(data.next);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              next.textContent = `Next ${label} >>`;
              next.setAttribute('data-link', data.next);
              footer.append(next);
            } 
          }
        }else{
          //FILMS//
          console.log("films")
            //hide the overlay / loader
            document.querySelector('.overlay').classList.remove('active');
            //add the data
            m.innerHTML = data.results
            .map((item) => { 
              //<p>Species: ${item.species}</p>
              //<p>Starships: ${item.starships}</p>
              //<p>Vehicles: ${item.vehicles}</p>
              //<p>Characters: ${item.characters}</p>
              //<p>Planets: ${item.planets}</p>
                let nm = item.name || item.title;
                return `<div class="tarjeta">
                <h1 class="elemento">${nm}</h1>
                <p>Episode: ${item.episode_id}</p>
                <p>Opening paragraphs:</p>
                <h2> ${item.opening_crawl}</h2>
                <p>Director: ${item.director}.</p>
                <p>Producer: ${item.producer}.</p>
                <p>Release date: ${item.release_date}.</p>
                </div>`;
            })
            .join(' ');
            //add the prev/next navigation
            let footer = document.getElementById('footer');
            footer.innerHTML = '';
            if (data.previous) {
            //previous link
              let prev = document.createElement('a');
              prev.classList.add('ant');
              prev.href = data.previous;
              let url = new URL(data.previous);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              prev.textContent = `<< Previous ${label}`;
              prev.setAttribute('data-link', data.previous);
              footer.append(prev);
            }
            if (data.next) {
            //next link
              let next = document.createElement('a');
              next.classList.add('desp');
              next.href = data.next;
              let url = new URL(data.next);
              let labels = url.pathname.split('/');
              let label = labels[labels.length - 2];
              next.textContent = `Next ${label} >>`;
              next.setAttribute('data-link', data.next);
              footer.append(next);
            } 
        }  
    },
    };
    document.addEventListener('DOMContentLoaded', APP.init);
