
import { ObjectId } from "mongo";
import * as bcrypt from "bcrypt";
import { Slots } from "../types.ts";
import { slotsCollection } from "../db/dbconnection.ts";
import { delay } from "https://deno.land/std@0.165.0/async/delay.ts";
import { SlotSchema } from "../db/schema.ts";

export const Mutation = {
    addSlot : async (_:unknown , args : {day : number, month: number, year : number , hour : number}) => {
        try {

            if(!args.day || !args.year || !args.hour || !args.month){
                throw new Error("faltan datos")
            }

            if(args.day > 23 || args.day < 1 ){
                throw new Error("dias mal")
            }
    
            if(args.month > 12 || args.month < 1 ){
                throw new Error("mes mal")
            }
    
            if(args.hour > 23 || args.month < 0 ){
                throw new Error("horas mal")
            }

            const found = await slotsCollection.findOne({day : args.day, year : args.year, month : args.month, hour: args.hour})

            if(found){
                if(found.available == true){
                    return {
                        id : found._id.toString(),
                        day : found.day,
                        month:  found.month,
                        year : found.year,
                        hour: found.hour,
                        available: found.available,
                        dni : found.dni
                    }
                }else{
                    throw new Error("no esta disponible")
                }
            }

            const Slot : SlotSchema= {
                _id : new ObjectId(),
                day : args.day,
                month : args.month,
                year : args.year,
                hour : args.hour,
                available : true,
                dni : ""
            }

            await slotsCollection.insertOne(Slot)
            
            return {
                id : Slot._id.toString(),
                day : Slot.day,
                month:  Slot.month,
                year : Slot.year,
                hour: Slot.hour,
                available: Slot.available,
                dni : Slot.dni
            }
        } catch (error) {
          throw new Error(error)
        }
    },
    removeSlot :  async (_:unknown , args : {day : number, month: number, year : number , hour : number}) => {
        try {
            if(!args.day || !args.year || !args.hour || !args.month){
                throw new Error("faltan datos")
            }

            const found = await slotsCollection.findOne({day : args.day, year : args.year, month : args.month, hour: args.hour})

            if(found){
                if(found.available === true){
                    await slotsCollection.deleteOne({day : args.day, year : args.year, month : args.month, hour: args.hour})
                    return {
                        id : found._id.toString(),
                        day : found.day,
                        month:  found.month,
                        year : found.year,
                        hour: found.hour,
                        available: found.available,
                        dni : found.dni
                    }
                }else{
                    throw new Error("no se puede eliminar")
                }
            }

            throw new Error("no existe")
            
        } catch (error) {
            throw new Error(error)
        }
    },
    bookSlot :  async (_:unknown , args : {day : number, month: number, year : number , hour : number, dni : string}) => {
        try {
            if(!args.day || !args.year || !args.hour || !args.month || !args.dni){
                throw new Error("faltan datos")
            }

            const found = await slotsCollection.findOne({day : args.day, year : args.year, month : args.month, hour: args.hour})

            if(found){
                if(found.available === true){
                    await slotsCollection.updateOne({_id : found._id} , {$set : {
                        available : false,
                        dni : args.dni
                    }})

                    return {
                        id : found._id.toString(),
                        day : found.day,
                        month:  found.month,
                        year : found.year,
                        hour: found.hour,
                        available: false,
                        dni : args.dni
                    }
                }else{
                    throw new Error("ya esta ocupada")
                }
            }

            throw new Error("no existe")
            
        } catch (error) {
            throw new Error(error)
        }
    }
}
