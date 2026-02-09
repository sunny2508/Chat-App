import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    profilePic: {
        url: string;
        publicId: string;
    };
    refreshToken: string;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}
declare const User: mongoose.Model<IUser, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IUser, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, mongoose.Document<unknown, any, IUser, any, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IUser>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, IUser, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    profilePic?: mongoose.SchemaDefinitionProperty<{
        url: string;
        publicId: string;
    }, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    refreshToken?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isPasswordCorrect?: mongoose.SchemaDefinitionProperty<(password: string) => Promise<boolean>, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    generateAccessToken?: mongoose.SchemaDefinitionProperty<() => string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    generateRefreshToken?: mongoose.SchemaDefinitionProperty<() => string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IUser & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IUser>, IUser>;
export default User;
//# sourceMappingURL=usermodel.d.ts.map