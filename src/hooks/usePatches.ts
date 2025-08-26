import { useState } from "react";
import { SAMPLE_DATA } from "@/data/sampleData";
import type { PatchData } from "@/types/character";

export function usePatches() {
  const [patches, setPatches] = useState<PatchData[]>([]);
  const [selectedPatch, setSelectedPatch] = useState<PatchData | null>(null);
  const [loading, setLoading] = useState(false);

  const loadStaticPatches = async () => {
    setLoading(true);
    try {
      // Vite 플러그인이 생성한 index.json에서 파일 목록 가져오기
      const indexResponse = await fetch("/patches/index.json");

      if (!indexResponse.ok) {
        console.log("index.json을 찾을 수 없습니다. 기본 패치를 사용합니다.");
        createDefaultPatch();
        return;
      }

      const patchFiles: string[] = await indexResponse.json();

      if (patchFiles.length === 0) {
        console.log("패치 파일이 없습니다. 기본 패치를 사용합니다.");
        createDefaultPatch();
        return;
      }

      const loadedPatches: PatchData[] = [];

      // 모든 패치 파일 로드
      for (const filename of patchFiles) {
        try {
          const patchResponse = await fetch(`/patches/${filename}`);
          if (!patchResponse.ok) {
            console.warn(`패치 파일 ${filename}을 로드할 수 없습니다.`);
            continue;
          }

          const patchData = await patchResponse.json();
          const patch: PatchData = {
            id: filename.replace(".json", ""),
            name: patchData.name || filename.replace(".json", ""),
            version: patchData.version || "1.0.0",
            description: patchData.description || "",
            characters: patchData.characters || [],
            createdAt: patchData.createdAt || new Date().toISOString(),
          };
          loadedPatches.push(patch);
        } catch (error) {
          console.warn(`패치 파일 ${filename} 파싱 에러:`, error);
        }
      }

      if (loadedPatches.length > 0) {
        // 버전순으로 정렬 (최신 버전이 먼저 오도록)
        loadedPatches.sort((a, b) => b.version.localeCompare(a.version));
        setPatches(loadedPatches);
        setSelectedPatch(loadedPatches[0]);
        console.log(`✅ ${loadedPatches.length}개의 패치를 로드했습니다.`);
      } else {
        console.log("유효한 패치 파일이 없습니다. 기본 패치를 사용합니다.");
        createDefaultPatch();
      }
    } catch (error) {
      console.error("패치 로딩 에러:", error);
      createDefaultPatch();
    }
    setLoading(false);
  };

  const createDefaultPatch = () => {
    const defaultPatch: PatchData = {
      id: "default",
      name: "기본 패치",
      version: "1.0.0",
      description: "기본 캐릭터 데이터",
      characters: SAMPLE_DATA,
      createdAt: new Date().toISOString(),
    };
    setPatches([defaultPatch]);
    setSelectedPatch(defaultPatch);
  };

  const selectPatch = (patch: PatchData) => {
    setSelectedPatch(patch);
  };

  const deletePatch = (patchId: string) => {
    const updatedPatches = patches.filter((p) => p.id !== patchId);
    setPatches(updatedPatches);

    if (selectedPatch?.id === patchId) {
      if (updatedPatches.length > 0) {
        setSelectedPatch(updatedPatches[0]);
      } else {
        createDefaultPatch();
      }
    }
  };

  return {
    patches,
    selectedPatch,
    loading,
    loadStaticPatches,
    selectPatch,
    deletePatch,
  };
}
