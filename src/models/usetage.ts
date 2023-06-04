import { Schema, model, models } from "mongoose";

const usetageSchema = new Schema({
    currentData: {
        total: Number,
        day: Number,
        month: Number
    },
    oldData: {
        day: Number,
        month: Number
    }
})

const Usetage = models.data || model("data", usetageSchema)

export default Usetage;