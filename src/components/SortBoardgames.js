import React, { useState, useEffect } from "react";
import { BsSortAlphaDown } from "react-icons/bs";
import { BsSortAlphaUp } from "react-icons/bs";

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
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  return (
    <div>
      <button className="block" onClick={handleSortSelection}>
        {sortOrder === "asc" ? (
          <BsSortAlphaDown className="w-6 h-6" />
        ) : (
          <BsSortAlphaUp className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
