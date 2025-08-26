import type { Character } from "@/types/character";
import { CharacterCard } from "./CharacterCard";

interface CharacterGridProps {
  characters: Character[];
  onToggleSelection: (characterId: string) => void;
}

export function CharacterGrid({
  characters,
  onToggleSelection,
}: CharacterGridProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onToggleSelection={onToggleSelection}
        />
      ))}
    </div>
  );
}
