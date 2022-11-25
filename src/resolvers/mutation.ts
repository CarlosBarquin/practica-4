import { ObjectId } from "mongo";
import { slotCollection } from "../db/dbconnection.ts";
import { Slot } from "../types.ts";

export const Mutation = {
    addSlot: async (
        _: unknown,
        args: { day : number , month: number, year: number, hour: number}
      ): Promise<Slot> => {
        try {
            if(args.day < 1 || args.day > 31 || args.month < 1 || args.month > 12 || args.hour < 0 || args.hour > 23){
                throw new Error("Invalid date");
            }
            const found:Slot = await slotCollection.findOne({
                day: args.day,
                month: args.month,
                year: args.year,
                hour: args.hour,

            })
            if(found.available == false){
                throw new Error("Slot already exists");
            }else{
                return found;
            }

            if(!found){
                const insertedId = await slotCollection.insertOne({
                    day: args.day,
                    month: args.month,
                    year: args.year,
                    hour: args.hour,
                    available: true,
                });
                return insertedId
            }
            
         
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      },
      removeSlot: async (
        _: unknown,
        args: { day : number , month: number, year: number, hour: number}
      ): Promise<Slot> => {
        try {
            const found:Slot = await slotCollection.findOne({
                day: args.day,
                month: args.month,
                year: args.year,
                hour: args.hour,
            })

            if(found.available == false){
                throw new Error("Slot not found");
            }else{
                const deletedId :Slot = await slotCollection.deleteOne({
                    day: args.day,
                    month: args.month,
                    year: args.year,
                    hour: args.hour,

                
                    
            })
            return deletedId;
            }
            return found;
         
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      },
};

