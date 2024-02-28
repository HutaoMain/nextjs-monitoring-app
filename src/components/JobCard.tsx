"use client";

import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IJob } from "@/interface/Interfaces";
import moment from "moment";
import { Business } from "@mui/icons-material";
import { Dialog, DialogContent } from "@mui/material";
import ViewJob from "./ViewJob";

interface Props {
  data: IJob;
  index: number;
}

export default function JobCard({ data, index }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Draggable index={index} draggableId={data._id.toString()}>
        {(provided) => (
          <div
            onClick={() => setIsModalOpen(true)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="border-[#e7717d] bg-[#f4f5f7] shadow-[0_2px_4px_rgba(0,0,0,0.1)] 
          transition-shadow duration-[0.3s] ease-[ease-in-out] cursor-move 
          flex justify-center flex-col gap-1
          mt-2.5 pl-2.5 pt-2.5 rounded-[5px] border-2 border-solid 
          hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
          >
            <h4 className="text-sm m-0 font-[700]">{data.jobName}</h4>
            <div className="flex items-center gap-[5px]">
              <Business />
              <span className="text-sm">{data.companyName}</span>
            </div>
            <span className="text-[12px]">
              {moment(data.createdAt).fromNow()}
            </span>
          </div>
        )}
      </Draggable>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ViewJob data={data} closeModal={() => setIsModalOpen(false)} />
      </Dialog>
    </>
  );
}
