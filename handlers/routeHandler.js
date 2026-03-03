import { purchaseEvents } from "../events/purchaseEvents.js";
import { addPurchase } from "../utils/addPurchase.js";
import { buildString } from "../utils/buildString.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { sendResponse } from "../utils/sendResponse.js";
import path from "node:path";

export const handlePost = async (req, res) => {
  try {
    const parsedData = await parseJSONBody(req);
    const content = buildString(parsedData);
    await addPurchase(content);
    sendResponse(res, 201, "application/json", JSON.stringify(parsedData));
    const textPath = path.join("outputs", "purchases.txt");
    const outputPath = path.join("outputs", "purchases.pdf");
    purchaseEvents.emit('generate-pdf',textPath,outputPath)
  } catch (error) {
    sendResponse(res, 400, "application/json", JSON.stringify({ err: error }));
  }
};

export const handlePrice = (req,res) => {
    let goldPrice = 5000
    res.statusCode = 200

    res.setHeader('Content-Type','text/event-stream')
    res.setHeader('Cache-Control','no-cache')
    res.setHeader('Connection','keep-alive')

    setInterval(() => {
        const object = {
            event: 'price-update',
            price: Math.random() < 0.5 ? goldPrice++ : goldPrice--,
        }
        res.write(`data: ${JSON.stringify(object)}\n\n`)
    },3000)
}