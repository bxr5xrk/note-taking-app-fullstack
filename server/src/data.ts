import { INote } from "../types";

export const data: INote[] = [
    {
        id: 1663005562721,
        title: "one title",
        content: "one content one content 12.12.2022",
        slug: "one-title",
        category: "Idea",
        creationDate: "12/09/2022",
        parsedDates: ["12.12.2022"],
    },
    {
        id: 1663005562731,
        title: "two title",
        content: "two content two content",
        slug: "two-title",
        category: "Random Thought",
        creationDate: "11/09/2022",
        parsedDates: [],
    },
    {
        id: 1663063569335,
        title: "Create parsing dates func",
        content: "today 12.09.2022",
        creationDate: "13.09.2022",
        category: "Task",
        parsedDates: ["12.09.2022"],
        slug: "create-parsing-dates-func",
    },
    {
        id: 1663063599378,
        title: "Add styles",
        content: "for stats and new note page",
        creationDate: "13.09.2022",
        category: "Task",
        parsedDates: [],
        slug: "add-styles",
    },
    {
        id: 1663063632142,
        title: "Looooooooong title looooooooooong",
        content: "no content",
        creationDate: "13.09.2022",
        category: "Random Thought",
        parsedDates: [],
        slug: "looooooooong-title-looooooooooong",
    },
    {
        id: 1663063909998,
        title: "New note",
        content:
            "  white-space: nowrap;\\n  overflow: hidden;\\n  text-overflow: ellipsis;\\n}  white-space: nowrap;\\n  overflow: hidden;\\n  text-overflow: ellipsis;\\n}  white-space: nowrap;\\n  overflow: hidden;\\n  text-overflow: ellipsis;\\n}",
        creationDate: "13.09.2022",
        category: "Random Thought",
        parsedDates: [],
        slug: "new-note",
    },
    {
        id: 1663063946364,
        title: "Many dates",
        content:
            "12.12.2022\\n12/12/2022\\n13.25/2022\\n01/02/2022\\n03.04.2022",
        creationDate: "13.09.2022",
        category: "Idea",
        parsedDates: ["12.12.2022", "13.25/2022", "01.02.2022", "03.04.2022"],
        slug: "many-dates",
    },
];
