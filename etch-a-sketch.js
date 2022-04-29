const sketchContainer = document.querySelector(".sketch-container");
const grid = document.createElement("div");
grid.classList.add("grid");
grid.addEventListener("mousedown", ()=>{draw = true});
grid.addEventListener("mouseup", ()=>{draw = false});
const knobs = document.querySelector(".knobs");
sketchContainer.insertBefore(grid, knobs);
let draw = false; size = 64; color = "black"; eraserActivated = false; rainbowSelected = false;
let oldColor;


function removeGrid(){
    const horizontalContainers = document.querySelectorAll(".horizontalContainers");
    while (horizontalContainers.firstChild){
        horizontalContainers.removeChild(horizontalContainers.firstChild);
    }
    while (grid.firstChild){
        grid.removeChild(grid.firstChild);
    }
    return;
}
// Calls the function which makes a new grid and passes it the selected density as its argument;
function selectGridDensity(e){
    if (this.checked){
        removeGrid();
        size = Number(this.value);
        makeGrid(size);
        return;
    }
}

const radioButtonsGrid = document.querySelectorAll("input[name='grid-density']");
for (const button of radioButtonsGrid){
    button.addEventListener("change", selectGridDensity);
}

function makeGrid (size) {
    for (let i = 0; i < size; i++){
        let horizontalContainer = document.createElement("div");
        horizontalContainer.classList.add("horizontalContainers");
        grid.appendChild(horizontalContainer);
        for (let j = 0; j < size; j++){
            let square = document.createElement("div");
            square.classList.add("squares");
            switch (size){
                case 64:
                    square.style.cssText = "padding: 4.82px;";
                    break;
                case 32: 
                    square.style.cssText = "padding: 10.13px;";
                    break;
                case 16: 
                    square.style.cssText = "padding: 20.75px;";
                    break;
                case 8:
                    square.style.cssText = "padding: 42px;";
            }
            square.addEventListener("mousedown", ()=>{(!rainbowSelected) ? square.style.backgroundColor = color : square.style.backgroundColor = randomColor();});
            square.addEventListener("mouseover", ()=> {if(draw){(!rainbowSelected) ? square.style.backgroundColor = color : square.style.backgroundColor = randomColor();}});
            horizontalContainer.appendChild(square);
        }
    }
}

const colorSelector = document.querySelector("#color");
colorSelector.addEventListener("change", ()=>{color = colorSelector["value"];});

const eraser = document.querySelector(".eraser-wrapper");
eraser.addEventListener("click", ()=> {
    if (!eraserActivated){
        oldColor = color;
        color = "white";
        eraserActivated = true;
        eraser.classList.toggle("selected");
    }
    else{
        color = oldColor;
        eraserActivated = false;
        eraser.classList.toggle("selected");
    }
});

const clear = document.querySelector(".clear-wrapper");
clear.addEventListener("click", ()=>{
    clear.classList.toggle("selected");
    removeGrid();
    makeGrid(size);
    setTimeout(()=>{clear.classList.toggle("selected");}, 200);
});

const rainbow = document.querySelector(".rainbow-wrapper");
rainbow.addEventListener("click", ()=>{
    if (rainbowSelected){   
        rainbowSelected = false;
        rainbow.classList.remove("selected");
    }
    else{
        rainbowSelected = true;
        rainbow.classList.add("selected");
    }
});

function randomColor(){
    let rgbArray = new Array(3);
    for(let i = 0; i < 3; i++){
        do{
            rgbNumber = Math.trunc(Math.random() * 1000);
        }
        while (rgbNumber > 255);
        rgbArray[i] = rgbNumber;
    }
    let rgbString = rgbArray.toString();
    rgbString = `rgb(${rgbString})`;
    return rgbString;
}

makeGrid(size);

//Que se pueda agrandar sin deformar el ancho total. que se pueda activar y desactivar la grid. balde de pintura. guardar los dibujitos. 
//que giren los rendodelitos. que te muestre las coordenadas donde estas parado. que la gente se pueda registrar para guardar 
//sus dibujos en galerias personales para seguirlos dibujando mas tarde



