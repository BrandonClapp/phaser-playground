let mapWidth = window.innerWidth;
let mapHeight = window.innerHeight;

let config = {
    type: Phaser.AUTO,
    width: mapWidth,
    height: mapHeight,
    parent: "game-container",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let controls;

function preload () {
    this.load.image('town_map', 'maps/assets/64/TownColor2@64x64.png');
    this.load.image('shadows', 'maps/assets/64/Shadows@64x64.png');

    this.load.tilemapTiledJSON('map', 'maps/assets/64/exported/town.json');
}

function create () {
    const map = this.make.tilemap({ key: 'map', tileWidth: 64, tileHeight: 64 });
    
    let tileset = map.addTilesetImage('TownColor2@64x64', 'town_map');
    //map.addTilesetImage('Shadows@64x64', 'shadows');
    
    console.log('tileset', tileset);
    console.log('map', map);

    map.layers.forEach(layer => {
        map.createStaticLayer(layer.name, tileset, layer.x, layer.y);
    });


   // Phaser supports multiple cameras, but you can access the default camera like this:
  const camera = this.cameras.main;

  // Set up the arrows to control the camera
  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5
  });

  // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
 
    // Help text that has a "fixed" position on the screen
    this.add
        .text(16, 16, "Arrow keys to scroll", {
            font: "18px monospace",
            fill: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#000000"
        })
        .setScrollFactor(0);
}

function update (time, delta) {
     controls.update(delta);
}