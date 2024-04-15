import Joi from "joi";
import * as xxhash from 'xxhash-addon';
import { ObtainDocumentType, ResolveSchemaOptions, ResolveTimestamps, Schema } from "mongoose";

export namespace JoiExtensions {
    export const MongoDbObjectId = Joi.string().hex().length(24);

    export function EntityDocumentSchema<
        A,B,C,D,E,F,G,
        H extends ResolveTimestamps<ObtainDocumentType<H, A, ResolveSchemaOptions<G>>, ResolveSchemaOptions<G>>,
        I extends ResolveTimestamps<ObtainDocumentType<H, A, ResolveSchemaOptions<G>>, ResolveSchemaOptions<G>>>
    (idPropertyName: string, schema: Schema<A,B,C,D,E,F,G,H,I>): Schema<A,B,C,D,E,F,G,H,I> {
        schema.virtual(idPropertyName).get(function () {
            return this._id;
        });

        schema.set('toJSON', { virtuals: true });
        schema.set('toObject', { virtuals: true });

        return schema;
    }
}

const hasher = new xxhash.XXHash64(Buffer.from('3.141516'));
export namespace HashExtensions {
    export function BigIntHash(entries: string[]): bigint {
        const data = entries.join('.');
        hasher.update(Buffer.from(data));
        const profileEntryHash = hasher.digest().readBigInt64BE();
    
        return profileEntryHash;
    }
}