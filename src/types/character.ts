export interface CharacterStats {
  attack: number;
  attackSpeed: number;
  defense: number;
  hp: number;
  skillCooldown: number;
}

export interface Character {
  id: string;
  name: string;
  image: string;
  originalStats: CharacterStats;
  modifiedStats: CharacterStats;
  selected: boolean;
}

export interface PatchData {
  id: string;
  name: string;
  version: string;
  description?: string;
  characters: Character[];
  createdAt: string;
}
