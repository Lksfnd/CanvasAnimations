class FractalTree {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.running = true;

        this.branches = [];
        this.branchSplitAngle = 20; // °
        this.firstBranchLength = 150;
        this.branchSplitMultiplicator = 1.0;
        this.branchLengthMultiplictator = 0.75;

        this.generation = 0;
        this.stopGeneration = 13;
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

        this.initialBranchSplitAngle = 20;
        this.initialFirstBranchLength = 150;



        this.branchSplitMultiplicator = 1.0;
        this.branchLengthMultiplictator = 0.75;

        this.generation = 0;
        this.stopGeneration = 13;

        let branchSplitAngleSlider = slider(
            1,
            180, 
            1, 
            this.initialBranchSplitAngle, 
            (slider) => {
                this.initialBranchSplitAngle = int(slider.value);
                this.reRender();
        }, false);

        let firstBranchLengthSlider = slider(
            this.stopGeneration, 
            this.canvas.height, 
            1, 
            this.initialFirstBranchLength, 
            (slider)=> {
                this.initialFirstBranchLength = int(slider.value);
                this.reRender();
        }, false);

        let branchSplitMultiplicatorSlider = slider(
            0.1, 
            5.0, 
            0.1, 
            this.branchSplitMultiplicator, 
            (slider) => {
                this.branchSplitMultiplicator = parseFloat(slider.value);
                this.reRender();
        }, false);

        let branchLengthMultiplicatorSlider = slider(
            0.01,
            5.0,
            0.01,
            this.branchLengthMultiplictator,
            (slider) => {
                this.branchLengthMultiplictator = parseFloat(slider.value);
                this.reRender();
            }, false);

        dynamicBox.innerHTML = "<h4>Fractal Tree Settings</h4>";
        dynamicBox.appendChild(label("Branch Split Angle:<br>"));
        dynamicBox.appendChild(branchSplitAngleSlider);
        dynamicBox.appendChild(label("Tree Size:<br>"));
        dynamicBox.appendChild(firstBranchLengthSlider);
        dynamicBox.appendChild(label("Angle Increment per Generation:<br>"));
        dynamicBox.appendChild(branchSplitMultiplicatorSlider);
        dynamicBox.appendChild(label("Branch length decrease p.G.:<br>"));
        dynamicBox.appendChild(branchLengthMultiplicatorSlider);

        dynamicBox.style.visibility = "visible";
        this.reRender();
    }

    reRender() {
        this.generation = 0;
        this.branchSplitAngle = this.initialBranchSplitAngle;
        this.firstBranchLength = this.initialFirstBranchLength;
        this.branches = [
            new Branch(centerScreen.x, canvas.height, rad(270))
        ];
        
        this.canvas.getContext("2d").clearRect(0,0,this.canvas.width,this.canvas.height);
        
        this.frame();
    }

    frame() {
        if(!this.running)return;
        let ctx = this.ctx;
    
        if(!(this.generation >= this.stopGeneration)) {
            this.generation++;
            let newBranches = [];

            for(let branch of this.branches) {

                let coords = branch.draw(ctx, this.firstBranchLength);

                let leftBranch = new Branch(
                    coords.x,
                    coords.y,
                    rad(deg(branch.angle) + this.branchSplitAngle)
                );
                let rightBranch = new Branch(
                    coords.x,
                    coords.y,
                    rad(deg(branch.angle) - this.branchSplitAngle)
                );

                newBranches.push(leftBranch,rightBranch);
            }

            this.branches = newBranches;
            this.firstBranchLength *= this.branchLengthMultiplictator;
            this.branchSplitAngle *= this.branchSplitMultiplicator;

        } else {
            return;
        }
        window.requestAnimationFrame(()=>{
           this.frame();
        });
    }
}

class Branch {
    constructor(x,y,angle) {
      this.x = parseInt(x);
      this.y = parseInt(y);
      this.angle = angle;
    }
    // Draws the branch
    draw(context, length) {
      let endCoords = Angle(this.x, this.y, length, this.angle);
      context.beginPath();
      context.strokeStyle = colors.PRIMARY;
      context.moveTo(this.x,this.y);
      context.lineTo(
        endCoords.x,
        endCoords.y
      );
      context.stroke();
      context.closePath();
      return endCoords;
    }
  }