import React, { useState, useEffect } from "react";

export default function SortBoardgames({
  boardgamesList,
  setSortedBoardgamesList,
}) {
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const sortedBoardgamesList = [...boardgamesList].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedBoardgamesList(sortedBoardgamesList);
  }, [sortOrder, boardgamesList]);

    const handleSortSelection = () => {
        const sortedBoardgamesList = [...boardgamesList].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        setSortedBoardgamesList(sortedBoardgamesList);
    };

  return (
    <div>
      {/* <button onClick={() => setSortOrder("asc")}>Sorteer oplopend</button>
      <button onClick={() => setSortOrder("desc")}>Sorteer aflopend</button> */}
      <select
        value={sortOrder}
        onChange={(e) => {
            setSortOrder(e.target.value);
            handleSortSelection();
        }}
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
}
