import playerIcon from '@assets/images/game/idleAnim-Sheet.png';
import walkDown from '@assets/images/game/walkDownAnim-Sheet.png';
import walkUp from '@assets/images/game/walkUpAnim-Sheet.png';
import walkLeft from '@assets/images/game/walkLeftAnim-Sheet.png';
import walkRight from '@assets/images/game/walkRightAnim-Sheet.png';
import botanicalComputer from '@assets/images/game/botanical_computer.png';
import botanicalTv from '@assets/images/game/botanical_tv.png';
import botanicalBed from '@assets/images/game/botanical_bed.png';
import botanicalCarpet from '@assets/images/game/botanical_carpet.png';
import botanicalShelf from '@assets/images/game/botanical_shelf.png';
import botanicalBackpack from '@assets/images/game/botanical_backpack.png';

import iconTalk from '@assets/images/game/icon_talk.png';
import iconTalkWebP from '@assets/images/game/icon_talk.webp';
import pictureIcon from '@assets/images/game/pictures.png';
import pictureIconWebP from '@assets/images/game/pictures.webp';
import pictureIcon2 from '@assets/images/game/pictures1.png';
import pictureIcon2WebP from '@assets/images/game/pictures1.webp';

import CatJoaoIdle from '@assets/images/game/cat-joao-Sheet.png';
import CatJoaoIdleWebP from '@assets/images/game/cat-joao-Sheet.webp';
import CatMariaIdle from '@assets/images/game/cat-maria-Sheet.png';
import CatMariaIdleWebP from '@assets/images/game/cat-maria-Sheet.webp';
import iconLove from '@assets/images/game/icon_love.png';
import iconLoveWebP from '@assets/images/game/icon_love.webp';

// Define a type for sprite assets to ensure consistency
export interface SpriteAsset {
  png: string;
  webp?: string; // Optional for GIFs or external URLs
}

export const SPRITES: Record<string, SpriteAsset | string> = {
  player: { png: playerIcon }, // Idle
  walkDown: { png: walkDown },
  walkUp: { png: walkUp },
  walkLeft: { png: walkLeft },
  walkRight: { png: walkRight },
  computer: { png: botanicalComputer },
  picture: { png: pictureIcon, webp: pictureIconWebP },
  picture2: { png: pictureIcon2, webp: pictureIcon2WebP },
  videoGame: { png: botanicalTv },
  carpet: { png: botanicalCarpet },
  bed: { png: botanicalBed },
  plantShelf: { png: botanicalShelf },
  wall: { png: `https://upload.wikimedia.org/wikipedia/commons/5/50/Black_colour.jpg` },
  chatIndicator: { png: iconTalk, webp: iconTalkWebP },
  loveIcon: { png: iconLove, webp: iconLoveWebP },
  catJoao: { png: CatJoaoIdle, webp: CatJoaoIdleWebP },
  catMaria: { png: CatMariaIdle, webp: CatMariaIdleWebP },
  backpack: { png: botanicalBackpack },
};


export const preloadPlayerSprites = (): void => {
  const assets = [
    SPRITES.player,
    SPRITES.walkUp,
    SPRITES.walkDown,
    SPRITES.walkLeft,
    SPRITES.walkRight,
  ] as SpriteAsset[];

  assets.forEach((asset) => {
    const img = new Image();
    img.src = asset.png;
    if (asset.webp) {
      const imgWebP = new Image();
      imgWebP.src = asset.webp;
    }
  });
};

// Auto-preload on module import
preloadPlayerSprites();

// Floor sprites for 2x2 tiling pattern
import walkFloor1 from '@assets/images/game/walkFloor_1.png';
import walkFloor2 from '@assets/images/game/walkFloor_2.png';
import walkFloor3 from '@assets/images/game/walkFloor_3.png';
import walkFloor4 from '@assets/images/game/walkFloor_4.png';

