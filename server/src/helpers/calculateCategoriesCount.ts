import { INote } from "../types";
import { categories } from "../config";

export const calculateCategoriesCount = (
    active: INote[],
) => {
    const itemsCount = [
        { category: categories[0], count: { total: 0, active: 0, archive: 0 } },
    ];

    const findItem = (category: string) =>
        itemsCount.find((i) => i.category === category);

    categories.map(
        (i) =>
            !findItem(i) &&
            itemsCount.push({
                category: i,
                count: { total: 0, active: 0, archive: 0 },
            })
    );

    active.forEach((i) => {
        const item = findItem(i.category);
        if (item) {
            item.count.total++;
            item.count.active++;
        }
    });

    return itemsCount.sort((a, b) => (b.count.total > a.count.total ? 1 : -1));
};
