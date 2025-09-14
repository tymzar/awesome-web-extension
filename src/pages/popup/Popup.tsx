import React, { useEffect, useState } from "react";
import type { PostColorsMessage } from "../content/modules/middleware/middleware.types";
import { MESSAGE_TYPES } from "../content/modules/middleware/middleware.types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";

export function Popup(): JSX.Element {
  const [elementsLimit, setElementsLimit] = useState(1);
  const [elements, setElements] = useState<Array<string>>([]);

  useEffect(() => {
    chrome.storage.sync.get(["maxLength", "elements"], function (result) {
      setElementsLimit(result.maxLength ?? 1);
      setElements(result.elements ?? []);
    });

    // Listen for storage changes
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      console.log("Popup: Storage change detected:", changes);

      // Handle elements changes
      if (changes.elements) {
        console.log("Popup: Elements changed to:", changes.elements.newValue);
        setElements(changes.elements.newValue ?? []);
      }

      // Handle maxLength changes
      if (changes.maxLength) {
        console.log(
          "Popup: Max length changed to:",
          changes.maxLength.newValue
        );
        setElementsLimit(changes.maxLength.newValue ?? 1);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    console.log("Popup: Storage listener added");

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
      console.log("Popup: Storage listener removed");
    };
  }, []);

  const addElement = () => {
    if (elements.length >= elementsLimit) {
      console.log("Element limit reached");
      return;
    }

    const newElement = `Element ${elements.length + 1}`;
    const newElements = [...elements, newElement];

    chrome.storage.sync.set({ elements: newElements }, function () {
      setElements(newElements);
      console.log("Element added successfully");
    });
  };

  const clearElements = () => {
    chrome.storage.sync.set({ elements: [] }, function () {
      setElements([]);
      console.log("Elements cleared");
    });
  };

  return (
    <div className="h-full p-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <Card className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:extension"
              className="text-2xl text-blue-600 dark:text-blue-400"
            />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Extension Popup
            </h3>
          </div>
          <Button
            isIconOnly
            color="primary"
            variant="light"
            aria-label="Settings"
            onPress={() => {
              chrome.runtime.openOptionsPage();
            }}
          >
            <Icon icon="mdi:cog" className="text-lg" />
          </Button>
        </CardHeader>

        <Divider className="bg-gray-200 dark:bg-gray-700" />

        <CardBody>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Icon
                icon="mdi:information-outline"
                className="text-blue-500 dark:text-blue-400"
              />
              <span>
                Currently can hold up to{" "}
                <strong className="text-gray-800 dark:text-white">
                  {elementsLimit}
                </strong>{" "}
                elements
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Icon
                icon="mdi:database-outline"
                className="text-green-500 dark:text-green-400"
              />
              <span>
                Stored elements:{" "}
                <strong className="text-gray-800 dark:text-white">
                  {elements.length}
                </strong>
              </span>
            </div>

            {/* Elements List */}
            {elements.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stored Elements:
                </div>
                <div className="flex flex-wrap gap-2">
                  {elements.map((element, index) => (
                    <Chip key={index} variant="flat" color="primary" size="sm">
                      {element}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                color="primary"
                variant="flat"
                className="flex-1"
                startContent={<Icon icon="mdi:plus" />}
                onPress={addElement}
                isDisabled={elements.length >= elementsLimit}
              >
                Add Element
              </Button>
              {elements.length > 0 && (
                <Button
                  color="danger"
                  variant="flat"
                  size="sm"
                  startContent={<Icon icon="mdi:delete" />}
                  onPress={clearElements}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
