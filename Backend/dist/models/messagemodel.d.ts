import mongoose, { Document, Types } from "mongoose";
export interface IMessage extends Document {
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    text?: string;
    image?: string;
}
declare const Message: mongoose.Model<IMessage, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IMessage, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IMessage, mongoose.Model<IMessage, any, any, any, mongoose.Document<unknown, any, IMessage, any, mongoose.DefaultSchemaOptions> & IMessage & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any, IMessage>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IMessage, mongoose.Document<unknown, {}, IMessage, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<Types.ObjectId, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    text?: mongoose.SchemaDefinitionProperty<string | undefined, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    senderId?: mongoose.SchemaDefinitionProperty<Types.ObjectId, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    receiverId?: mongoose.SchemaDefinitionProperty<Types.ObjectId, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    image?: mongoose.SchemaDefinitionProperty<string | undefined, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IMessage>, IMessage>;
export default Message;
//# sourceMappingURL=messagemodel.d.ts.map