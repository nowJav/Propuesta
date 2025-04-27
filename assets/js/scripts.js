// Inicializamos variables
let nombre = '';
let edad = '';
let pais = '';
let currentSlide = 0;

// Detectar si es pantalla táctil
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Inicializar música de fondo
const musicaFondo = new Audio('assets/audio/banda_sonora.mp3');
musicaFondo.loop = true; // Que suene en bucle
musicaFondo.volume = 1; // Volumen más bajito para no ser invasivo

// Configurar contenido de slides
const slides = [
    {
        html: `
        <div class="slide" data-aos="zoom-in">
            <div class="card">
                <h2>Buenas tardes señorita <span id="nombre-dinamico"></span> 🌸</h2>
                <p>Es un gusto tenerla aquí en este hermoso día. ¡Se ha ganado el premio mayor!</p>
                <img src="assets/img/ramo.png" alt="Ramo" class="img-fluid my-3 ramo-animado" style="width:150px;">
                <button class="btn btn-primary continuar-btn" onclick="siguienteSlide()">Continuar</button>
            </div>
        </div>`
    },
    {
        html: `
        <div class="slide" data-aos="fade-up">
            <div class="card">
                <p>El premio mayor no será el más extravagante, ni el más remunerado monetariamente, pero sí el más completo... 💜</p>
                <p>¡Te ganaste mi corazón para toda la eternidad!</p>
                <button class="btn btn-primary continuar-btn" onclick="siguienteSlide()">Continuar</button>
            </div>
        </div>`
    },
    {
        html: `
        <div class="slide" data-aos="fade-left">
            <div class="card">
                <p>Nos separan 2,200 km desde <span id="pais-dinamico"></span> hasta mi cerrito, pero pronto serán 0 km porque estaremos juntos 🤍</p>
                <img src="assets/img/distancia.PNG" alt="Distancia" class="img-fluid rounded my-3">
                <button class="btn btn-primary continuar-btn" onclick="siguienteSlide()">Continuar</button>
            </div>
        </div>`
    },
    {
        html: `
        <div class="slide" data-aos="fade-right">
            <div class="card">
                <p>Quién diría que un jueguito nos reuniría para vivir el mejor capítulo de nuestras vidas 🎮❤️</p>
                <p>Pronto, esta foto y muchas más serán realidad...</p>
                <img src="assets/img/juntos.PNG" alt="Foto especial" class="img-fluid rounded my-3">
                <button class="btn btn-primary continuar-btn" onclick="siguienteSlide()">Continuar</button>
            </div>
        </div>`
    },
    {
        html: `
        <div class="slide" data-aos="zoom-in">
            <div class="card">
                <p>Y todo esto nos lleva a la gran pregunta...</p>
                <h3><strong>¿Estás lista? 🌟</strong></h3>
                <button class="btn btn-primary continuar-btn" onclick="siguienteSlide()">Continuar</button>
            </div>
        </div>`
    },
    {
        html: `
        <div class="slide position-relative" data-aos="fade-up">
            <div class="card">
                <h2>Eva Carolina Martínez Rodríguez</h2>
                <h3>¿Me harías el honor de ser mi novia? 💍</h3>
                <div class="mt-5">
                    <button id="btn-si" class="btn btn-success btn-lg me-3" onclick="aceptar()">💖 ¡Sí! 💖</button>
                    <button id="btn-no" class="btn btn-danger btn-lg" ${isTouchDevice ? 'ontouchstart' : 'onmouseover'}="esquivar()">No 😢</button>
                </div>
            </div>
        </div>`
    }
];

// Mostrar formulario inicial
function mostrarFormulario() {
    document.getElementById('app').innerHTML = `
    <div class="form-container">
        <div class="card card-form text-center">
            <h2 class="mb-4">Bienvenida ✨</h2>
            <input id="inputNombre" type="text" class="form-control mb-3" placeholder="Tu nombre">
            <input id="inputPais" type="text" class="form-control mb-3" placeholder="Tu país">
            <button class="btn btn-primary w-100 comenzar-btn" onclick="guardarDatos()">Comenzar</button>
        </div>
    </div>`;
    musicaFondo.play().catch(e => {
        console.log('AutoPlay bloqueado hasta interacción');
    });
}

function guardarDatos() {
    nombre = document.getElementById('inputNombre').value;
    pais = document.getElementById('inputPais').value;

    if(nombre && pais){
        musicaFondo.play(); // Aquí ya hay interacción real del usuario
        siguienteSlide();
    } else {
        alert('Por favor, completa todos los campos 📝');
    }
}

// Mostrar siguiente slide
function siguienteSlide() {
    if(currentSlide < slides.length){
        document.getElementById('app').innerHTML = slides[currentSlide].html;
        AOS.init(); // Reinicializa animaciones AOS

        if(currentSlide === 0){
            document.getElementById('nombre-dinamico').innerText = nombre;
        }
        if(currentSlide === 2){
            document.getElementById('pais-dinamico').innerText = pais;
        }

        currentSlide++;
    }
}

// Animación del botón "No" esquivando
function esquivar() {
    const btnNo = document.getElementById('btn-no');
    const randomX = Math.floor(Math.random() * 200) - 100; // mueve entre -100px y 100px
    const randomY = Math.floor(Math.random() * 200) - 100;
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Acción cuando aceptan
function aceptar() {
    musicaFondo.pause();
    musicaFondo.currentTime = 0;

    document.getElementById('app').innerHTML = `
    <div class="slide d-flex flex-column justify-content-center align-items-center" data-aos="zoom-in">
        <div class="card p-3" style="background: transparent; box-shadow: none; border: none;">
            <h2 class="text-center mb-4">¡Siiii! 💖🎉</h2>
            <p class="text-center">¡Ahora oficialmente somos novios!</p>
            <div class="video-container mt-4">
                <video id="video-novios" controls autoplay playsinline>
                    <source src="assets/video/VIVAN LOS NOVIOS.mp4" type="video/mp4">
                    Tu navegador no soporta la reproducción de videos.
                </video>
            </div>
        </div>
    </div>`;
    AOS.init();
}




// Iniciar
mostrarFormulario();
