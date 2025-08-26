import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

export function patchesScanner(): Plugin {
  const scanPatches = () => {
    try {
      const patchesDir = path.resolve("public/patches");

      if (!fs.existsSync(patchesDir)) {
        console.log("📁 patches 폴더가 없어서 생성합니다.");
        fs.mkdirSync(patchesDir, { recursive: true });
        return [];
      }

      // .json 파일들만 스캔 (index.json 제외)
      const files = fs
        .readdirSync(patchesDir)
        .filter((file) => file.endsWith(".json") && file !== "index.json")
        .sort();

      // index.json 자동 생성/업데이트
      const indexPath = path.join(patchesDir, "index.json");
      fs.writeFileSync(indexPath, JSON.stringify(files, null, 2));

      console.log(
        `✅ 패치 파일 ${files.length}개 발견, index.json 업데이트 완료`
      );
      console.log(`   파일 목록: ${files.join(", ")}`);

      return files;
    } catch (error) {
      console.error("❌ 패치 스캔 에러:", error);
      return [];
    }
  };

  return {
    name: "patches-scanner",

    // 빌드 시작할 때 스캔
    buildStart() {
      scanPatches();
    },

    // 개발 서버 설정
    configureServer(server) {
      // 개발 모드에서 파일 변경 감지를 위한 API 엔드포인트
      server.middlewares.use("/api/patches", (req, res, next) => {
        if (req.method === "GET" && req.url === "/scan") {
          try {
            const files = scanPatches();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ files, count: files.length }));
          } catch (error) {
            res.statusCode = 500;
            res.end(
              JSON.stringify({
                error: error instanceof Error ? error.message : String(error),
              })
            );
          }
        } else {
          next();
        }
      });

      // patches 폴더 변경 감지
      const patchesDir = path.resolve("public/patches");
      if (fs.existsSync(patchesDir)) {
        fs.watch(patchesDir, (_eventType, filename) => {
          if (
            filename &&
            filename.endsWith(".json") &&
            filename !== "index.json"
          ) {
            console.log(`🔄 패치 파일 변경 감지: ${filename}`);
            scanPatches();
          }
        });
      }
    },
  };
}
