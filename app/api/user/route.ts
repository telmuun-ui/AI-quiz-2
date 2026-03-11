import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {Webhook} from "svix"
import { Message } from "svix/dist/api/message";

type Event = {
  type: string;
  data: {
    id: string
    first_name: string
    last_name: string
    email_addresses: {email_address: string}[]
  }
}
export async function POST(req: NextRequest) {
  const webHookSecret = process.env.CLERK_WEBHOOK_KEY;

  if(!webHookSecret){
    return NextResponse.json({error: "missing webhook secret"}, {status: 400});
  
  }
  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if(!svixId || !svixTimestamp || !svixSignature){
    return NextResponse.json({error: "Missing Headers"}, {status: 400});
  }
  const webhook = new Webhook(webHookSecret) ;
  const body = await req.text();
  try {
    const event = webhook.verify(body,{
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as Event
if(event.type !== "user.created"){
   return NextResponse.json({error: " invalid event"}, {status: 400})

}

const {id, email_addresses, first_name, last_name} = event.data

await prisma.user.create({
  data: {
    email: email_addresses[0].email_address,
    name: `${first_name} ${last_name}`,
    clerkId: id,
  }
})
return NextResponse.json({message: "Success"}, {status: 201})
  } catch (error) {
    return NextResponse.json({error: " invalid signature"}, {status: 500})
  }
}

