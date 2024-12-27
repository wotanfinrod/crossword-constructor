import CrosswordBox from './CrosswordBox.js';
import Crossword from './Crossword.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.boxPool = []; // Box pool for rendering
        this.placedBoxes = [] //To keep track of objects currently being used.
        this.crossword = new Crossword();
        this.words = ['seat', 'east', 'tea','eat', 'set' ];
        this.sceneConfig =
        {
            boxSize : 50
        };
    }

    create() {
        this.addShuffleButton();
        this.initializeGame();
    }

    initializeGame()
    {
        const longestLength = Math.max(...this.words.map(str => str.length));
        const gridSize = longestLength *5;
        
        this.crossword.initializeGrid(gridSize);

        if (this.crossword.generateCrossword(this.words)) {
            this.renderGrid(this.sceneConfig.boxSize); // Render the grid visually
        } else {
            console.error('Failed to generate crossword. Retrying...');
            this.regeneratePuzzle();
        }
    }

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

    placeBox(x, y, size, letter, number = null) {
        let box = this.boxPool.length > 0 ? this.boxPool.pop() : new CrosswordBox(this, x, y, size);
        box.setPosition(x, y);
        box.setLetter(letter);
        box.show();
        this.placedBoxes.push(box);
        if(number)
        {
            box.setNumber(number)
        }
    }

    resetBoxes()
    {
        this.boxPool.push(...this.placedBoxes);
        this.placedBoxes = [];
        this.boxPool.forEach(box => box.hide());
    }

    addShuffleButton()
    {
        const button = this.add.text
        (
            this.cameras.main.width - 150,
            this.cameras.main.height - 60,
            'Change', 
            {
                fontSize : '32px',
                fill: '#000',
                backgroundColor : '#fff',
                padding: 10,
                align: 'center'

            }
        ).setInteractive()
        .on('pointerdown', () => this.regeneratePuzzle())
    }

    regeneratePuzzle()
    {
        this.resetBoxes();
        this.words = Phaser.Utils.Array.Shuffle(this.words);
        this.initializeGame(); 
    }
}
