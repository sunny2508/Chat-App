export interface AuthUser{
    _id:string;
    name:string;
    email:string;
    profilePic?:{
        url:string;
        publicId:string;
    }
}



