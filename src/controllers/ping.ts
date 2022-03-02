import { RequestHandler } from "express";

type PingResponse = {
    message: string;
}

const pingController = (): PingResponse => {
    return { message: "pong" };
};

export const handlePing: RequestHandler = (_request, response) => {
    response.status(200).json(pingController());
};