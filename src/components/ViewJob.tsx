"use client";

import { IJob } from "@/types/Interfaces";
import { Business } from "@mui/icons-material";
import moment from "moment";

interface Prop {
  data: IJob;
  closeModal: () => void;
}

export default function ViewJob({ data, closeModal }: Prop) {
  return (
    <div className="max-w-[400px] bg-white relative p-5 rounded-lg border-2 border-solid border-[#ccc]">
      <button
        onClick={closeModal}
        className="absolute bg-transparent border-[none] right-[10px] top-[5px] text-[16px]"
      >
        <span>x</span>
      </button>
      <h2 className="font-bold text-[20px]">{data.jobName}</h2>
      <p className="font-[bold] flex items-center gap-[5px] font-bold text-[18px]">
        <Business />
        {data.companyName}
      </p>
      <p className="mt-[10px]">{data.jobDescription}</p>
      <p className="mt-[5px]">Asking Salary: {data.askingSalary}</p>
      <p className="mt-[5px]">Status: {data.status}</p>
      <p>Created At: {moment(data.createdAt).fromNow()}</p>
    </div>
  );
}
