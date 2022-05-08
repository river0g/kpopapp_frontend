export function getGroupsName() {
  return ["BLACKPINK", "aespa", "IVE", "(G)I-DLE", "NMIXX", "Kep1er"];
}

// jsonで取得したobjectのgroupと一致するもの。
// グループ別ページでリクエストを送るときなどに使う。
export function getTagGroupsName() {
  let groups = getGroupsName();
  return groups.map((group) => {
    if (group === "(G)I-DLE") {
      return "gi-dle";
    }
    return group.toLocaleLowerCase();
  });
}
