export function getThemeClasses(theme) {
  switch (theme) {
    case "black":
      return {
        bodyClass: "bg-gray-900 text-white",
        tableClass: "bg-gray-800 text-gray-200",
        tableHeaderClass: "bg-gray-700 text-white",
        rowClass: "bg-gray-800 text-white-200",
      };
    case "pink":
      return {
        bodyClass: "bg-pink-300 text-black",
        tableClass: "bg-pink-200 text-black",
        tableHeaderClass: "bg-pink-400 text-black",
        rowClass: "bg-pink-200 text-black",
      };
    default:
      return {
        bodyClass: "bg-white text-black",
        tableClass: "bg-gray-100 text-gray-900",
        tableHeaderClass: "bg-gray-300 text-black",
        rowClass: "bg-white text-black",
      };
  }
}