// Bottom row special floor sprites (collision tiles with visual aesthetic)
import collideBottomWall0 from '@assets/images/game/collideBottomWall_0.png';
import collideBottomWall1 from '@assets/images/game/collideBottomWall_1.png';
import collideBottomWall2 from '@assets/images/game/collideBottomWall_2.png';

// Side wall sprites (left and right columns)
import collideLeftWall0 from '@assets/images/game/collideLeftWall_0.png';
import collideRightWall0 from '@assets/images/game/collideRightWall_0.png';

// Top wall sprites (stacked vertically from top to bottom)
import collideTopWall1 from '@assets/images/game/collideTopWall_1.png';
import collideTopWall2 from '@assets/images/game/collideTopWall_2.png';
import collideTopWall3 from '@assets/images/game/collideTopWall_3.png';

// Top wall column sprites - Left column (col = 1)
import collideTopWallColumnLeft1 from '@assets/images/game/collideTopWallColumnLeft_1.png';
import collideTopWallColumnLeft2 from '@assets/images/game/collideTopWallColumnLeft_2.png';
import collideTopWallColumnLeft3 from '@assets/images/game/collideTopWallColumnLeft_3.png';
import collideTopWallColumnLeft4 from '@assets/images/game/collideTopWallColumnLeft_4.png';

// Top wall column sprites - Right column (col = 7)
import collideTopWallColumnRight1 from '@assets/images/game/collideTopWallColumnRight_1.png';
import collideTopWallColumnRight2 from '@assets/images/game/collideTopWallColumnRight_2.png';
import collideTopWallColumnRight3 from '@assets/images/game/collideTopWallColumnRight_3.png';
import collideTopWallColumnRight4 from '@assets/images/game/collideTopWallColumnRight_4.png';

// Top wall column BORDER sprites (Row 0, Col 0 and Col 8)
import collideTopWallColumnBorderLeft1 from '@assets/images/game/collideTopWallColumnBorderLeft_1.png';
import collideTopWallColumnBorderRight1 from '@assets/images/game/collideTopWallColumnBorderRight_1.png';


export const FLOOR_SPRITES: SpriteAsset[] = [
  { png: walkFloor1 },
  { png: walkFloor2 },
  { png: walkFloor3 },
  { png: walkFloor4 },
];

export const BOTTOM_ROW_SPRITES: Record<string, SpriteAsset> = {
  leftCorner: { png: collideBottomWall0 },
  middle: { png: collideBottomWall1 },
  rightCorner: { png: collideBottomWall2 },
};

export const SIDE_WALL_SPRITES: Record<string, SpriteAsset> = {
  left: { png: collideLeftWall0 },
  right: { png: collideRightWall0 },
};

export const TOP_WALL_SPRITES: SpriteAsset[] = [
  { png: collideTopWall1 },
  { png: collideTopWall2 },
  { png: collideTopWall3 },
];

export const TOP_WALL_ROWS = 3;

export const TOP_WALL_COLUMN_LEFT_SPRITES: SpriteAsset[] = [
  { png: collideTopWallColumnLeft1 },
  { png: collideTopWallColumnLeft2 },
  { png: collideTopWallColumnLeft3 },
  { png: collideTopWallColumnLeft4 },
];

export const TOP_WALL_COLUMN_RIGHT_SPRITES: SpriteAsset[] = [
  { png: collideTopWallColumnRight1 },
  { png: collideTopWallColumnRight2 },
  { png: collideTopWallColumnRight3 },
  { png: collideTopWallColumnRight4 },
];

/**
 * Returns the floor sprite for a given tile position.
 * Uses row/col parity to create a repeating 2x2 pattern.
 */
export const getFloorSprite = (row: number, col: number): SpriteAsset => {
  const index = (row % 2) * 2 + (col % 2);
  return FLOOR_SPRITES[index];
};

/**
 * Returns the appropriate sprite for the BOTTOM ROW of the grid.
 */
