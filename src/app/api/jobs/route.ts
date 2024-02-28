import { authConfig } from "@/lib/auth";
import { connectMongoDb } from "@/lib/mongodb";
import Jobs from "@/models/JobModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// POST METHOD
// /api/job
export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);

  const { jobName, companyName, jobDescription, askingSalary, status } =
    await req.json();
  await connectMongoDb();
  await Jobs.create({
    email: session?.user?.email,
    jobName,
    companyName,
    jobDescription,
    askingSalary,
    status,
  });
  return NextResponse.json({ message: "New Job created!" }, { status: 201 });
}

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get("status");
    const session = await getServerSession(authConfig);

    console.log("status: ", status);
    console.log("email: ", session?.user?.email);

    if (!status || !session?.user?.email) {
      return NextResponse.json(
        { message: "Invalid request parameters" },
        { status: 400 }
      );
    }

    await connectMongoDb();
    const jobs = await Jobs.find({ status, email: session?.user?.email });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// DELETE METHOD
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDb();
  await Jobs.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Job has been deleted" },
    { status: 200 }
  );
}
