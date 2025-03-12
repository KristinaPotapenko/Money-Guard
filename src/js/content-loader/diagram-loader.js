import { getDiagramInformation } from "../api/diagram-api";
import { showModalQueue } from "../components/modal";
import { getLocalStorageItem } from "../local-storage-utils/local-storage-utils";
import { errorMessages } from "../messages/error-messages";

import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";

const container = document.querySelector(".diagram-container-js");
const currentUrl = "/" + window.location.pathname.split("/").pop();

if (container) {
  loadDiagramInformation();
}

async function loadDiagramInformation() {
  try {
    const cardNumber = getLocalStorageItem("card_number");
    let response;

    if (cardNumber && currentUrl !== "/dashboard.html") {
      response = await getDiagramInformation(cardNumber);
    } else {
      response = await getDiagramInformation();
    }

    if (!response.ok) {
      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](response);

        throw new Error(errorMessage);
      }
    }

    const statisticsDate = await response.json();

    currentUrl === "/card-information.html"
      ? renderDiagramStatistics(statisticsDate, true)
      : renderDiagramStatistics(statisticsDate);
  } catch (error) {
    const errorMessage = error.message;

    showModalQueue("An error occurred!", errorMessage);
  }
}

function generateColor(steps) {
  let colors = [];

  for (let i = 0; i < steps; i++) {
    let value = Math.floor((230 / (steps - 1)) * i);
    colors.push(`rgb(${value}, ${value}, ${value})`);
  }

  return colors;
}

function applyIndicatorColors(colors) {
  const styleElement = document.createElement("style");
  let style = "";

  colors.forEach((color, index) => {
    style += `
    .card-statistics__item:nth-child(${
      index + 1
    }) .card-statistics__legend-indicator::after {
      background-color: ${color};
    }\n
  `;
  });

  styleElement.innerHTML = style;
  document.head.appendChild(styleElement);
}

function applyDiagramColors(colors, partsElement, statisticsDate) {
  const colorDimension = 100 - statisticsDate.length;

  let sum = 0;

  const styleParts = statisticsDate.reduce((acc, statisticDate, index) => {
    const value = Math.round((statisticDate[1] * colorDimension) / 100);
    const start = sum;

    sum += value + (index > 0 ? 1 : 0);
    const end = sum - 1;

    acc.push(`${colors[index]} ${start}% ${end}%`);

    if (index < colors.length) {
      acc.push(`#ffffff ${end}% ${sum}%`);
    }

    return acc;
  }, []);

  partsElement.style.backgroundImage = `conic-gradient(${styleParts.join(
    ", "
  )})`;
}

function renderDiagramStatistics(statisticsDate, compact = false) {
  const sortedData = Object.entries(statisticsDate).sort((a, b) => a[1] - b[1]);

  const container = document.querySelector(".diagram-container-js");
  const statisticsBlock = document.createElement("div");
  statisticsBlock.classList.add(
    "card-information__statistics",
    "card-statistics"
  );

  const colors = generateColor(sortedData.length);
  applyIndicatorColors(colors);

  let topCategoryPercentage =
    sortedData.length > 0 ? sortedData[sortedData.length - 1][1] : 0;
  let topCategory =
    sortedData.length > 0
      ? sortedData[sortedData.length - 1][0]
      : "No transactions yet";

  statisticsBlock.innerHTML = `
     <h2 class="card-statistics__title">Your Spending Summary</h2>
                <div class="card-statistics__wrapper">
                  <div class="card-statistics__chart">
                    <div class="card-statistics__chart-parts parts"></div>
                    <div class="card-statistics__chart-text">
                      <span class="card-statistics__percentage">${topCategoryPercentage}%</span>
                      <span class="card-statistics__description"
                        >${topCategory}</span
                      >
                    </div>
                  </div>
                </div>
    `;

  const partsElement = statisticsBlock.querySelector(".parts");
  applyDiagramColors(colors, partsElement, sortedData);

  if (sortedData.length > 0) {
    statisticsBlock
      .querySelector(".card-statistics__wrapper")
      .append(createStatisticsLegend(sortedData));
  }

  container.append(statisticsBlock);

  const wrapperElement = statisticsBlock.querySelector(
    ".card-statistics__wrapper"
  );
  const statisticsLegendElement = statisticsBlock.querySelector(
    ".card-statistics__legend"
  );

  wrapperElement.classList.toggle("card-statistics__wrapper--compact", compact);

  if (statisticsLegendElement) {
    statisticsLegendElement.classList.toggle(
      "card-statistics__legend--compact",
      compact
    );
  }

  if (statisticsLegendElement) {
    new SimpleBar(statisticsLegendElement, {
      autoHide: false,
      direction: "rtl",
    });
  }
}

function createStatisticsLegend(sortedData) {
  const cardStatisticsLegend = document.createElement("div");
  cardStatisticsLegend.classList.add("card-statistics__legend");
  cardStatisticsLegend.setAttribute("data-simplebar", "");

  sortedData.forEach((diagramElement) => {
    const cardStatisticsItem = document.createElement("div");
    cardStatisticsItem.className = "card-statistics__item";
    cardStatisticsItem.innerHTML = `
            <span class="card-statistics__legend-indicator"></span>
                               <p class="card-statistics__legend-text">${diagramElement[0]}</p>
           `;

    cardStatisticsLegend.append(cardStatisticsItem);
  });

  return cardStatisticsLegend;
}
