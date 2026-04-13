import type { Category } from "../types/transaction.types";

const rules: { keywords: string[]; category: Category }[] = [
  {
    keywords: ["SALARY", "SAL CREDIT", "PAYROLL", "STIPEND"],
    category: "Salary",
  },
  {
    keywords: ["FREELANCE", "CONSULTANT", "INVOICE", "PAYMENT RECEIVED"],
    category: "Freelance",
  },
  {
    keywords: [
      "SWIGGY",
      "ZOMATO",
      "RESTAURANT",
      "HOTEL",
      "CAFE",
      "FOOD",
      "DOMINOS",
      "PIZZA",
      "BURGER",
      "DINING",
      "BIGBASKET",
      "BLINKIT",
      "GROFER",
      "GROCERY",
    ],
    category: "Food",
  },
  {
    keywords: [
      "UBER",
      "OLA",
      "RAPIDO",
      "METRO",
      "RAILWAY",
      "IRCTC",
      "PETROL",
      "FUEL",
      "DIESEL",
      "INDANE",
      "HP GAS",
      "AUTO",
      "TAXI",
      "BUS",
      "TRANSPORT",
    ],
    category: "Transport",
  },
  {
    keywords: [
      "AMAZON",
      "FLIPKART",
      "MYNTRA",
      "AJIO",
      "MEESHO",
      "NYKAA",
      "SNAPDEAL",
      "SHOPPING",
      "STORE",
      "MART",
    ],
    category: "Shopping",
  },
  {
    keywords: [
      "NETFLIX",
      "HOTSTAR",
      "PRIME",
      "SPOTIFY",
      "YOUTUBE",
      "BOOKMYSHOW",
      "MOVIE",
      "CINEMA",
      "ZEE5",
      "SONY LIV",
      "GAMING",
      "STEAM",
    ],
    category: "Entertainment",
  },
  {
    keywords: [
      "HOSPITAL",
      "CLINIC",
      "PHARMACY",
      "MEDICAL",
      "DOCTOR",
      "APOLLO",
      "FORTIS",
      "AIIMS",
      "HEALTH",
      "MEDICINE",
      "PRACTO",
      "1MG",
      "NETMEDS",
    ],
    category: "Health",
  },
  {
    keywords: [
      "RENT",
      "LANDLORD",
      "HOUSING",
      "MAINTENANCE",
      "ELECTRICITY",
      "BESCOM",
      "TATA POWER",
      "MSEB",
      "WATER BILL",
      "GAS BILL",
      "INTERNET",
      "AIRTEL",
      "BROADBAND",
      "JIO FIBER",
    ],
    category: "Housing",
  },
];

export const categorizeTransaction = (description: string): Category => {
  const upper = description.toUpperCase();
  for (const rule of rules) {
    if (rule.keywords.some((k) => upper.includes(k))) {
      return rule.category;
    }
  }
  return "Other";
};
