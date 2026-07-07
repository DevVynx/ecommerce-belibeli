import { orderRepositories } from "@/modules/order/repositories";

function getPeriods(range: string) {
  const now = new Date();
  const DAY = 24 * 60 * 60 * 1000;

  switch (range) {
    case "1W":
      return {
        current: { start: new Date(now.getTime() - 7 * DAY), end: now },
        previous: {
          start: new Date(now.getTime() - 14 * DAY),
          end: new Date(now.getTime() - 7 * DAY),
        },
      };
    case "1M":
      return {
        current: { start: new Date(now.getTime() - 30 * DAY), end: now },
        previous: {
          start: new Date(now.getTime() - 60 * DAY),
          end: new Date(now.getTime() - 30 * DAY),
        },
      };
    case "3M":
      return {
        current: { start: new Date(now.getTime() - 90 * DAY), end: now },
        previous: {
          start: new Date(now.getTime() - 180 * DAY),
          end: new Date(now.getTime() - 90 * DAY),
        },
      };
    case "6M":
      return {
        current: { start: new Date(now.getTime() - 180 * DAY), end: now },
        previous: {
          start: new Date(now.getTime() - 360 * DAY),
          end: new Date(now.getTime() - 180 * DAY),
        },
      };
    case "1Y":
      return {
        current: { start: new Date(now.getTime() - 365 * DAY), end: now },
        previous: {
          start: new Date(now.getTime() - 730 * DAY),
          end: new Date(now.getTime() - 365 * DAY),
        },
      };
    default:
      return { current: null, previous: null };
  }
}

export const countActiveOrders = async (range: string) => {
  const { current, previous } = getPeriods(range);

  const activeOrders = await orderRepositories.countActiveOrders(current);
  const previousOrders = previous ? await orderRepositories.countActiveOrders(previous) : 0;

  const percentageDelta =
    previousOrders === 0
      ? 100
      : Math.round(((activeOrders - previousOrders) / previousOrders) * 10000) / 100;

  return { activeOrders, percentageDelta };
};
