import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { GameGenre } from './game-genre.schema';
import { randomBytes } from 'crypto';
import slugify from 'slugify';
import { User } from 'src/user/schemas/user.schema';

@Schema({
    timestamps: true,
    versionKey: false,
    collection: 'games'
})
export class Game extends Document {
    @Prop({
        required: true,
        unique: true,
        trim: true
    })
    name: string;

    @Prop({
        unique: true,
        lowercase: true,
        index: true
    })
    slug: string;

    @Prop({
        trim: true,
        default: null,
        required: true
    })
    banner: string;

    @Prop({
        required: true,
        trim: true
    })
    description: string;

    @Prop({
        trim: true,
        required: true
    })
    website: string;

    @Prop({
        type: [Types.ObjectId],
        ref: GameGenre.name,
        required: true,
        index: true
    })
    genre: Types.ObjectId[];

    @Prop({
        type: [String],
        default: []
    })
    tags?: string[];

    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true,
        index: true
    })
    developer: Types.ObjectId;

    @Prop({
        unique: true,
        select: false
    })
    apiKey: string;

    @Prop({
        default: true
    })
    isActive: boolean;
}

export const GameSchema = SchemaFactory.createForClass(Game);

GameSchema.virtual('id').get(function (this: Game) {
    return (this._id as Types.ObjectId).toHexString();
});
GameSchema.set('toJSON', { virtuals: true });
GameSchema.set('toObject', { virtuals: true });

GameSchema.pre<Game>('save', async function (next) {
    const GameModel = this.constructor as Model<Game>;

    if (!this.slug && this.name) {
        let baseSlug = slugify(this.name, { lower: true, strict: true });
        let slug = baseSlug;
        let counter = 1;

        while (await GameModel.findOne({ slug })) {
            slug = `${baseSlug}-${counter++}`;
        }
        this.slug = slug;
    }

    if (!this.apiKey) {
        let key: string;
        let exists: boolean;
        do {
            const randomKey = randomBytes(16).toString('hex');
            key = `nexra_${randomKey}`;
            exists = !!(await GameModel.findOne({ apiKey: key }));
        } while (exists);
        this.apiKey = key;
    }

    next();
});
