#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const patchesDir = path.join(__dirname, "../public/patches");
const indexPath = path.join(patchesDir, "index.json");

try {
  // patches 폴더의 모든 .json 파일 찾기 (index.json 제외)
  const files = fs
    .readdirSync(patchesDir)
    .filter((file) => file.endsWith(".json") && file !== "index.json")
    .sort(); // 파일명 순으로 정렬

  // index.json 업데이트
  fs.writeFileSync(indexPath, JSON.stringify(files, null, 2));

  console.log("✅ patches/index.json 업데이트 완료!");
  console.log("📁 발견된 패치 파일들:");
  files.forEach((file) => console.log(`   - ${file}`));
} catch (error) {
  console.error("❌ 에러:", error.message);
  process.exit(1);
}
