// --- NUEVAS FUNCIONES GLOBALES PARA LA MODAL ---

// 1. Muestra la ventana flotante de éxito
window.sayYes = () => {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'block'; // Muestra el modal
};

// 2. Cierra la ventana flotante E INICIA LA DESCARGA
window.closeModal = () => {
    // 1. Oculta la ventana modal
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none'; 
    
    // 2. CREA UN ENLACE TEMPORAL PARA FORZAR LA DESCARGA
    const downloadLink = document.createElement('a');
    
    // El nombre del archivo que se descargará. ¡Asegúrate que el nombre coincida!
    downloadLink.href = 'carta.pdf'; 
    
    // El atributo 'download' fuerza la descarga y establece el nombre del archivo.
    downloadLink.download = 'Carta_de_Amor_Mi_Novia.pdf'; 
    
    // 3. Simula un clic en el enlace
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    // 4. Limpia el enlace temporal
    document.body.removeChild(downloadLink);
};

// Asegúrate de que tu función revealFinalQuestion y el resto del código permanezca.
// El resto del script.js queda igual.

function revealFinalQuestion() {
    const finalDiv = document.getElementById('final-text');
    
    // Contenido que aparecerá con el suspenso
    const messageHTML = `
        <h1 class="final-message">¿Quieres ser mi novia?</h1>
        
        <button class="btn final-btn" onclick="sayYes()">¡SÍ, ACEPTO!</button>
    `;

    finalDiv.style.opacity = '0'; 
    
    // Espera 1 segundo para el suspenso (efecto dramático)
    setTimeout(() => {
        finalDiv.innerHTML = messageHTML;
        
        // La pregunta aparece lentamente
        finalDiv.style.transition = 'opacity 2s ease-in-out';
        finalDiv.style.opacity = '1'; 
    }, 1000); 
}

