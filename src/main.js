// إعدادات اللعبة الرئيسية
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    render: {
        pixelArt: true,
        antialias: false
    },
    scene: [
        PreloadScene,
        MenuScene,
        LevelSelectScene,
        GameScene,
        ShopScene,
        GameOverScene
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container'
    }
};

const game = new Phaser.Game(config);

// إزالة شاشة التحميل عند بدء اللعبة
setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}, 1000);
