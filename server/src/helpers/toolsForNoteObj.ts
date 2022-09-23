export const createTitleAndSlug = (title: string) => {
    const prettifyTitle = title.replace(/[^\w ]/g, "");
    const slug = prettifyTitle.toLowerCase().split(" ").join("-");
    const newTitle =
        prettifyTitle.at(0)?.toUpperCase() + prettifyTitle.slice(1);
    return { slug, newTitle };
};

export const parseDates = (string: string) => {
    const re = /(\d{1,2}[/.]){2}\d{4}/g;

    const parsedDates: string[] = [];

    const prettify = (word: string, type: "." | "/") => {
        let result = "";
        const arr = word.split(type);
        arr.map((i) =>
            i.length === 1 ? (result += "0" + i + ".") : (result += i + ".")
        );

        return result.slice(0, -1);
    };

    string.match(re)?.forEach((i) => {
        if (i.includes(".") && i.length === 9) {
            parsedDates.push(i);
        } else if (i.includes(".")) {
            parsedDates.push(prettify(i, "."));
        } else if (i.includes("/")) {
            parsedDates.push(prettify(i, "/"));
        }
    });

    return parsedDates.filter((x, i, a) => a.indexOf(x) === i);
};