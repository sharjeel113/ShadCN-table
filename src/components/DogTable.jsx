import { useEffect } from "react";
import { Button } from "./button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./table";
import { useBreeds } from "./api";
import useThemeStore from "./store";

export default function DogBreedsTable() {
  const { breeds, loading, fetchBreeds } = useBreeds();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const validBreeds = Array.isArray(breeds) ? breeds : [];

  return (
    <div
      className={`p-4 min-h-screen flex flex-col items-center transition-all duration-300 w-[1000px] mx-auto rounded-xl ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black "
      }`}
    >
      {/* Buttons */}
      <div className="flex justify-between w-7/7 mb-6">
        <Button
          onClick={fetchBreeds}
          disabled={loading}
          className="px-4 py-2 rounded-sm shadow-md transition duration-300 bg-blue-500 text-white hover:bg-blue-600"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
        <Button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-md shadow-md transition duration-300 bg-gray-700 text-white hover:bg-gray-800"
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : validBreeds.length === 0 ? (
        <p className="text-center">No breeds available</p>
      ) : (
        <div className="w-5/5 overflow-x-auto">
          <Table
            className={`w-full border border-gray-300 dark:border-gray-700 transition-all duration-300 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <TableHeader>
              <TableRow
                className={`transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <TableHead className="p-3 border border-gray-400 dark:border-gray-600 rounded-tl-lg">
                  {" "}
                  Name
                </TableHead>
                <TableHead className="p-3 w-10px border border-gray-400 dark:border-gray-600">
                  Description
                </TableHead>
                <TableHead className="p-3 border border-gray-400 dark:border-gray-600">
                  Hypoallergenic
                </TableHead>
                <TableHead className="p-3 border border-gray-400 dark:border-gray-600">
                  Life Span
                </TableHead>
                <TableHead className="p-3 border border-gray-400 dark:border-gray-600">
                  Male Weight (kg)
                </TableHead>
                <TableHead className="p-3 border border-gray-400 dark:border-gray-600 rounded-tr-lg">
                  {" "}
                  Female Weight (kg)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validBreeds.map((breed) => (
                <TableRow
                  key={breed.id}
                  className={`transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-200"
                      : "bg-white text-black"
                  }`}
                >
                  <TableCell className="p-3 border border-gray-300 dark:border-gray-700 break-words rounded-tl-lg">
                    {breed.attributes?.name || "Unknown Name"}
                  </TableCell>
                  <TableCell className="p-3 border border-gray-300 dark:border-gray-700 break-words whitespace-normal">
                    {breed.attributes?.description || "No Description"}
                  </TableCell>

                  <TableCell className="p-3 border border-gray-300 dark:border-gray-700">
                    {breed.attributes?.hypoallergenic ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="p-3 border border-gray-300 dark:border-gray-700">
                    {breed.attributes?.life?.min} -{" "}
                    {breed.attributes?.life?.max} years
                  </TableCell>
                  <TableCell className="p-3 border border-gray-300 dark:border-gray-700">
                    {breed.attributes?.male_weight?.min} -{" "}
                    {breed.attributes?.male_weight?.max} kg
                  </TableCell>
                  <TableCell className="p-3 border border-gray-300 dark:border-gray-700 rounded-tr-lg">
                    {breed.attributes?.female_weight?.min} -{" "}
                    {breed.attributes?.female_weight?.max} kg
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
