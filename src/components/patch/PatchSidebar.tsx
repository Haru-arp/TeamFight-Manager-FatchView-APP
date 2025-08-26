import { Button } from "@/components/ui/button";
import type { PatchData } from "@/types/character";
import { RefreshCw } from "lucide-react";

interface PatchSidebarProps {
  patches: PatchData[];
  selectedPatch: PatchData | null;
  loading: boolean;
  onSelectPatch: (patch: PatchData) => void;
  onDeletePatch: (patchId: string) => void;
  onLoadPatches: () => void;
}

export function PatchSidebar({
  patches,
  selectedPatch,
  loading,
  onSelectPatch,
  //   onDeletePatch,
  onLoadPatches,
}: PatchSidebarProps) {
  return (
    <div className="w-80 bg-slate-800 border-r border-slate-700 p-4 overflow-y-auto">
      <div className="space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-cyan-400">패치 버전</h2>
          <div className="flex gap-2">
            <Button
              onClick={onLoadPatches}
              size="sm"
              variant="outline"
              disabled={loading}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>

        {loading && (
          <div className="text-center text-slate-400 py-4">
            패치 데이터를 불러오는 중...
          </div>
        )}

        <div className="space-y-1 flex-1 overflow-y-auto">
          {patches.map((patch) => (
            <div
              key={patch.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedPatch?.id === patch.id
                  ? "bg-cyan-600/20 border-cyan-500"
                  : "bg-slate-700/50 border-slate-600 hover:border-slate-500"
              }`}
              onClick={() => onSelectPatch(patch)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{patch.name}</div>
                  <div className="text-xs text-slate-400">v{patch.version}</div>
                  {patch.description && (
                    <div className="text-xs text-slate-500 mt-1">
                      {patch.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