export const getBottomRowSprite = (col: number, gridCols: number): SpriteAsset => {
  if (col === 0) {
    return BOTTOM_ROW_SPRITES.leftCorner;
  }
  if (col === gridCols - 1) {
    return BOTTOM_ROW_SPRITES.rightCorner;
  }
  return BOTTOM_ROW_SPRITES.middle;
};

/**
 * Returns the appropriate sprite for SIDE WALLS (left and right columns).
 */
export const getSideWallSprite = (col: number, gridCols: number): SpriteAsset | null => {
  if (col === 0) {
    return SIDE_WALL_SPRITES.left;
  }
  if (col === gridCols - 1) {
    return SIDE_WALL_SPRITES.right;
  }
  return null;
};

/**
 * Returns the appropriate sprite for the TOP WALL section of the grid.
 */
export const getTopWallSprite = (row: number, col: number, gridCols: number): SpriteAsset | null => {
  if (row < 0 || row >= TOP_WALL_ROWS) {
    return null;
  }

  if (col === 0 || col === gridCols - 1) {
    return null;
  }

  const index = (TOP_WALL_ROWS - 1) - row;
  return TOP_WALL_SPRITES[index];
};

/**
 * Returns the appropriate sprite for TOP WALL COLUMN colliders.
 */
export const getTopWallColumnSprite = (row: number, col: number, collisionMap: number[][]): SpriteAsset | null => {
  const gridRows = collisionMap.length;
  const gridCols = collisionMap[0].length;

  const leftCol = 1;
  const rightCol = gridCols - 2;

  if (col !== leftCol && col !== rightCol) return null;
  if (collisionMap[row][col] !== 1) return null;
  if (row === gridRows - 1) return null;

  let r = row;
  while (r < gridRows - 2 && collisionMap[r + 1][col] === 1) {
    r++;
  }
  const baseRow = r;

  const distFromBase = baseRow - row;
  const targetIndex = 3 - distFromBase;
  const spriteIndex = Math.max(0, targetIndex);

  const sprites = (col === leftCol)
    ? TOP_WALL_COLUMN_LEFT_SPRITES
    : TOP_WALL_COLUMN_RIGHT_SPRITES;

  return sprites[spriteIndex];
};

/**
 * Returns the appropriate sprite for TOP WALL COLUMN BORDERS.
 */
export const getTopWallColumnBorderSprite = (row: number, col: number, gridCols: number): SpriteAsset | null => {
  if (row !== 0) return null;

  if (col === 0) {
    return { png: collideTopWallColumnBorderLeft1 };
  }
  if (col === gridCols - 1) {
    return { png: collideTopWallColumnBorderRight1 };
  }

  return null;
};

export const TILE_WIDTH = 16;
export const TILE_HEIGHT = 16;

export const GRID_COLS = 9;
export const GRID_ROWS = 10;
export const CANVAS_WIDTH = GRID_COLS * TILE_WIDTH;
export const CANVAS_HEIGHT = GRID_ROWS * TILE_HEIGHT;

export const COLLISION_MAP: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 2, 2, 2, 0, 1, 1],
  [1, 2, 0, 0, 0, 0, 2, 2, 1],
  [1, 2, 0, 0, 0, 0, 2, 2, 1],
  [1, 0, 0, 0, 0, 0, 2, 2, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
];


export const isTileWalkable = (col: number, row: number): boolean => {
  if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) {
    return false;
  }
  return COLLISION_MAP[row][col] === 0;
};

export const pixelToGrid = (x: number, y: number): { col: number; row: number } => {
  return {
    col: Math.floor(x / TILE_WIDTH),
    row: Math.floor(y / TILE_HEIGHT),
  };
};

export const gridToPixel = (col: number, row: number): { x: number; y: number } => {
  return {
    x: col * TILE_WIDTH,
    y: row * TILE_HEIGHT,
  };
};

