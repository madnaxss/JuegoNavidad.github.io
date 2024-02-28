var regals = [
    'carbo', 'PlayStation 5', 'PC gamer', 'Ratolí', 'Teclat', 'Mitjons', 'carbo', 'Bicicleta',
    'Cadira', 'carbo', 'Portàtil', 'Rellotge', 'Ulleres de realitat virtual', 'Càmera fotogràfica',
    'Llibres de cuina', 'Kit de pintura', 'Pilota de futbol', 'Abonament per a concerts',
    'Viatge sorpresa', 'Kit de jardineria', 'Auriculars sense fils', 'Targeta de regal', 'carbo',
    'Kit de manualitats'
];
var Victoria;
var listaUsuarios = [];
var regalosAbiertos = 0;
var regalosElegidos = [];
var nombreUsuario;
var conteoRegalos = new Array(regals.length).fill(0);

function iniciarSesion() {
    nombreUsuario = document.getElementById("UsuarioNombre").value;
    loadFromLocalStorage();
  
    document.getElementById("calendario").style.display = "block";
    document.getElementById("inicio-sesion").style.display = "none";
    
}

function saveToLocalStorage() {
    localStorage.setItem('conteoRegalos', JSON.stringify(conteoRegalos));
}

function loadFromLocalStorage() {
    var savedConteoRegalos = localStorage.getItem('conteoRegalos');
    if (savedConteoRegalos) {
        conteoRegalos = JSON.parse(savedConteoRegalos);
    }
}

function regalo() {
    Victoria = document.getElementById("Victoria");
    if (regalosAbiertos < 5) {
        var numeroAleatorio = Math.floor(Math.random() * 24);
        var regaloElegido = regals[numeroAleatorio];
        if (regaloElegido !== 'carbo') {
            var indiceRegalo = regals.indexOf(regaloElegido);
            conteoRegalos[indiceRegalo]++;
        }

        if (regaloElegido !== 'carbo' && !regalosElegidos.includes(regaloElegido)) {
            alert("Te ha tocado: " + regaloElegido);
            regalosElegidos.push(regaloElegido);
            regalosAbiertos++;
        } else if (regaloElegido === 'carbo') {
            alert("Te ha tocado un carbón, has perdido");
            regalosAbiertos = 6;
        } else {
            regalo();
        }
    } else if (regalosAbiertos === 6) {
        alert("Has perdido");
    } else {
        document.getElementById("Win").style.display = "block";
        alert("¡Has obtenido tus 5 regalos!");
        Victoria.textContent = "Enhorabuena " + nombreUsuario + " has ganado los siguientes regalos: ";

        for (var i = 0; i < regalosElegidos.length; i++) {
            Victoria.innerHTML += "- " + regalosElegidos[i] + "<br>";
        }

        document.getElementById("calendario").style.display = "none";
        actualizarTabla();
    }
    saveToLocalStorage();
}


function actualizarTabla() {
    var tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    for (var i = 0; i < regals.length; i++) {
        var regalo = regals[i];
        var totalVecesElegido = conteoRegalos[i] || 0;

        var fila = document.createElement("tr");
        var tdRegalos = document.createElement("td");
        var celdaTotalVeces = document.createElement("td");

        tdRegalos.textContent = regalo;
        celdaTotalVeces.textContent = totalVecesElegido;

        fila.appendChild(tdRegalos);
        fila.appendChild(celdaTotalVeces);

        tabla.appendChild(fila);
    }
}

function MostrarRanking()
{
    document.getElementById("inicio-sesion").style.display = "none";
    document.getElementById("calendario").style.display = "none";
    document.getElementById("Win").style.display = "none";
    document.getElementById("RankingRegalos").style.display = "block";
}

window.onload = function() {
    loadFromLocalStorage();
    actualizarTabla();

};



