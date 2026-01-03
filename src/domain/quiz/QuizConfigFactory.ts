import { QuizConfig } from "./QuizConfig.js";

export class QuizConfigFactory
{
    static createNew():QuizConfig
    {
        return new QuizConfig(
            0,
            0
        )
    }
}