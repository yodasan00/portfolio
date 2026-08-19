import React from 'react';
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    SPRITES,
    WORLD_ENTITIES,
    PLAYER_SIZE,
    TILE_WIDTH,
    TILE_HEIGHT,
    pixelToGrid,
    type WorldEntityConfig,
    type SpriteAsset
} from '@/interfaces/constants';
import { WorldEntity } from '@/components/molecules/WorldEntity/WorldEntity';
import { type Player, type Vector2 } from '@interfaces/types';

interface DynamicLayerProps {
    gameStatus: string;
    player: Player;
    facing: 'up' | 'down' | 'left' | 'right';
    animationState: 'idle' | 'walk';
    currentSprite: string | SpriteAsset;
    moveQueue: Vector2[];
    nearbyObject: WorldEntityConfig | null;
    hoverPos: Vector2 | null;
    onTriggerObject: (objId: string) => void;
    isNarrativeActive: boolean;
}

const getInteractLabel = (id: string): string => {
    switch (id) {
        case 'computer': return 'Use PC';
        case 'videoGame': return 'Console';
        case 'plantShelf': return 'Plants';
        case 'backpack': return 'Resume';
        default: return 'Interact';
    }
};

export const DynamicLayer: React.FC<DynamicLayerProps> = ({
    gameStatus,
    player,
    facing,
    animationState,
    currentSprite,
    moveQueue,
    nearbyObject,
    hoverPos,
    onTriggerObject,
    isNarrativeActive
}) => {

    const renderPlayerVisual = () => {
        const style: React.CSSProperties = {
            width: '100%',
            height: '100%'
        };

        if (typeof currentSprite === 'string') {
            style.backgroundImage = `url(${currentSprite})`;
        } else {
            if (currentSprite.webp) {
                style.backgroundImage = `image-set(url("${currentSprite.webp}") type("image/webp"), url("${currentSprite.png}") type("image/png"))`;
            } else {
                style.backgroundImage = `url(${currentSprite.png})`;
            }
        }

        return (
            <div
                className="game-canvas__player-visual"
                data-facing={facing}
                data-anim={animationState}
                style={style}
            />
        );
    };

    const getChatIndicatorStyle = () => {
        const sprite = SPRITES.chatIndicator;
        if (typeof sprite === 'object') {
            if (sprite.webp) {
                return { backgroundImage: `image-set(url("${sprite.webp}") type("image/webp"), url("${sprite.png}") type("image/png"))` };
            }
            return { backgroundImage: `url(${sprite.png})` };
        }
        return { backgroundImage: `url(${sprite})` };
    };

    return (
        <div className="game-canvas__dynamic-layer">
            {WORLD_ENTITIES.map((obj) => {
                const spriteKey = obj.type as keyof typeof SPRITES;
                const sprite = SPRITES[spriteKey];

                let dynamicZIndex = obj.zIndex ?? 20;
                if (obj.id === 'carpet') {
                    dynamicZIndex = 1;
                } else {
                    const playerFeetY = player.position.y + PLAYER_SIZE.y;
                    const objectBaseY = obj.position.y + obj.size.y * 0.75;
                    dynamicZIndex = playerFeetY < objectBaseY ? 25 : 15;
                }

                const renderObj = { ...obj, zIndex: dynamicZIndex };

                return (
                    <WorldEntity key={obj.id} object={renderObj} sprite={sprite} />
                );
            })}
            {hoverPos && (
                <div
                    className='game-canvas__hover-path'
                    style={{
                        left: `${(hoverPos.x / CANVAS_WIDTH) * 100}%`,
                        top: `${(hoverPos.y / CANVAS_HEIGHT) * 100}%`,
                        width: `${(TILE_WIDTH / CANVAS_WIDTH) * 100}%`,
                        height: `${(TILE_HEIGHT / CANVAS_HEIGHT) * 100}%`,
                    }}
                />
            )}

            {moveQueue.map((pos, idx) => (
                <div
                    key={`path-${idx}`}
                    className="game-canvas__path-dot"
                    style={{
                        left: `${((pos.x + TILE_WIDTH / 2) / CANVAS_WIDTH) * 100}%`,
                        top: `${((pos.y + TILE_HEIGHT / 2) / CANVAS_HEIGHT) * 100}%`,
                    }}
                />
            ))}

            {gameStatus === 'playing' && nearbyObject && !isNarrativeActive && (
                <button
                    type="button"
                    className="game-canvas__interact-badge"
                    onClick={(e) => {
                        e.stopPropagation();
                        onTriggerObject(nearbyObject.id);
                    }}
                    style={{
                        left: `${((nearbyObject.position.x + nearbyObject.size.x / 2) / CANVAS_WIDTH) * 100}%`,
                        top: `${((nearbyObject.position.y - 2) / CANVAS_HEIGHT) * 100}%`,
                    }}
                    aria-label={`Press E to ${getInteractLabel(nearbyObject.id)}`}
                >
                    <span className="game-canvas__interact-key">E</span>
                    <span className="game-canvas__interact-text">{getInteractLabel(nearbyObject.id)}</span>
                </button>
            )}

            {/* Player */}
            <div
                className="game-canvas__player"
                style={{
                    left: `${(player.position.x / CANVAS_WIDTH) * 100}%`,
                    top: `${(player.position.y / CANVAS_HEIGHT) * 100}%`,
                    width: `${(PLAYER_SIZE.x / CANVAS_WIDTH) * 100}%`,
                    height: `${(PLAYER_SIZE.y / CANVAS_HEIGHT) * 100}%`,
                }}
            >
                {renderPlayerVisual()}

                {isNarrativeActive && (
                    <div
                        className="game-canvas__chat-indicator"
                        style={getChatIndicatorStyle()}
                    />
                )}
            </div>
        </div>
    );
};
