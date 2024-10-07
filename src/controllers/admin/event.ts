import { prismaClient } from "@/main";
import { Request, Response } from "express";
import { EventValidator,EventEditValidator } from "@/types/auth";


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

export const CreateEventHandler = async (req: Request, res: Response) => {

  const validevent = EventValidator.safeParse(req.body);

  if(!validevent.success){
    console.log(validevent.error);
    return res.status(400).json({
      message: "Invalid Event data provided!"
    });
  }

  const {name,startTime,endTime,guests,venue,posterUrl,recordingURL,tags,status,entry,mode,eventFee} = req.body;

  try {
    const event = await prismaClient.$transaction(async(tx)=>{
      const createdEvent=await tx.event.create({
      data: {
        name:name,
        startTime:startTime,
        endTime:endTime,
        guests:guests,
        venue:venue,
        posterURL:posterUrl,
        recordingURL:recordingURL,
        tags:tags,
        status:status,
        entry:entry,
        mode:mode,
        eventFee:eventFee,
      },
    });
    return createdEvent;
  });

    return res.status(200).json({
      event
    });
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}

export const EditEventHandler =async (req : Request, res : Response) => {
  const id = req.params.eventId;

  const event = await prismaClient.event.findFirst({
    where : {
      id : id
    }
  })
  if(!event){
    return res.status(404).json({
      message : "Event not found!"
    })
  }

  const validevent = EventEditValidator.safeParse(req.body);
  if(!validevent.success){
    console.log(validevent.error);
    return res.status(400).json({
      message: "Invalid Event data provided!"
    });
  }

  const {name,startTime,endTime,guests,venue,posterUrl,recordingURL,tags,status,entry,mode,eventFee} = req.body;

  try {
    const event = await prismaClient.$transaction(async(tx)=>{
      const updatedEvent=await tx.event.update({
      where : {
        id : id
      },
      data: {
        name:name,
        startTime:startTime,
        endTime:endTime,
        guests:guests,
        venue:venue,
        posterURL:posterUrl,
        recordingURL:recordingURL,
        tags:tags,
        status:status,
        entry:entry,
        mode:mode,
        eventFee:eventFee,
      },
    });
    return updatedEvent;
  });

    return res.status(200).json({
      event
    });
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}