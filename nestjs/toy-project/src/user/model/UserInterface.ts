import { GRADE, JOB } from "./Protocol";

interface UserInfo {
    nickName: string,
    grade: GRADE,
    email: string,
    age: number,
    job: JOB
}

interface User {
    id: string,
    info: UserInfo
}

export {
    User,
    UserInfo
}