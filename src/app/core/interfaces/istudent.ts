export interface IStudent {
    ID: number;
    Name: string;
    Mobile: string;
    Email: string;
    NationalID: string;
    Age: number;
}

export interface ApiResponse {
    Data: IStudent[];
    Message: string;
    Success: boolean;
    IsAuthorized: boolean;
  }

  export interface IAddStudent {
    FirstName: string;
    LastName: string;
    Mobile: string;
    Email: string;
    NationalID: string;
    Age: number;
}

