import { EventEmitter } from "node:events";
import { generatePDF } from "../utils/generatePDF.js";

export const purchaseEvents = new EventEmitter;

purchaseEvents.on('generate-pdf',generatePDF)