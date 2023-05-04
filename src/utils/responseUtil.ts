import { Response } from 'express';

// Passing message as type string to keep the response utility lightweight

export const sendResponse = (response: Response, message: string, statuscode: number): Response => {
    return response.status(statuscode).json(JSON.parse(message));
};

export const sendError = (response: Response, error: string, statuscode: number): Response => {
    return response.status(statuscode).json(error);
};

export const checkParams = (response: Response, ...args) => args.some(arg => arg === undefined) ? (response.status(400).json('Invalid params'), false) : true;