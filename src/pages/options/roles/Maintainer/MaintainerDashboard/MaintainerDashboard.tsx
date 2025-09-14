import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { RankingBar } from "../../User/UserDashboard/UserDashboard";
import { Icon } from "@iconify/react";

const admin = {
  name: "Tony Reichert",
  organization: "Acme Corp",
  email: "maintain@test.org",
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

const adminStatistics = {
  "Detected entities": "1000",
  "Sanitized text": "1000",
  "Models usage": "1000",
  ranking: {
    "Detected entities": "10%",
    "Sanitized text": "50%",
    "Models usage": "1",
  },
};

export function MaintainerDashboard(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-2/5">
          <div className="flex h-full items-stretch mb-4">
            <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[600px]"
              shadow="sm"
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon
                    icon="mdi:account-wrench"
                    className="text-xl text-orange-600"
                  />
                  <h4 className="text-lg font-semibold">Maintainer Details</h4>
                </div>
              </CardHeader>
              <CardBody>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      icon="mdi:account-details"
                      className="text-sm text-gray-500"
                    />
                    <span className="text-medium font-medium">
                      Personal details
                    </span>
                  </div>
                  <div className="flex gap-6 md:gap-4 items-center">
                    {Object.entries(admin).map(([key, value]) => (
                      <div key={key} className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Icon
                            icon={
                              key === "name"
                                ? "mdi:account"
                                : key === "organization"
                                ? "mdi:domain"
                                : key === "email"
                                ? "mdi:email"
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
                </div>

                <div className="h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      icon="mdi:trophy"
                      className="text-sm text-yellow-500"
                    />
                    <span className="text-medium font-medium">
                      Platform ranking
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 calc h-[calc(100%-34px)]">
                    {Object.entries(adminStatistics.ranking).map(
                      ([key, value]) => (
                        <div key={value} className="h-[calc(100%-6px)]">
                          <p className="text-bold text-xs capitalize">{key}</p>
                          <div className="flex flex-col h-full gap-2 pt-2 px-5">
                            <RankingBar rank={value} />
                            <p className="text-tiny text-default-500">
                              {adminStatistics[key]}
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
        </div>
        <div className="w-3/5">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:chart-bar" className="text-xl text-blue-600" />
                <h4 className="text-lg font-semibold">Performance Analytics</h4>
              </div>
            </CardHeader>
            <CardBody>
              <Bar options={optionsBar} data={dataBar} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
