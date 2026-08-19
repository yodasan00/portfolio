import { useState, useRef, useEffect, useCallback } from 'react';
import { useSound } from '@/context/SoundContext';
import { type Player } from '@interfaces/types';
import { WORLD_ENTITIES } from '@/interfaces/constants';
import { type TranslationKeys } from '@/utils/translationsKeys';

export const useGameEvents = (
    gameStatus: string,
    player: Player,
    announce: (msg: string) => void,
    t: (key: TranslationKeys) => string
) => {
    const [gameEventMessage, setGameEventMessage] = useState<string | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showVideoGamePrompt, setShowVideoGamePrompt] = useState(false);
    const [showPaperScreenPrompt, setShowPaperScreenPrompt] = useState(false);
    const computerEventTriggeredRef = useRef(false);
    const { playSfx } = useSound();

    const triggerObjectEvent = useCallback((objId: string) => {
        if (objId === 'computer') {
            const msg = t('game_event_computer_found');
            setGameEventMessage(msg);
            setShowLoginPrompt(true);
            setShowVideoGamePrompt(false);
            setShowPaperScreenPrompt(false);
            announce(msg);
        } else if (objId === 'videoGame') {
            const msg = t('game_event_videogame_found');
            setGameEventMessage(msg);
            setShowVideoGamePrompt(true);
            setShowLoginPrompt(false);
            setShowPaperScreenPrompt(false);
            announce(msg);
        } else if (objId === 'backpack') {
            const msg = t('game_event_backpack_found');
            setGameEventMessage(msg);
            setShowPaperScreenPrompt(true);
            setShowLoginPrompt(false);
            setShowVideoGamePrompt(false);
            announce(msg);
        } else if (objId === 'plantShelf') {
            const msg = "A lush botanical shelf filled with vibrant monstera, trailing ivy, and favorite books.";
            setGameEventMessage(msg);
            setShowLoginPrompt(false);
            setShowVideoGamePrompt(false);
            setShowPaperScreenPrompt(false);
            announce(msg);
        } else if (objId === 'catJoao' || objId === 'catMaria') {
            playSfx('game_cat');
            announce(t('game_cat_meow') || 'Meow');
        }
    }, [t, announce, playSfx]);

    return {
        gameEventMessage,
        setGameEventMessage,
        showLoginPrompt,
        setShowLoginPrompt,
        showVideoGamePrompt,
        setShowVideoGamePrompt,
        showPaperScreenPrompt,
        setShowPaperScreenPrompt,
        triggerObjectEvent
    };
};
