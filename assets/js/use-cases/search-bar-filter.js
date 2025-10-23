export async function searchBarFilter(loadFunction) {
  if (typeof loadFunction !== "function") {
    throw new Error("loadFunction must be a function");
  }

  const searchValue = document.getElementById("searchBar")?.value?.trim() || "";
  
  // If loadFunction is async, await it
  return await loadFunction(searchValue);
}

window.searchBarFilter = searchBarFilter;