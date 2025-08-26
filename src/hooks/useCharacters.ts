import type { Character, CharacterStats } from "@/types/character";
import { useState, useEffect } from "react";
// import { Character, CharacterStats } from "@/types/character";

export function useCharacters(initialCharacters: Character[] = []) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);

  useEffect(() => {
    setCharacters(initialCharacters);
  }, [initialCharacters]);

  const toggleCharacterSelection = (characterId: string) => {
    setCharacters(
      characters.map((char) =>
        char.id === characterId ? { ...char, selected: !char.selected } : char
      )
    );
  };

  const updateCharacterStat = (
    characterId: string,
    stat: keyof CharacterStats,
    value: number
  ) => {
    setCharacters(
      characters.map((char) =>
        char.id === characterId
          ? { ...char, modifiedStats: { ...char.modifiedStats, [stat]: value } }
          : char
      )
    );
  };

  const resetCharacterStats = (characterId: string) => {
    setCharacters(
      characters.map((char) =>
        char.id === characterId
          ? { ...char, modifiedStats: { ...char.originalStats } }
          : char
      )
    );
  };

  const resetAllStats = () => {
    setCharacters(
      characters.map((char) => ({
        ...char,
        modifiedStats: { ...char.originalStats },
      }))
    );
  };

  return {
    characters,
    setCharacters,
    toggleCharacterSelection,
    updateCharacterStat,
    resetCharacterStats,
    resetAllStats,
  };
}
