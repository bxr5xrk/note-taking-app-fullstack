import { Controller, Get } from "@nestjs/common";

@Controller("/api")
export class AppController {
    @Get("/notes")
    getNotes() {
        return [
            { id: 1, title: "title1" },
            { id: 2, title: "title2" },
        ];
    }
}
