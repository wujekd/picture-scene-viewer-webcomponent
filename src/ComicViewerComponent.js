class ComicViewer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // Add a canvas element to the shadow DOM
      this.shadowRoot.innerHTML = `
        <style>
          canvas {
            width: 100%;
            height: 100%;
            display: block;
            background-color: gray;
          }
        </style>
        <canvas></canvas>
        <div class="controls">
        <label>
            X Position:
            <input type="range" min="-1000" max="1000" step="0.01" value="0" id="x-slider">
        </label>
        <label>
            Y Position:
            <input type="range" min="-1000" max="1000" step="0.01" value="0" id="y-slider">
        </label>
        <label>
            Zoom:
            <input type="range" min="0.5" max="3" step="0.01" value="1" id="zoom-slider">
        </label>
        <button id="save-scene">Save Scene</button>
        </div>
      `;
      this.shadowRoot.querySelector('#zoom-slider').addEventListener('input', (e) => this.onZoomChange(e));
        this.shadowRoot.querySelector('#x-slider').addEventListener('input', (e) => this.onPositionChange(e, 'x'));
    this.shadowRoot.querySelector('#y-slider').addEventListener('input', (e) => this.onPositionChange(e, 'y'));


      this.zoom = 1;
      this.posX = 1;
      this.posY = 1;
  
      this.canvas = this.shadowRoot.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
  
      // Set default canvas size
      this.canvas.width = 800;
      this.canvas.height = 600;
  
      // Load the image
      this.image = new Image();
      this.image.src = '../public/images/test1.png';
      this.image.onload = () => this.render();
    }

    
    connectedCallback() {
      this.render();
    }


    render() {
        if (!this.image.complete) return;
      
        //  center of the canvas
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
      
        //  center of the image
        const imgCenterX = this.image.width / 2;
        const imgCenterY = this.image.height / 2;
      
        // Adjust zoom level (scaling the image)
        const width = this.image.width * this.zoom;
        const height = this.image.height * this.zoom;
      
        // position to draw the image, the center stays at the same place
        const offsetX = centerX - imgCenterX * this.zoom + this.posX;
        const offsetY = centerY - imgCenterY * this.zoom + this.posY;
      
        // Clear canvas + redraw 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.image, offsetX, offsetY, width, height);
      }
      


    onZoomChange(e) {
        this.zoom = parseFloat(e.target.value);
        console.log(this.zoom);
        
        this.render();
      }
      
      onPositionChange(e, axis) {
        if (axis === 'x') {
          this.posX = parseInt(e.target.value, 10);
        } else if (axis === 'y') {
          this.posY = parseInt(e.target.value, 10);
        }
        this.render();
      }
      
    
  }
  
  customElements.define('comic-viewer', ComicViewer);
  