//!Mover
const move = document.getElementById("move");
let isMouseDown = false;
let initialMouseX;
let initialMouseY;
let initialElementX;
let initialElementY;

move.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  initialMouseX = e.clientX;
  initialMouseY = e.clientY;
  initialElementX = resize.offsetLeft;
  initialElementY = resize.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    const deltaX = e.clientX - initialMouseX;
    const deltaY = e.clientY - initialMouseY;
    resize.style.left = initialElementX + deltaX + "px";
    resize.style.top = initialElementY + deltaY + "px";
  }
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

//!input de largura dinâmica
function resizable(el, factor) {
  var int = Number(factor) || 7.7;
  function resize() {
    el.style.width = (el.value.length + 1) * int + "px";
  }
  var e = "keyup,keypress,focus,blur,change".split(",");
  for (var i in e) el.addEventListener(e[i], resize, false);
  resize();
}
resizable(document.getElementById("select-script"), 7);

//!Obter valor do input e limpar placeholder
//Constantes
const input = document.getElementById("select-script");
const scriptIcon = document.getElementById("script-icon");

//limpar conteúdo do placeholder
input.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    this.placeholder = "";
  }
});

//Restaurar placeholder se o input estiver vazio ao perder foco
input.addEventListener("blur", function () {
  if (this.value.trim() === "") {
    this.placeholder = "script";
  }
});

//Obter o valor digitado no input
function atualizarIconeScript() {
  const valorInput = input.value.trim();

  const indexPonto = valorInput.lastIndexOf(".");

  if (indexPonto !== -1) {
    const extensaoImage = valorInput.substring(indexPonto + 1).toUpperCase();
    const caminhoSVG = `./assets/icons/${extensaoImage}.svg`;

    fetch(caminhoSVG)
      .then((response) => {
        if (response.ok) {
          scriptIcon.src = caminhoSVG;
        } else {
          scriptIcon.src = "";
        }
      })
      .catch((error) => {
        console.error("Erro ao verificar a existência do arquivo SVG:", error);
        scriptIcon.src = "";
      });
  } else {
    scriptIcon.src = "";
  }
}

input.addEventListener("input", atualizarIconeScript);
input.addEventListener("keyup", atualizarIconeScript);

//!On-Off para highlighting
const onInput = document.getElementById("on");
const offInput = document.getElementById("off");
const panel = document.querySelector(".highlighting__code--preview");
const selectScript = document.querySelector(".select-script");

var isCodeHighlighted = false;

onInput.addEventListener("change", function () {
  if (!isCodeHighlighted) {
    setHighlightOn();
  }
});

offInput.addEventListener("change", function () {
  if (isCodeHighlighted) {
    setHighlightOff();
  }
});

selectScript.addEventListener("change", function () {
  if (isCodeHighlighted) {
    hljs.highlightElement(panel);
  }
});

function setHighlightOn() {
  const extensao = selectScript.value.substring(
    selectScript.value.lastIndexOf(".") + 1
  );
  panel.setAttribute(
    "class",
    `highlighting__code--preview hljs language-${extensao}`
  );
  panel.removeAttribute("data-highlighted"); // Remover o atributo
  hljs.highlightElement(panel);
  isCodeHighlighted = true;
}

function setHighlightOff() {
  panel.setAttribute(
    "class",
    "highlighting__code--preview hljs language-plaintext"
  );
  panel.removeAttribute("data-highlighted"); // Remover o atributo
  hljs.highlightElement(panel);
  isCodeHighlighted = false;
}
