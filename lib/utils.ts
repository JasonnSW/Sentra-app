import { expenseCategories, incomeCategories } from "@/features/home/data/home";
import { DateRangeCategory, DateRangeOption } from "@/features/home/types/home";

export const formatRupiah = (amount: number) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export const getDateRangeCategory = (
  option: DateRangeOption
): DateRangeCategory => {
  if (["today", "yesterday", "7days", "30days", "90days"].includes(option)) {
    return "day";
  }
  if (["thisWeek", "lastWeek"].includes(option)) {
    return "week";
  }
  if (["thisMonth", "lastMonth"].includes(option)) {
    return "month";
  }
  return "year";
};

export const calculateDateRange = (option: DateRangeOption) => {
  const today = new Date();
  let newStart = new Date(today);
  let newEnd = new Date(today);

  switch (option) {
    case "today":
      break;
    case "yesterday":
      newStart.setDate(today.getDate() - 1);
      newEnd.setDate(today.getDate() - 1);
      break;
    case "7days":
      newStart.setDate(today.getDate() - 6);
      break;
    case "30days":
      newStart.setDate(today.getDate() - 29);
      break;
    case "90days":
      newStart.setDate(today.getDate() - 89);
      break;

    case "thisWeek":
      newStart.setDate(today.getDate() - today.getDay());
      break;
    case "lastWeek":
      newStart.setDate(today.getDate() - today.getDay() - 7);
      newEnd.setDate(today.getDate() - today.getDay() - 1);
      break;

    case "thisMonth":
      newStart = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case "lastMonth":
      newStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      newEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      break;

    case "thisYear":
      newStart = new Date(today.getFullYear(), 0, 1);
      break;
    case "lastYear":
      newStart = new Date(today.getFullYear() - 1, 0, 1);
      newEnd = new Date(today.getFullYear() - 1, 11, 31);
      break;
  }

  return { newStart, newEnd };
};

export const calculateNextPeriod = (startDate: Date, endDate: Date) => {
  const diff = endDate.getTime() - startDate.getTime();
  return {
    nextStart: new Date(startDate.getTime() + diff + 1),
    nextEnd: new Date(endDate.getTime() + diff + 1),
  };
};

export const calculatePreviousPeriod = (startDate: Date, endDate: Date) => {
  const diff = endDate.getTime() - startDate.getTime();
  return {
    prevStart: new Date(startDate.getTime() - diff - 1),
    prevEnd: new Date(endDate.getTime() - diff - 1),
  };
};

export const formatDate = (
  date: Date,
  rangeType: DateRangeCategory | string
) => {
  const options: Intl.DateTimeFormatOptions = {};

  switch (rangeType) {
    case "day":
    case "week":
      options.day = "numeric";
      options.month = "short";
      options.year = "numeric";
      break;
    case "month":
      options.month = "long";
      options.year = "numeric";
      break;
    case "year":
      options.year = "numeric";
      break;
    default:
      options.day = "numeric";
      options.month = "short";
      options.year = "numeric";
  }

  return date.toLocaleDateString("id-ID", options);
};

export const formatTransactionDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
};

export function getCategoryIcon(categoryValue: string, type: string) {
  const categories =
    type === "expense" ? expenseCategories : incomeCategories;
  const category = categories.find((item) => item.value === categoryValue);
  return category?.icon || null;
}