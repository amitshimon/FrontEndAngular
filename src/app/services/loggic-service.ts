import { IEntityToDb } from "../Models/entity-interface";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class LoggicService {

    newEntity: IEntityToDb;
    cleanAmount: boolean = false;
    cleanDescription: boolean = false;
    cleanName: boolean = false;
    isLengthBig: boolean = null;
    pageDisplay: number = null;
    convaertDateToTicks(formvalue): number {
        return ((new Date(formvalue.date).getTime() * 10000) + 621355968000000000);
    }
}
