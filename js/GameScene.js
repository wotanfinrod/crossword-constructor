import CrosswordBox from './CrosswordBox.js';
import Crossword from './Crossword.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.boxPool = []; // Box pool for rendering
        this.crossword = new Crossword();
    }

    create() {
        this.words = ['seat', 'east', 'tea','eat', 'set' ];
        const longestLength = Math.max(...this.words.map(str => str.length));
        const gridSize = longestLength * 5;

        const rows = gridSize;
        const cols = gridSize;

        this.crossword.initializeGrid(rows, cols);

        // Generate the crossword layout
        if (this.crossword.generateCrossword(this.words)) {
            const boxSize = 50; // Box size
            this.renderGrid(boxSize); // Render the grid visually
            console.table(this.crossword.grid); // Debugging: display the grid in the console
        } else {
            console.error('Failed to generate crossword');
        }
    }

    // Generate the crossword layout

    renderGrid(boxSize) {
        const gridWidth = this.crossword.grid[0].length * boxSize;
        const gridHeight = this.crossword.grid.length * boxSize;
        const centerX = this.cameras.main.width / 2 - gridWidth / 2;
        const centerY = this.cameras.main.height / 2 - gridHeight / 2;

        for (let row = 0; row < this.crossword.grid.length; row++) {
            for (let col = 0; col < this.crossword.grid[0].length; col++) {
                const letter = this.crossword.grid[row][col];
                if(letter != '')
                {
                    const x = centerX + col * boxSize;
                    const y = centerY + row * boxSize;
                    this.placeBox(x, y, boxSize, letter);
                }
            }
        }
    }

    // Pool-based rendering of boxes
    placeBox(x, y, size, letter, number = null) {
        let box = this.boxPool.length > 0 ? this.boxPool.pop() : new CrosswordBox(this, x, y, size);
        box.setPosition(x, y);
        box.setLetter(letter);
        box.show();

        if(number)
        {
            box.setNumber(number)
        }
    }
}
