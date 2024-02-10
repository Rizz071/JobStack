export interface JobItem {
  id: number;
  //   user_id: number;
  job_title: string;
  job_desc: string;
  date_of_apply: string;
  current_status_desc: string;
  active: boolean;
}

export interface Views {
  jobsListWindow: boolean;
  detailJobWindow: boolean;
}

export type NewJob = Omit<JobItem, "id">;
