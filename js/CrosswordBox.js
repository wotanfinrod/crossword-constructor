export default class CrosswordBox {
    constructor(scene, x, y, size, letter = '', number = '') {
        this.scene = scene;
        this.container = scene.add.container(x, y);
        this.box = scene.add.rectangle(0, 0, size, size, 0xFFFFFF).setStrokeStyle(2, 0x000000);
        this.container.add(this.box);

        // Create the text for the letter
        this.letter = scene.add.text(0, 0, letter, {
            fontSize: `${size * 0.5}px`,
            color: '#000',
        }).setOrigin(0.5);
        this.container.add(this.letter);

        // Create the number text for the top-left corner
        this.number = scene.add.text(-size * 0.35, -size * 0.35, number, {
            fontSize: `${size * 0.3}px`,
            color: '#000',
        }).setOrigin(0.5);
        this.container.add(this.number);


        this.number = scene.add.text()

        // Add interactivity
        this.container.setSize(size, size);
        this.container.setInteractive();
        this.container.on('pointerdown', () => {
            console.log(`Box clicked: ${this.letter.text}`);
            this.hide();
        });

        // Initially hide the box (if you're using a pool)
        this.hide();
    }

    setPosition(x, y) {
        this.container.setPosition(x, y);
    }

    setLetter(letter) {
        this.letter.setText(letter);
    }

    setNumber(numberIn){
        this.number.setText(numberIn);
    }

    show() {
        this.container.setVisible(true);
    }

    hide() {
        this.container.setVisible(false);
    }
}