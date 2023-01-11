import { Response } from 'express';
import { sendError } from "./responseUtil";
export const processToken = (response: Response, inputToken: string): string => {
    if (!inputToken) {
        sendError(response, 'Invalid Token', 400);
    }
    return inputToken.substring(7, inputToken.length);
};

export const jsonToString = (str: any): string => {
    return JSON.stringify(str);
};