export interface UserObject {
    id: number;
    username: string;
    fullname: string;
    password: string;
}

export type LoginUserObject = Omit<UserObject, "fullname">;

export interface JobObject {
    job_title: string;
    job_desc: string;
    date_of_apply: Date;
    current_status_desc: string;
    active: boolean;
}

export interface StatusObject {
    position: number;
    status: string;
    status_desc: string;
    date: Date;
}
