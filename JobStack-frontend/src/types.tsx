export interface JobItem {
    id: number;
    //   user_id: number;
    job_title: string;
    job_desc: string;
    date_of_apply: string;
    current_status_desc: string;
    active: boolean;
}

// export type NewJob = Omit<JobItem, "id">;

export interface StatusObject {
    id: number;
    job_id: number;
    position: number;
    status: string;
    status_desc: string;
    date: Date;
}

// export type OneStatusObject = Omit<StatusObject, "id" | "job_id">;

export type NewStatusObject = Omit<StatusObject, "id" | "job_id">;

export type StatusFilter = "all" | "in_progress" | "rejected" | "offer";

export interface AlertsType {
    alerts: string[];
    setAlerts: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface UserObject {
    username: string;
    fullname: string;
    password: string;
}

export interface LoggedUser {
    id: number;
    username: string;
    fullname: string;
    token: string;
}

export type LoggingUser = Omit<UserObject, "fullname">;

export interface UsersType {
    user: LoggedUser | null;
    setUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
}
