import React from "react";

const BoardgameModal = ({
  resizedBoardgame,
  resizeBoardgame,
}) => {

  return (
    <div className="fixed inset-0 flex bg-black bg-opacity-50 items-center justify-center z-50">
      <div className="w-2/3">
        <div
          key={resizedBoardgame.id}
          className=" flex rounded-md bg-[#1E203C] shadow-lg shadow-gray-950 border-2 border-gray-600"
          onClick={resizeBoardgame(resizedBoardgame.id)}
        >
          {resizedBoardgame.imageUrl && (
            <div className="w-1/2 aspect-square">
              <img
                src={resizedBoardgame.imageUrl}
                alt={resizedBoardgame.name}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="p-4  w-1/2">
            <h1 className="text-xl font-semibold mb-2">
              {resizedBoardgame.name}
            </h1>
            <p>
              {resizedBoardgame.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardgameModal;

// import React from "react";

// const BoardgameModal = ({
//   resizedBoardgame,
//   resizeBoardgame,
//   isOpen,
//   onClose,
//   children,
// }) => {
//   const modalStyles = isOpen
//     ? "fixed inset-0 flex items-center justify-center"
//     : "hidden";

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="w-1/3">
//         <div
//           key={resizedBoardgame.id}
//           className="border-2 border-gray-300 rounded-md"
//           onClick={resizeBoardgame(resizedBoardgame.id)}
//         >
//           {resizedBoardgame.imageUrl && (
//             <div className=" aspect-square">
//               <img
//                 src={resizedBoardgame.imageUrl}
//                 alt={resizedBoardgame.name}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           )}
//           <div className="p-4 bg-[#1E203C]">
//             <h1 className="text-xl font-semibold mb-2">
//               {resizedBoardgame.name}
//             </h1>
//             <p>Heeeyy</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardgameModal;
