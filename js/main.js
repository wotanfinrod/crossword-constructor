// js/main.js
import CrosswordScene from './GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: CrosswordScene,
    backgroundColor: '#F0F0F0',
};

const game = new Phaser.Game(config);
