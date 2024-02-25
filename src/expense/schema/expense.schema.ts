import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps: true})
export class Expense {
    @Prop()
    name: string;

    @Prop({index: true})
    cost: number;

    @Prop()
    product: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense)

