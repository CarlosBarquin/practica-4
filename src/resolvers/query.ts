
import { ObjectId } from "mongo";
import { calculateObjectSize } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
import { __Directive } from "https://deno.land/x/graphql_deno@v15.0.0/mod.ts";
import { slotsCollection } from "../db/dbconnection.ts";

export const Query = {
    test : () => {
        return "fwafafwaa"
    },
    availableSlots : async (_:unknown, args: {day : number, year: number, month : number}) => {
        try {
            if(!args.year || !args.month){
                throw new Error("faltan datos")
            }

            if(args.day){
                const slots = await (await slotsCollection.find({ day: args.day,year: args.year,month: args.month, available : true}).toArray())
                .sort((a, b) => {
                    const adate = new Date(a.year,a.month,a.day,a.hour)
                    const bdate = new Date(b.year,b.month,b.day,b.hour)

                    return adate.getTime() - bdate.getTime()
                })

                const SLOTS = slots.map((found)=> ({
                    id : found._id.toString(),
                    day : found.day,
                    month:  found.month,
                    year : found.year,
                    hour: found.hour,
                    available: found.available,
                    dni : found.dni
                }))

                return SLOTS

            }else{
                
                const slots = await (await slotsCollection.find({year: args.year,month: args.month, available : true}).toArray())
                .sort((a, b) => {
                    const adate = new Date(a.year,a.month,a.day,a.hour)
                    const bdate = new Date(b.year,b.month,b.day,b.hour)

                    return adate.getTime() - bdate.getTime()
                })

                const SLOTS = slots.map((found)=> ({
                    id : found._id.toString(),
                    day : found.day,
                    month:  found.month,
                    year : found.year,
                    hour: found.hour,
                    available: found.available,
                    dni : found.dni
                }))

                return SLOTS
            }

        } catch (error) {
            throw new Error(error)
        }
    }
};