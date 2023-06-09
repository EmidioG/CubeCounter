const tempo = document.querySelector('#tempo');
const btnIniciar = document.querySelector('#btnIniciar');
const btnSalvar = document.querySelector('#btnSalvar');
const btnZerar = document.querySelector('#btnZerar');
const btnLimpar = document.querySelector('#btnLimpar');
const listaTempos = document.querySelector('#listaTempos');
let rodando = false;
let contador = 0;

const parar = () => {
  clearInterval(this.rodando);
  rodando = false;
};

const zerar = () => {
  parar();
  tempo.innerHTML = '00:00:00';
};

const salvarTempo = (key, value) => {
  localStorage.setItem(key, value);
};

const removerDuplicados = (array) => array.filter((valor, indice, self) => self.indexOf(valor) === indice);

const arrumarTempos = () => {
  const keysAndTimes = Object.keys(localStorage).map((key) => {
    const time = +localStorage.getItem(key).replace(/:/g, '');
    return {
      key,
      time,
    };
  });

  let onlyTimes = keysAndTimes.map((e) => e.time);
  onlyTimes = onlyTimes.sort((a, b) => a - b);
  const keysOrganized = onlyTimes.map((timeSort) => keysAndTimes.map((kat) => {
    if (kat.time === timeSort) {
      return kat.key;
    }
  }));

  let timesOrganized = keysOrganized
    .map((e) => e.filter((laele) => laele)[0])
    .map((key) => localStorage.getItem(key));
  timesOrganized = removerDuplicados(timesOrganized);
  console.log(timesOrganized);
  return timesOrganized;
};

function colocarTempoNaTela() {
  listaTempos.innerHTML = '';
  arrumarTempos().forEach((time) => {
    const tempoGravado = document.createElement('p');
    tempoGravado.innerHTML = `Seu tempo é: ${time}`;
    listaTempos.appendChild(tempoGravado);
  });
  contador = localStorage.length;
}

const botarPraRodar = (e) => {
  e.preventDefault();
  if (e.key === ' ' || e.type === 'click') {
    let ms = 0;
    let s = 0;
    let m = 0;
    rodando = !rodando;
    if (rodando) {
      this.rodando = setInterval(() => {
        ms++;
        if (ms === 100) {
          ms = 0;
          s++;
          if (s === 60) {
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
      colocarTempoNaTela();
    }
  }
};

btnIniciar.addEventListener('click', botarPraRodar);
document.addEventListener('keyup', botarPraRodar);

btnSalvar.addEventListener('click', () => {
  if (tempo.innerHTML !== '00:00:00') {
    parar();
    salvarTempo(`time${++contador}`, tempo.innerHTML);
    colocarTempoNaTela();
  }
});

btnZerar.addEventListener('click', zerar);

btnLimpar.addEventListener('click', () => {
  zerar();
  localStorage.clear();
  colocarTempoNaTela();
});

colocarTempoNaTela();
