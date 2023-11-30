import React from "react";

const BoardgameModal = ({
  resizedBoardgame,
  resizeBoardgame,
}) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-2/3">
        <div
          key={resizedBoardgame.id}
          className=" flex border-2 border-gray-300 rounded-md bg-[#1E203C]"
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a
              orci eget enim condimentum convallis sit amet ut mauris. Morbi a
              tincidunt urna. Phasellus eros eros, convallis non lectus ac,
              fringilla tempus ante. Nunc vestibulum ex sit amet sem sodales, ut
              iaculis leo laoreet. Pellentesque ut faucibus nisl, vel feugiat
              ligula. Mauris vitae quam gravida, venenatis eros quis, consequat
              urna. Pellentesque ullamcorper leo sit amet lacus molestie, dictum
              aliquam quam posuere. Integer non pulvinar ex. Nam et purus a
              turpis luctus lobortis. Sed pharetra odio vel ex porta, ut commodo
              eros volutpat. Proin non nisl in dolor dignissim posuere sed id
              risus.
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