// --- BLOQUE PRINCIPAL DE LA APLICACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let currentSlide = 0;

    // --- CONFIGURACIÓN CRÍTICA ---
    const START_DATE = new Date('2016-08-01T00:00:00'); 
    const QUIZ_1_ANSWER = 'marco'; 
    const QUIZ_2_ANSWER = 'luztopia'; 
    const IMG_ANIVERSARIO = 'Aniversario.jpg';
    const IMG_PRIMERA_CITA = 'primera cita.jpg';

    // --- ESTRUCTURA DE LOS SLIDES (8 SLIDES EN TOTAL) ---
    const slides = [
        // SLIDE 1: INTRODUCCIÓN
        { 
            id: 'intro', 
            content: `
                <h1>Hola</h1>
                <p style="font-size: 1.5em; font-weight: bold;">"Hagamos esto una vez mas..."</p>
                <button class="btn" onclick="nextSlide()">Comenzar</button>
            ` 
        },
        // SLIDE 2: RESUMEN DE TIEMPO
        { 
            id: 'time-summary', 
            content: `
                <h2>Nuestro Resumen del Tiempo</h2>
                <p>Desde Agosto de 2016, hemos compartido...</p>
                <div id="time-stats"></div>
                <button class="btn" onclick="nextSlide()">¡Wow! Sigamos</button>
            `,
            onActive: calculateTime
        },
        // SLIDE 3: QUIZ 1 - ANIVERSARIO (PREGUNTA)
        { 
            id: 'quiz-1', 
            content: `
                <h2>Un Recuerdo Especial</h2>
                <img src="${IMG_ANIVERSARIO}" alt="Foto de Aniversario">
                <p style="font-weight: bold;">¿Recuerdas este día? Dime la palabra clave del museo que visitamos.</p>
                <input type="text" id="answer1" placeholder="Palabra clave (ej: Marco)">
                <button class="btn" onclick="checkQuiz(1)">Comprobar</button>
            ` 
        },
        // SLIDE 4: REVELACIÓN 1 - ANIVERSARIO (RESPUESTA)
        { 
            id: 'reveal-1', 
            content: `
                <h2>¡Eres increíble!</h2>
                <img src="${IMG_ANIVERSARIO}" alt="Foto de Aniversario">
                <p style="font-style: italic; font-size: 1.1em;">"Fue nuestro aniversario, fuimos a desayunar y luego al museo marco, tu te veías muy bonita y yo estaba muy enamorado"</p>
                <button class="btn" onclick="nextSlide()">Vamos al siguiente</button>
            ` 
        },
        // SLIDE 5: QUIZ 2 - PRIMERA CITA (PREGUNTA)
        { 
            id: 'quiz-2', 
            content: `
                <h2>Un Segundo Recuerdo</h2>
                <img src="${IMG_PRIMERA_CITA}" alt="Foto de la Primera Cita">
                <p style="font-weight: bold;">¿Recuerdas a dónde fuimos en nuestra primera cita?</p>
                <input type="text" id="answer2" placeholder="Lugar clave (ej: Luztopia)">
                <button class="btn" onclick="checkQuiz(2)">Comprobar</button>
            ` 
        },
        // SLIDE 6: REVELACIÓN 2 - PRIMERA CITA (RESPUESTA)
        { 
            id: 'reveal-2', 
            content: `
                <h2>¡Lo sabía!</h2>
                <p>Fuimos a Fundidora a Luztopia, se iba a presentar una muchacha que te gustaba como cantaba.</p>
                <img src="${IMG_PRIMERA_CITA}" alt="Foto de la Primera Cita">
                <button class="btn" onclick="nextSlide()">¡Una pregunta más!</button>
            ` 
        },
        // SLIDE 7: TRANSICIÓN DE SUSPENSO
        {
            id: 'transition',
            content: `
                <h1 style="font-family: 'Montserrat', sans-serif;">"Hemos llegado al presente, mi amor. Y ahora..."</h1>
                <button class="btn" onclick="nextSlide()">Descúbrelo</button>
            `
        },
        // SLIDE 8: EL GRAN FINAL
        { 
            id: 'final', 
            content: `
                <div class="final-slide">
                    <p style="font-size: 1.8em; margin-bottom: 30px; font-family: 'Pacifico', cursive;">...Solo queda una pregunta</p>
                    <div id="final-text"></div>
                </div>
            `,
            onActive: revealFinalQuestion // Llama a la función global de revelación
        }
    ];

    // --- FUNCIONES DE NAVEGACIÓN Y LÓGICA ---
    
    function renderSlide(index) {
        app.innerHTML = `<div class="slide active">${slides[index].content}</div>`;
        if (slides[index].onActive) {
            slides[index].onActive();
        }
    }

    // Función global para avanzar al siguiente slide
    window.nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            renderSlide(currentSlide);
        }
    };

    // Función global para verificar la respuesta del quiz
    window.checkQuiz = (quizNumber) => {
        let input = document.getElementById(`answer${quizNumber}`);
        let userAnswer = input.value.trim().toLowerCase(); 
        
        let correctAnswer = quizNumber === 1 ? QUIZ_1_ANSWER : QUIZ_2_ANSWER;

        if (userAnswer === correctAnswer) {
            window.nextSlide(); 
        } else {
            alert('¡Ouch! Esa no es la palabra clave. Inténtalo de nuevo, revisa que esté bien escrita.');
            input.value = '';
        }
    };

    // Función para calcular y mostrar el tiempo
    function calculateTime() {
        const now = new Date();
        const diff = now.getTime() - START_DATE.getTime();
        
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30.44);
        const years = Math.floor(days / 365.25);
        
        document.getElementById('time-stats').innerHTML = `
            <p class="time-unit">${years.toLocaleString()} años</p>
            <p class="time-unit">${months.toLocaleString()} meses</p>
            <p class="time-unit">${days.toLocaleString()} días</p>
            <p class="time-unit">${hours.toLocaleString()} horas</p>
            <p class="time-unit">${minutes.toLocaleString()} minutos</p>
        `;
    }

    // Inicia la aplicación en el primer slide
    renderSlide(currentSlide);
});