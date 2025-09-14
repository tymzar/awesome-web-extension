import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Icon } from "@iconify/react";

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const dataLine = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const dataBar = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Sanitized text over time",
    },
  },
};

export const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Detected entities over time",
    },
  },
};

const user = {
  name: "John Doe",
  email: "test@gmail.com",
  organization: "Acme Corp",
  percentile: "90%",
};

const userStatistics = {
  "Detected entities": "1000",
  "Sanitized text": "1000",
  "Models usage": "1000",
  ranking: {
    "Detected entities": "10%",
    "Sanitized text": "50%",
    "Models usage": "1",
  },
};

type RankingBarProps = {
  rank: string;
  amount?: string;
  label?: string;
};

function colorMapping(rank: string): string {
  // if rank is a number, 1 gold, 2 silver, 3 bronze, 4-10 green
  // if rank is a percentage, 1-10 green
  // if rank is a percentage, 11-40 yellow
  // if rank is a percentage, 41-100 red
  // return hex color

  if (rank.includes("%")) {
    const rankNumber = parseFloat(rank.replace("%", ""));

    if (rankNumber <= 10) {
      return "green";
    } else if (rankNumber <= 40) {
      return "yellow";
    } else {
      return "red";
    }
  }

  switch (rank) {
    case "1":
      return "gold";
    case "2":
      return "silver";
    case "3":
      return "bronze";
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "10":
      return "green";
    default:
      return "red";
  }
}

// TODO: add animation and prettify the component
export const RankingBar = styled.div<RankingBarProps>`
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 0.5rem;

  &::after {
    content: "${({ rank }) => rank}";
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-color: ${({ rank }) => colorMapping(rank)};
    height: calc(
      100% -
        ${({ rank }) =>
          rank ? (rank.includes("%") ? rank : `${rank}px`) : "100%"}
    );
    width: 100%;
    border-radius: 0.25rem 0.25rem 0.05rem 0.05rem;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${({ rank }) => colorMapping(rank)};
    height: 100%;
    width: 100%;
    opacity: 0.2;
    border-radius: 0.25rem;
  }
`;

export function UserDashboard(): JSX.Element {
  return (
    <div className="flex flex-col">
      <div className="flex h-full items-end mb-4">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[600px]"
          shadow="sm"
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:account-circle"
                className="text-xl text-blue-600"
              />
              <h4 className="text-lg font-semibold">User Information</h4>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex gap-6 md:gap-4 items-center justify-center">
              {Object.entries(user).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon={
                        key === "name"
                          ? "mdi:account"
                          : key === "email"
                          ? "mdi:email"
                          : key === "organization"
                          ? "mdi:domain"
                          : key === "percentile"
                          ? "mdi:chart-line"
                          : "mdi:information"
                      }
                      className="text-sm text-gray-500"
                    />
                    <p className="text-bold text-sm capitalize">{key}</p>
                  </div>
                  <p className="text-tiny text-default-400">{value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="mdi:chart-bar" className="text-xl text-green-600" />
        <h3 className="text-xl font-semibold">Statistics</h3>
      </div>
      <div className="flex my-4 items-stretch gap-4">
        <div className="flex w-1/2">
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 w-full h-full"
            shadow="sm"
          >
            <CardBody>
              <div className="h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="mdi:trophy" className="text-lg text-yellow-600" />
                  <span className="text-lg font-black relative">
                    Organization ranking
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 calc h-[calc(100%-34px)]">
                  {Object.entries(userStatistics.ranking).map(
                    ([key, value]) => (
                      <div key={value} className="h-[calc(100%-6px)]">
                        <p className="text-bold text-xs capitalize">{key}</p>
                        <div className="flex flex-col h-full gap-2 pt-2 px-5">
                          <RankingBar rank={value} />
                          <p className="text-tiny text-default-500">
                            {userStatistics[key]}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className=" flex w-1/2">
          <div className="w-1/2">
            <Doughnut
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: "Detected entities",
                  },
                },
              }}
              data={data}
            />
          </div>
          <div className="w-1/2">
            <Doughnut
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: "Models usage",
                  },
                },
              }}
              data={data}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Line options={optionsLine} data={dataLine} />
        </div>
        <div className="w-1/2">
          <Bar options={optionsBar} data={dataBar} />
        </div>
      </div>
    </div>
  );
}
