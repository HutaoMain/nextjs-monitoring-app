import { connectMongoDb } from "@/lib/mongodb";
import Jobs from "@/models/JobModel";
import { NextRequest, NextResponse } from "next/server";

// POST METHOD
export async function POST(req: NextRequest) {
  const { email, jobName, companyName, jobDescription, askingSalary, status } =
    await req.json();
  await connectMongoDb();
  await Jobs.create({
    email,
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
    const email = req.nextUrl.searchParams.get("email");

    console.log("status: ", status);
    console.log("email: ", email);

    if (!status || !email) {
      return NextResponse.json(
        { message: "Invalid request parameters" },
        { status: 400 }
      );
    }

    await connectMongoDb();
    const jobs = await Jobs.find({ status, email });
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
