export interface SurveyAnswer {
    name: string;
    age: number;
    preferences: {
        sports: boolean;
        books: boolean;
        travel: boolean;
    }
}