"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import JobCard from "./JobCard";
import { IJob } from "@/interface/Interfaces";
import { useSession } from "next-auth/react";

interface Board {
  id: string;
  title: string;
}

interface OrganizedJobs {
  [key: string]: IJob[];
}

export default function JobList() {
  const [jobs, setJobs] = useState<OrganizedJobs>({});

  const { data: sessionData } = useSession();

  const boards: Board[] = [
    { id: "wishlist", title: "WISHLIST" },
    { id: "applied", title: "APPLIED" },
    { id: "interview", title: "INTERVIEW" },
    { id: "offer", title: "OFFER" },
    { id: "rejected", title: "REJECTED" },
  ];

  const fetchJobs = async () => {
    try {
      const wishlist = await getJobsByStatusAndEmail("wishlist");
      const applied = await getJobsByStatusAndEmail("applied");
      const interview = await getJobsByStatusAndEmail("interview");
      const offer = await getJobsByStatusAndEmail("offer");
      const rejected = await getJobsByStatusAndEmail("rejected");

      setJobs({
        wishlist,
        applied,
        interview,
        offer,
        rejected,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setJobs({});
    }
  };

  const getJobsByStatusAndEmail = async (status: string): Promise<IJob[]> => {
    console.log(process.env.NEXTAUTH_URL);
    try {
      const res = await fetch(
        `/api/jobs?status=${status}&email=${sessionData?.user?.email}`,
        {
          cache: "no-store",
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: IJob[] = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${status} jobs:`, error);
      return [];
    }
  };

  const handleDrop = (result: any) => {
    if (!result.destination) return;

    const sourceBoard = result.source.droppableId;
    const destinationBoard = result.destination.droppableId;

    if (sourceBoard !== destinationBoard) {
      const updatedJobs = { ...jobs };
      const [movedJob] = updatedJobs[sourceBoard].splice(
        result.source.index,
        1
      );
      movedJob.status = destinationBoard;
      updatedJobs[destinationBoard].splice(
        result.destination.index,
        0,
        movedJob
      );
      setJobs(updatedJobs);

      const jobId = movedJob._id;
      let targetStatus = destinationBoard;

      console.log("jobId", jobId);
      console.log("targetStatus", targetStatus);

      updateJobStatus(jobId, targetStatus);
    }
  };

  const updateJobStatus = async (jobId: string, targetStatus: string) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: targetStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update job status");
      }

      const data = await res.json();
      console.log("Job status updated successfully:", data);
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <div className="w-full flex items-start justify-center pt-20 p-2.5">
        {boards.map((board) => (
          <Droppable key={board.id} droppableId={board.id}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`w-[280px] h-[calc(100vh_-_150px)] bg-[#c2c9cf] 
                mr-5 p-2.5 rounded-[5px] ${
                  snapshot.isDraggingOver ? "bg-green-100" : ""
                }`}
              >
                <div className="border-b-2 border-black pb-4">
                  <h2 className="text-lg m-0 font-bold">{board.title}</h2>
                  <span className="text-md">
                    {jobs[board.id]?.length || 0} Job/s
                  </span>
                </div>
                <div className="h-[85%] overflow-y-scroll p-2.5 no-scrollbar">
                  {jobs[board.id]?.map((job, index) => (
                    <JobCard data={job} index={index} key={index} />
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
