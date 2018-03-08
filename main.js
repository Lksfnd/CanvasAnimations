let canvas      = document.querySelector("canvas");
let select      = document.querySelector("select");
let text        = document.querySelector("#text");
let dynamicBox  = document.querySelector("#dynamicBox");

class SpacerAnim { stop(){} }

let activeModules = [];
let currentAnim = new SpacerAnim();
let centerScreen = {};
let colors = {
    PRIMARY: "rgba(255,255,255,1.0)",
    PRIMARY_DARK: "rgba(255,255,255,0.25)"
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerScreen = {
        x: parseInt(canvas.width/2),
        y: parseInt(canvas.height/2)
    };
}


function selectChange() {
    select.style.visibility = "hidden";
    text.style.visibility = "visible";
    dynamicBox.style.visibility = "hidden";
    const selected = select.options[select.selectedIndex].value;

    
    currentAnim.stop();
    currentAnim = new SpacerAnim();
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
    if(selected.toLowerCase()!== "none" )
        startAnimation(selected);
    
    setTimeout(()=>{
        select.style.visibility = "visible";
        text.style.visibility = "hidden";
    },55);
}

function startAnimation(animationName) {
    importModule(animationName);
    setTimeout(()=>{
        switch(animationName.toLowerCase()) {
            case "sine/cos/tan wave":
                currentAnim = new SineCosTanWave(canvas);
                currentAnim.start();
            break;
            case "fractal tree":
                currentAnim = new FractalTree(canvas);
                currentAnim.start();
            break;
        }
    }, 50);
}

window.onresize = resizeCanvas;
select.onchange = selectChange;
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

resizeCanvas();

function importModule(module) {
    module = module.replaceAll("/", "");
    module = module.replaceAll(" ", "");
    if(!activeModules.includes(module)) {
        let src = document.createElement("script");
        src.src = "./modules/" + module + ".js";;
        document.body.appendChild(src);
        activeModules.push(module);
    }
}


// Autostart
select.selectedIndex = 2;
selectChange();


/* Module Example 

class SineCosTanWave {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.running = true;
    }

    start() {

    }

    stop() {

    }

    setup() {
        let ctx = this.ctx;
    }
    
    frame() {
        let ctx = this.ctx;
    }
}


*/






