import { connectMongoDb } from "@/lib/mongodb";
import Jobs from "@/models/JobModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: any) {
  const { id } = params;
  const { status } = await req.json();
  await connectMongoDb();
  console.log("this is status: ", status);
  console.log("this is id from params: ", id);
  const jobs = await Jobs.findByIdAndUpdate(id, { status: status });
  console.log(jobs);
  return NextResponse.json(jobs);
}

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;
  await connectMongoDb();
  const job = await Jobs.findOne({ _id: id });
  return NextResponse.json(job);
}
