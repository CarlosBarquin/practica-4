import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
import { Slots } from "../types.ts";

export type SlotSchema = Slots & {_id : ObjectId}