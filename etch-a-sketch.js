const sketchContainer = document.querySelector(".sketch-container");
sketchContainer.classList.toggle("slide-in-animation");
const gridContainer = document.querySelector(".grid-container");
const controls = document.querySelector(".controls");
for (let control of controls.childNodes){
    control.addEventListener("mouseenter", ()=>{control.classList.toggle("mouse-over");});
    control.addEventListener("mouseleave", ()=>{control.classList.toggle("mouse-over");});
}
gridContainer.addEventListener("mousedown", ()=>{draw = true});
gridContainer.addEventListener("mouseup", ()=>{draw = false});
gridContainer.addEventListener("mouseleave", ()=>{draw = false});

let draw = false; size = 18; color = "#595959"; eraserActivated = false; rainbowSelected = false; grid = true;

function removeGrid(){
    const horizontalContainers = document.querySelectorAll(".horizontal-divs");
    while (horizontalContainers.firstChild){
        horizontalContainers.removeChild(horizontalContainers.firstChild);
    }
    while (gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.firstChild);
    }
    return;
}
// Deletes current gird and calls the function which makes a new grid and passes it the selected density as its argument;
function selectGridDensity(e){
    removeGrid();
    size = Number(this.value);
    makeGrid(size);
    return;
    
}

const sliderGrid = document.querySelector("input[name='grid-density']")
sliderGrid.addEventListener("change", selectGridDensity);

function makeGrid (size) {
    for (let i = 0; i < size; i++){
        const horizontalDiv = document.createElement("div");
        horizontalDiv.classList.add("horizontal-divs");
        gridContainer.append(horizontalDiv);
        for (let j = 0; j < (size * 2); j++){
            const square = document.createElement("div");
            square.classList.add("squares");
            if (!grid){
                square.classList.add("no-grid");
            }
            square.addEventListener("mousedown", ()=>{(!rainbowSelected || eraserActivated) ? square.style.backgroundColor = color : square.style.backgroundColor = randomColor();});
            square.addEventListener("mouseover", ()=> {if(draw){(!rainbowSelected || eraserActivated) ? square.style.backgroundColor = color : square.style.backgroundColor = randomColor();}});
            horizontalDiv.appendChild(square);
        }
    }
}

const colorSelector = document.querySelector("#color");
colorSelector.addEventListener("change", ()=>{if (!eraserActivated) color = colorSelector["value"];});

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

const eraser = document.querySelector(".eraser-wrapper");
eraser.addEventListener("click", ()=> {
    if (!eraserActivated){
        color = "white";
        eraserActivated = true;
        eraser.classList.toggle("selected");
    }
    else{
        color = colorSelector.value;
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
    if(sketchContainer.classList.contains("slide-in-animation")){
        sketchContainer.classList.remove("slide-in-animation");
    }
    sketchContainer.classList.toggle("clear-shake-animation");
    setTimeout(()=>{sketchContainer.classList.toggle("clear-shake-animation");}, 1000);
});

const gridToggle = document.querySelector(".gridToggle-wrapper");
gridToggle.addEventListener("click", ()=>{
    for(let child of gridContainer.childNodes){
        for (let square of child.childNodes){
            square.classList.toggle("no-grid");
        }
    }
    (grid) ? grid = false : grid = true;
    gridToggle.classList.toggle("selected");
});
makeGrid(size);
//cosas para agregar a futuro 
//Arreglar la responsividad. balde de pintura(flood fill algorithm). guardar los dibujitos. 
//que giren los rendodelitos. que te muestre las coordenadas donde estas parado. que la gente se pueda registrar para guardar 
//sus dibujitos en galerias personales para seguirlos dibujando mas tarde.
//Rick rolls en las perillas.
//descargar el dibujo de alguna manera.
// shortcut keys
