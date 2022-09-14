import { IStats } from './../types/index';
import { INote } from "../types";

export const addStatsForArchive = (arr: INote[], currentStats: IStats[]) => {
    if (!arr) {
        return currentStats;
    } else {
        const findItem = (category: string) =>
            currentStats.find((i) => i.category === category);

        arr.forEach((i) => {
            const item = findItem(i.category);
            if (item) {
                item.count.total++;
                item.count.archive++;
            }
        });
        return currentStats;
    }
};
