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
import useThemeStore from "./themes/theme";
import { getThemeClasses } from "./themes/themeClasses";

export default function DogBreedsTable() {
  const { breeds, loading, fetchBreeds } = useBreeds();
  const { theme, setTheme } = useThemeStore();

  const { bodyClass, tableClass, tableHeaderClass, rowClass } =
    getThemeClasses(theme);

  useEffect(() => {
    document.body.classList.remove("white", "black", "pink");
    document.body.classList.add(theme);

    switch (theme) {
      case "white":
        document.body.style.backgroundColor = "#ffffff";
        break;
      case "black":
        document.body.style.backgroundColor = "#000000";
        break;
      case "pink":
        document.body.style.backgroundColor = "#ffc0cb";
        break;
      default:
        document.body.style.backgroundColor = "";
    }
  }, [theme]);

  const validBreeds = Array.isArray(breeds) ? breeds : [];

  return (
    <div
      className={`p-4 min-h-screen flex flex-col items-center transition-all duration-300 w-[1000px] mx-auto rounded-xl ${bodyClass}`}
    >
      <div className="flex justify-between w-7/7 mb-6">
        <Button
          onClick={fetchBreeds}
          disabled={loading}
          className="px-4 py-2 rounded-sm shadow-md transition duration-300 bg-blue-500 text-white hover:bg-blue-600"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>

        <select
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
          className="px-4 py-2 rounded-md shadow-md transition duration-300 bg-gray-700 text-white hover:bg-gray-800"
        >
          <option value="white">Light Mode</option>
          <option value="black">Dark Mode</option>
          <option value="pink">Pink Mode</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : validBreeds.length === 0 ? (
        <p className="text-center">No breeds available</p>
      ) : (
        <div className="w-5/5 overflow-x-auto">
          <Table
            className={`w-full border border-gray-300 dark:border-gray-700 transition-all duration-300 rounded-xl ${tableClass}`}
          >
            <TableHeader>
              <TableRow
                className={`transition-all duration-300 ${tableHeaderClass}`}
              >
                <TableHead className="p-3 border border-gray-400 dark:border-gray-600 rounded-tl-lg">
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
                  Female Weight (kg)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validBreeds.map((breed) => (
                <TableRow
                  key={breed.id}
                  className={`transition-all duration-300 ${rowClass}`}
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