export const INITIAL_PLAYER_POS = { x: 3.5 * TILE_WIDTH, y: 5 * TILE_HEIGHT };
export const PLAYER_SIZE = { x: TILE_WIDTH, y: TILE_HEIGHT };

export interface WorldEntityConfig {
  id: string;
  gridPos: { col: number; row: number };
  position: { x: number; y: number };
  size: { x: number; y: number };
  type: string;
  zIndex?: number;
  isInteractive?: boolean;
}

export const WORLD_ENTITIES: WorldEntityConfig[] = [
  {
    id: 'computer',
    gridPos: { col: 3, row: 3 },
    position: { x: 3.1 * TILE_WIDTH, y: 1.4 * TILE_HEIGHT },
    size: { x: TILE_WIDTH * 2.8, y: TILE_HEIGHT * 2.9 },
    type: 'computer',
    zIndex: 2,
    isInteractive: true,
  },
  {
    id: 'plantShelf',
    gridPos: { col: 6, row: 3 },
    position: { x: 6.2 * TILE_WIDTH, y: 1.2 * TILE_HEIGHT },
    size: { x: TILE_WIDTH * 2.0, y: TILE_HEIGHT * 2.6 },
    type: 'plantShelf',
    zIndex: 2,
    isInteractive: true,
  },
  {
    id: 'videoGame',
    gridPos: { col: 1, row: 4 },
    position: { x: 0.8 * TILE_WIDTH, y: 3.2 * TILE_HEIGHT },
    size: { x: TILE_WIDTH * 1.8, y: TILE_HEIGHT * 2.8 },
    type: 'videoGame',
    isInteractive: true,
  },
  {
    id: 'carpet',
    gridPos: { col: 3, row: 5 },
    position: { x: 2.8 * TILE_WIDTH, y: 4.5 * TILE_HEIGHT },
    size: { x: TILE_WIDTH * 3.3, y: TILE_HEIGHT * 4.4 },
    type: 'carpet',
    zIndex: 1,
    isInteractive: false,
  },
  {
    id: 'bed',
    gridPos: { col: 6, row: 5 },
    position: { x: 5.6 * TILE_WIDTH, y: 4.2 * TILE_HEIGHT },
    size: { x: TILE_WIDTH * 2.3, y: TILE_HEIGHT * 3.2 },
    type: 'bed',
    zIndex: 15,
    isInteractive: false,
  },
  {
    id: 'catJoao',
    gridPos: { col: 4, row: 7 },
    position: { x: 3.6 * TILE_WIDTH, y: 6.2 * TILE_HEIGHT },
    size: { x: TILE_WIDTH * 0.8, y: TILE_HEIGHT * 0.8 },
    type: 'catJoao',
    zIndex: 25,
    isInteractive: true,
  },
  {
    id: 'catMaria',
    gridPos: { col: 2, row: 6 },
    position: { x: 1.8 * TILE_WIDTH, y: 6.6 * TILE_HEIGHT },
    size: { x: TILE_WIDTH * 0.8, y: TILE_HEIGHT * 0.8 },
    type: 'catMaria',
    zIndex: 25,
    isInteractive: true,
  },
  {
    id: 'backpack',
    gridPos: { col: 6, row: 7 },
    position: { x: 6.2 * TILE_WIDTH, y: 7.2 * TILE_HEIGHT },
    size: { x: TILE_WIDTH * 1.4, y: TILE_HEIGHT * 1.5 },
    type: 'backpack',
    zIndex: 20,
    isInteractive: true,
  },
];

export const OS_CONFIG = {
  MAX_WINDOWS: 6,
  MIN_WINDOW_WIDTH: 300,
  MIN_WINDOW_HEIGHT: 300,
  ASSISTANT_ID: 'assistant',
};

export const VIDEOGAME_CONFIG = {
  BOX_COUNT: 112,
  HIDDEN_INDICES: [39, 40, 45, 46, 47, 93, 94, 100, 101],
};


