

class ComicViewerComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = `
        <style>
            :host {
            display: block;
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 100vh; /* Full viewport height */
            background-color: #000;
            }
            img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1s ease;
            }
            button {
            position: absolute;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            background-color: rgba(255, 255, 255, 0.8);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            }
        </style>
        <img id="comicPage" src="" alt="Comic Page">
        <button id="next">Next Scene</button>
        `;
    }
}

customElements.define("comic-viewer", ComicViewerComponent);