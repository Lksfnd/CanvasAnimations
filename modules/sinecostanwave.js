class SineCosTanWave {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.running = true;

        this.time = 0;

        this.speed = 1.5;
        this.resolutionMultiplicator = 2;

        this.amplitude = 0.1;
        this.waveLength = canvas.width / 25;

        this.mode = "sin";
    }

    start() {
        this.running=true;
        this.setup();
        this.frame();
    }

    stop() {
        this.running=false;
    }

    setup() {
        let ctx = this.ctx;
        this.time = 0;
        ctx.strokeStyle = colors.PRIMARY;
        dynamicBox.style.visibility = "visible";
        dynamicBox.innerHTML = "<h4>Settings</h4>";

        let amplitudeSlider = slider(0.001,1,0.001,0.1, (slider) => {
            this.amplitude = slider.value;
        });
        let waveLengthSlider = slider(0.01,800,0.1, 800-25, (slider) => {
            this.waveLength = canvas.width / (800-slider.value);
        })
        let speedSlider = slider(0.1, 100, 0.1, 1.5, (slider) => {
            this.speed = parseFloat(slider.value);
        });

        dynamicBox.appendChild(label("Amplitude:<br>"));
        dynamicBox.appendChild(amplitudeSlider);
        dynamicBox.appendChild(label("Wavelength:<br>"));
        dynamicBox.appendChild(waveLengthSlider);
        dynamicBox.appendChild(label("Speed:<br>"));
        dynamicBox.appendChild(speedSlider);

        dynamicBox.appendChild(link("Sin ", ()=>{
            this.mode = "sin";            
        }));
        dynamicBox.appendChild(link("Cos ", ()=>{
            this.mode = "cos";            
        }));
        dynamicBox.appendChild(link("Tan ", ()=>{
            this.mode = "tan";            
        }));
        
    }

    getVal(x) {
        x=x/this.waveLength;
        switch(this.mode) {
            case "sin":
                return Math.sin(x);
            case "cos":
                return Math.cos(x);
            case "tan":
                return Math.tan(x)
        }
    }
    
    frame() {
        if(!this.running)return;
        let ctx = this.ctx;
    
        const screenWidth = this.canvas.width;
        const scaleHeight = this.canvas.height * this.amplitude;

        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        ctx.beginPath();
        ctx.moveTo(-10,centerScreen.y);
        for(let i = 0; i < int(screenWidth * this.resolutionMultiplicator); i++) {
            const xPos = int((i / (screenWidth*this.resolutionMultiplicator)) * screenWidth);
            const val = this.getVal(xPos + this.time);
            const yPos = int(centerScreen.y + val * this.amplitude * this.canvas.height);
            ctx.lineTo(xPos, yPos);
        }
        ctx.stroke();
        this.time+=this.speed;
        window.requestAnimationFrame(()=>{
           this.frame();
        });
    }
}