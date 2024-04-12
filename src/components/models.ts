export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Device {
  deviceCode: string;
  online: boolean;
  status: keyof typeof Status;
}

export enum Status {
  IDLE,
  PROCESSING,
}
