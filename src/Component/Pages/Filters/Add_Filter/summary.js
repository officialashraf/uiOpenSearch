// import React from 'react';
// import Component1 from './Summary/cardlList';

// const Summary = () => {
//   return (
//     <div>
//       <Component1/>
//     </div>
//   );
// };

//export default Summary;

import React from "react";
import PreHeader from "./Summary/preheader.js";
//import CardRow from "./Summary/cardRow.js";
import ProgressRow from "./Summary/progressBar.js";
import ChartsRow from "./Summary/chartsRow.js";
//import CardList from "../../Home/cards.js";
import Component1 from "./Summary/cardlList.js";

const Summary = () => {
  // const cards = [
  //   { title: "Card 1", content: "This is card 1 content." },
  //   { title: "Card 2", content: "This is card 2 content." },
  //   { title: "Card 3", content: "This is card 3 content." },
  // ];

  const pieData = {
    labels: ["Instagram", "LinkdIn", "Snapchat"],
    datasets: [
      {
        data: [500, 1000, 1800],
        backgroundColor: ["balck", "white", "gray"],
      },
    ],
  };

  const barData = {
    labels: ["Instagram", "LinkdIn", "Snapchat"],
    datasets: [
      {
        label: "Monthly Data",
        data: [500, 1000, 1800],
        backgroundColor: ["black", "white", "gray"],
      },
    ],
  };

  const tableData1 = {
    headers: ["FileName", "Oganization", "Location"],
    rows: [
      ["RameshBlast", "Sansgel", "New York"],
      ["Vindhastole", "Nikotech", "London"],
      ["Darmurder", "Lumen", "Sydney"],
    ],
  };

  return (
    <div className="container">
      <PreHeader
        count={5}
        size={"Medium"}
        totalUploads={100}
        totalApproved={85}
        totalUnderProcessing={25}
        totalUnsupported={0}
        totalDiscard={0}
        
      />
      {/* <CardRow cards={cards} /> */}
      <Component1 />
      <ProgressRow now={60} label="Overall Progress" />
      <ChartsRow pieData={pieData} barData={barData} tableData={tableData1} />
    </div>
  );
};

export default Summary;
