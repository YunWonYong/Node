import { GRADE, JOB } from "./Protocol";

export interface User {
    id: string,
    nickName: string,
    grade: GRADE,
    gmail: string,
    age: number,
    job: JOB
}