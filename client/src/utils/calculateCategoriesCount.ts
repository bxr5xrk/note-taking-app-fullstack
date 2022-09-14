import { categories } from "../config";
import { INote } from "../types";

export const calculateCategoriesCount = (
    active: INote[],
    archive?: INote[]
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

    archive?.forEach((i) => {
        const item = findItem(i.category);
        if (item) {
            item.count.total++;
            item.count.archive++;
        }
    });

    return itemsCount.sort((a, b) => (b.count.total > a.count.total ? 1 : -1));
};
