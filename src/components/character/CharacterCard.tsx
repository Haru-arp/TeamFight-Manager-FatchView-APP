import { Card, CardContent } from "@/components/ui/card";
import type { Character } from "@/types/character";

interface CharacterCardProps {
  character: Character;
  onToggleSelection: (characterId: string) => void;
}

export function CharacterCard({
  character,
  onToggleSelection,
}: CharacterCardProps) {
  const hasChanges = (character: Character) => {
    return (
      JSON.stringify(character.originalStats) !==
      JSON.stringify(character.modifiedStats)
    );
  };

  const getStatChange = (original: number, modified: number) => {
    if (original === modified) return null;
    return modified > original ? "increase" : "decrease";
  };

  return (
    <Card
      className={`bg-slate-800 border-slate-600 hover:border-cyan-500 transition-colors cursor-pointer relative ${
        character.selected ? "border-cyan-500" : ""
      } ${hasChanges(character) ? "border-yellow-500" : ""}`}
      onClick={() => onToggleSelection(character.id)}
    >
      <CardContent className="p-3">
        <div className="absolute top-2 left-2">
          <div
            className={`w-4 h-4 border-2 ${
              character.selected
                ? "bg-cyan-500 border-cyan-500"
                : "border-slate-400"
            } rounded-sm flex items-center justify-center`}
          >
            {character.selected && (
              <span className="text-white text-xs">✓</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center mb-3">
          <img
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            className="w-16 h-16 rounded-lg border-2 border-slate-500 mb-2 object-cover"
          />
          <h3 className="text-sm font-semibold text-white text-center">
            {character.name}
          </h3>
        </div>

        <div className="space-y-1 text-xs">
          {/* 공격력 */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">⚔️</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-mono">
                {character.originalStats.attack}
              </span>
              {getStatChange(
                character.originalStats.attack,
                character.modifiedStats.attack
              ) && (
                <>
                  <span className="text-slate-500">→</span>
                  <span
                    className={`font-mono ${
                      getStatChange(
                        character.originalStats.attack,
                        character.modifiedStats.attack
                      ) === "increase"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {character.modifiedStats.attack}
                  </span>
                </>
              )}
              {!getStatChange(
                character.originalStats.attack,
                character.modifiedStats.attack
              ) && (
                <span className="text-white font-mono">
                  {character.modifiedStats.attack}
                </span>
              )}
            </div>
          </div>

          {/* 공격 속도 */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">⚡</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-mono">
                {character.originalStats.attackSpeed.toFixed(2)}
              </span>
              {getStatChange(
                character.originalStats.attackSpeed,
                character.modifiedStats.attackSpeed
              ) && (
                <>
                  <span className="text-slate-500">→</span>
                  <span
                    className={`font-mono ${
                      getStatChange(
                        character.originalStats.attackSpeed,
                        character.modifiedStats.attackSpeed
                      ) === "increase"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {character.modifiedStats.attackSpeed.toFixed(2)}
                  </span>
                </>
              )}
              {!getStatChange(
                character.originalStats.attackSpeed,
                character.modifiedStats.attackSpeed
              ) && (
                <span className="text-white font-mono">
                  {character.modifiedStats.attackSpeed.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* 방어력 */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">🛡️</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-mono">
                {character.originalStats.defense}
              </span>
              {getStatChange(
                character.originalStats.defense,
                character.modifiedStats.defense
              ) ? (
                <>
                  <span className="text-slate-500">→</span>
                  <span
                    className={`font-mono ${
                      getStatChange(
                        character.originalStats.defense,
                        character.modifiedStats.defense
                      ) === "increase"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {character.modifiedStats.defense}
                  </span>
                </>
              ) : (
                <span className="text-white font-mono">
                  {character.modifiedStats.defense}
                </span>
              )}
            </div>
          </div>

          {/* 체력 */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">❤️</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-mono">
                {character.originalStats.hp}
              </span>
              {getStatChange(
                character.originalStats.hp,
                character.modifiedStats.hp
              ) ? (
                <>
                  <span className="text-slate-500">→</span>
                  <span
                    className={`font-mono ${
                      getStatChange(
                        character.originalStats.hp,
                        character.modifiedStats.hp
                      ) === "increase"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {character.modifiedStats.hp}
                  </span>
                </>
              ) : (
                <span className="text-white font-mono">
                  {character.modifiedStats.hp}
                </span>
              )}
            </div>
          </div>

          {/* 스킬 쿨타임 */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">⏱️</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-mono">
                {character.originalStats.skillCooldown.toFixed(2)}
              </span>
              {getStatChange(
                character.originalStats.skillCooldown,
                character.modifiedStats.skillCooldown
              ) ? (
                <>
                  <span className="text-slate-500">→</span>
                  <span
                    className={`font-mono ${
                      getStatChange(
                        character.originalStats.skillCooldown,
                        character.modifiedStats.skillCooldown
                      ) === "increase"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {character.modifiedStats.skillCooldown.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-white font-mono">
                  {character.modifiedStats.skillCooldown.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
