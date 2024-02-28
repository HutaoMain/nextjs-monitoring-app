"use client";

import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

interface Prop {
  closeModal: () => void;
}

export default function AddJob({ closeModal }: Prop) {
  const [jobName, setJobName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [askingSalary, setAskingSalary] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch(`/api/jobs`, {
        method: "POST",
        body: JSON.stringify({
          jobName: jobName,
          companyName: companyName,
          jobDescription: jobDescription,
          askingSalary: askingSalary,
          status: status,
        }),
      });
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-[20px] gap-5">
      <h1>Add Job</h1>

      <TextField
        onChange={(e) => setJobName(e.target.value)}
        required
        label="Job Name"
      />

      <TextField
        onChange={(e) => setCompanyName(e.target.value)}
        required
        label="Company Name"
      />

      <TextField
        onChange={(e) => setJobDescription(e.target.value)}
        required
        label="Job Description"
      />

      <TextField
        onChange={(e) => setAskingSalary(parseInt(e.target.value))}
        required
        label="Asking Salary"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        onChange={(e) => setStatus(e.target.value)}
        select
        label="Status"
        defaultValue="wishlist"
      >
        <MenuItem value="wishlist">Wishlist</MenuItem>
        <MenuItem value="applied">Applied</MenuItem>
        <MenuItem value="interview">Interview</MenuItem>
        <MenuItem value="offer">Offer</MenuItem>
        <MenuItem value="rejected">Rejected</MenuItem>
      </TextField>

      <div className="flex items-center gap-2">
        <Button
          onClick={handleSubmit}
          className="w-[150px] px-0 py-2.5 rounded-[5px] border-[none] bg-[#afd274] text-[#ffffff]"
        >
          {loading ? "Please wait.." : "Submit"}
        </Button>
        <Button
          onClick={closeModal}
          className="w-[150px] px-0 py-2.5 rounded-[5px] border-[none] bg-[#c70000] text-[#ffffff]"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
