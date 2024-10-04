import { prismaClient } from "@/main";
import { Request, Response } from "express";


export const GetAllEventsHandler = async (_: Request, res: Response) => {
  try {
    const events = await prismaClient.event.findMany({
      select: {
        id: true,
        name: true,
        venue: true,
        entry: true,
        startTime: true,
        status: true
      }
    });
    return res.status(200).json({
      events
    });
  }
  catch (e) {
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }

}

export const GetDraftEventsHandler = async (_: Request, res: Response) => {
  try {
    const events = await prismaClient.event.findMany({
      where: {
        status: "Draft"
      },
      select: {
        id: true,
        name: true,
        venue: true,
        entry: true,
        startTime: true,
        status: true
      }
    });
    return res.status(200).json({
      events
    });
  }
  catch (e) {
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}

export const handleGetReleasedEvents = async (_: Request, res: Response) => {
  try {
    const events = await prismaClient.event.findMany({
      where: {
        status: "Published"
      },
      select: {
        id: true,
        name: true,
        venue: true,
        entry: true,
        startTime: true,
        status: true
      }
    });
    return res.status(200).json({
      events
    });
  }
  catch (e) {
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}

export const GetEventByIdHandler = async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  try {
    const event = await prismaClient.event.findFirst({
      where: {
        id: eventId
      }
    });
    if (!event) {
      return res.status(404).json({
        message: "Event not found!"
      });
    }
    return res.status(200).json({
      event
    });
  }
  catch (e) {
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}
