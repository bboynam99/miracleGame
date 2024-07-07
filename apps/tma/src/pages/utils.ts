// import { ResourceId, resourceList } from "@/store/store";

// export const isMineType = (str?: string): ResourceId | null =>
//   resourceList.includes(str as ResourceId) ? (str as ResourceId) : null;

const units = ["", "K", "M", "B", "T", "P", "E", "Z", "Y"];

export function abbreviateNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  let unitIndex = 0;

  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }

  return Math.floor(num * 10) / 10 + units[unitIndex];
}
