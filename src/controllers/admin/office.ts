import { prismaClient } from "@/main";
import { createToken } from "@/middleware/authentication/token";
import { AdminLoginRequest } from "@/types/login";
import { group } from "console";
import { Request, Response } from "express";
import { date } from "zod";

export const AdminLoginHandler = async (req: Request, res: Response) => {
  const validBody = AdminLoginRequest.safeParse(req.body);

  if (validBody.success !== true) {
    return res.status(400).json({
      message: "Bad Request"
    });
  }

  try {
    const existingAdmin = await prismaClient.user.findFirst({
      where: {
        email: validBody.data.email,
        password: validBody.data.password,
      }
    });

    if (!existingAdmin) {
      return res.status(403).json({
        message: "Username or Password does not match!"
      });
    }

    const accessToken = await createToken(validBody.data.email);

    return res.status(200).json({
      message: "Login Successful",
      adminFirstName: existingAdmin.firstName,
      adminLastName: existingAdmin.lastName,
      adminEmail: existingAdmin.email,
      accessToken,
    });
  } catch (e) {
    // TODO: Setup logger for all internal server errors
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}

export const AdminDashboardHandler = async (req: Request, res: Response) => {
  try{
    const activeMembers_thisyear = await prismaClient.user.count({
      where: {
        createdAt : {gte : new Date(new Date().getFullYear(),0,1)}
      }
    });

    const activeMembers_alltime = await prismaClient.user.count()

    const activeMembers_lastyear = await prismaClient.user.count({
      where: {
        createdAt : {gte : new Date(new Date().getFullYear()-1,0,1), lt : new Date(new Date().getFullYear(),0,1)}
      }
    });

    const EventsCompleted_thisyear = await prismaClient.event.count({
      where:{
        endTime : {gte : new Date(new Date().getFullYear(),0,1), lte : new Date()}
      }
    });

    const EventsCompleted_alltime = await prismaClient.event.count({
      where:{
        endTime : {lte : new Date()}
      }
    });

    const EventsCompleted_lastyear = await prismaClient.event.count({
      where:{
        endTime : {gte : new Date(new Date().getFullYear()-1,0,1), lte : new Date(new Date().getFullYear(),0,1)}
      }
    });

    const registrations_thisyear = await prismaClient.registration.count({
      where:{
        createdAt : {gte : new Date(new Date().getFullYear(),0,1)}
      }
    });

    const events_thisyear = await prismaClient.event.count({
      where:{
        startTime : {gte : new Date(new Date().getFullYear(),0,1)}
      }
    });

    let avgregistrations_thisyear = registrations_thisyear/events_thisyear;

    if(isNaN(avgregistrations_thisyear)){
      avgregistrations_thisyear = 0;
    }

    const registrations_alltime = await prismaClient.registration.count();

    const events_alltime = await prismaClient.event.count();

    let avgregistrations_alltime = registrations_alltime/events_alltime;

    if(isNaN(avgregistrations_alltime)){
      avgregistrations_alltime = 0;
    }

    const registrations_lastyear = await prismaClient.registration.count({
      where:{
        createdAt : {gte : new Date(new Date().getFullYear()-1,0,1), lt : new Date(new Date().getFullYear(),0,1)}
      }
    });

    const events_lastyear = await prismaClient.event.count({
      where:{
        startTime : {gte : new Date(new Date().getFullYear()-1,0,1), lt : new Date(new Date().getFullYear(),0,1)}
      }
    });

    let avgregistrations_lastyear = registrations_lastyear/events_lastyear;

    if(isNaN(avgregistrations_lastyear)){
      avgregistrations_lastyear = 0;
    }

    const campaign_thisyear = await prismaClient.campaign.count({
      where:{
        createdAt : {gte : new Date(new Date().getFullYear(),0,1)}
      }
    })

    const campaign_alltime = await prismaClient.campaign.count();

    const campaign_lastyear = await prismaClient.campaign.count({
      where:{
        createdAt : {gte : new Date(new Date().getFullYear()-1,0,1), lt : new Date(new Date().getFullYear(),0,1)}
      }
    })

    const data = {
      ActiveMembers: {
        ThisYear: activeMembers_thisyear,
        AllTime: activeMembers_alltime,
        LastYear: activeMembers_lastyear
      },
      EventsCompleted: {
        ThisYear: EventsCompleted_thisyear,
        AllTime: EventsCompleted_alltime,
        LastYear: EventsCompleted_lastyear
      },
      AvgAttendeesPerEvent:{
        ThisYear: avgregistrations_thisyear.toFixed(3),
        AllTime: avgregistrations_alltime.toFixed(3),
        LastYear: avgregistrations_lastyear.toFixed(3)
      },
      campaigns:{
        ThisYear: campaign_thisyear,
        AllTime: campaign_alltime,
        LastYear: campaign_lastyear
      }
    }

    const registration = await prismaClient.event.findMany({
      select: {
        startTime: true,
        Registration:true
      }
    })

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const attandees_month = new Array(12).fill(0);

    registration.forEach((event)=>{
      if (event.startTime && event.startTime.getFullYear()==new Date().getFullYear() && event.Registration){
        attandees_month[new Date(event.startTime).getMonth()] += event.Registration.length;
      }
    });

    const charData = attandees_month.map((attendees: number, index: number) => ({
      month: month[index],attendees: attendees
    }));

    return res.status(200).json({
      data,
      charData
    });
  }


  catch (e) {
    return res.status(500).json({
      message: "Internal Server Error! Please try again later."
    });
  }
}