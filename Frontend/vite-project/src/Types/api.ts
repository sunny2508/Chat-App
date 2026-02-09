export interface ApiResponse<T>{
    success:boolean;
    message?:string;// global err/success message
    fieldErrors?:Record<string,string>; // fieldErrors
    data?:T // success only
};