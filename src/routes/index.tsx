import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { PatchSidebar } from "@/components/patch/PatchSidebar";
import { CharacterGrid } from "@/components/character/CharacterGrid";
import { usePatches } from "@/hooks/usePatches";
import { useCharacters } from "@/hooks/useCharacters";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    patches,
    selectedPatch,
    loading,
    loadStaticPatches,
    selectPatch,
    deletePatch,
  } = usePatches();

  const { characters, toggleCharacterSelection } = useCharacters(
    selectedPatch?.characters || []
  );

  useEffect(() => {
    loadStaticPatches();
  }, []);

  const exportJSON = () => {
    const dataStr = JSON.stringify(characters, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tfm-balance-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700 bg-slate-800">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-cyan-400">챔피언 밸런스</h1>
          <div className="flex gap-2">
            <Button
              onClick={exportJSON}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              Json Export
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        <PatchSidebar
          patches={patches}
          selectedPatch={selectedPatch}
          loading={loading}
          onSelectPatch={selectPatch}
          onDeletePatch={deletePatch}
          onLoadPatches={loadStaticPatches}
        />

        <div className="flex-1 p-6 overflow-y-auto">
          {selectedPatch && (
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white mb-2">
                {selectedPatch.name}
              </h2>
              <p className="text-slate-400 text-sm">
                버전: {selectedPatch.version}
              </p>
              {selectedPatch.description && (
                <p className="text-slate-500 text-sm mt-1">
                  {selectedPatch.description}
                </p>
              )}
            </div>
          )}

          <CharacterGrid
            characters={characters}
            onToggleSelection={toggleCharacterSelection}
          />
        </div>
      </div>
    </div>
  );
}
