const GAME_CONFIG = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 600,
    PLAYER_SPEED: 200,
    PLAYER_JUMP_FORCE: 400,
    GRAVITY: 300,
    COIN_VALUE: 10,
    OUTFIT_PRICES: {
        outfit1: 100,
        outfit2: 250,
        outfit3: 500
    },
    TOTAL_LEVELS: 100,
    DIFFICULTY_MULTIPLIER: 1.05, // زيادة 5% كل مرحلة
    CONTROLS: {
        LEFT: 'A',
        RIGHT: 'D',
        JUMP: 'W',
        DASH: 'SHIFT',
        PAUSE: 'P',
        SHOP: 'S'
    }
};

const OUTFITS = {
    default: { name: 'الزي الافتراضي', owned: true, price: 0 },
    outfit1: { name: 'الزي الأول', owned: false, price: 100 },
    outfit2: { name: 'الزي الثاني', owned: false, price: 250 },
    outfit3: { name: 'الزي الثالث', owned: false, price: 500 }
};
