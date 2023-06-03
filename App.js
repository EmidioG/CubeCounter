"use strict";
let tempo = document.querySelector("#tempo");
let btnIniciar = document.querySelector("#btnIniciar");
let btnParar = document.querySelector("#btnParar");
let btnZerar = document.querySelector("#btnZerar");
let listaTempos = document.querySelector("#listaTempos");
let rodando = false;
let contador = 0;

const botarPraRodar = (e) => {
    e.preventDefault();
    if (e.key == " " || e.type == "click") {
        let ms = 0;
        let s = 0;
        let m = 0;
        rodando = !rodando;
        if (rodando) {
            this.rodando = setInterval(() => {
                ms++;
                if (ms == 100) {
                    ms = 0;
                    s++;
                    if (s == 60) {
                        s = 0;
                        m++;
                    }
                }
                tempo.innerHTML = `${m.toString().padStart(2, 0)}:${s
                    .toString()
                    .padStart(2, 0)}:${ms.toString().padStart(2, 0)}`;
            }, 10);
        } else {
            parar();
        }
    }
};

const parar = () => {
    clearInterval(this.rodando);
};

const gravarTempo = () => {
    let tempoGravado = document.createElement("p");
    tempoGravado.innerHTML = "Seu tempo é: " + tempo.innerHTML;
    document.body.appendChild(tempoGravado);
    salvarTempo("time" + contador++, tempo.innerHTML);
};

const salvarTempo = (key, value) => {
    localStorage.setItem(key, value);
};

const restaurarTempos = () => {
    Object.keys(localStorage).forEach((e) => {
        let tempoGravado = document.createElement("p");
        tempoGravado.innerHTML = "Seu tempo é: " + localStorage.getItem(e);
        document.body.appendChild(tempoGravado);
    });
    contador = localStorage.length;
};

const organizarTempos = () => {
    arrayTempos = Object.keys(localStorage).map(() => {
        localStorage.getItem(e);
    }, []);
};

btnIniciar.addEventListener("click", botarPraRodar);
document.addEventListener("keyup", botarPraRodar);

btnParar.addEventListener("click", () => {
    clearInterval(this.rodando);
    gravarTempo();
});

btnZerar.addEventListener("click", () => {
    clearInterval(this.rodando);
    tempo.innerHTML = "00:00:00";
});

restaurarTempos();
