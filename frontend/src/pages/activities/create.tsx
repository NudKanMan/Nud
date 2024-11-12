import React from "react";
import { ActivityProps } from "@/types/types";
import CreateActivity from "@/components/Activity/CreateActivity";

const create: React.FC<ActivityProps> = () => {
  return (
    <div className="text-black w-2/3 flex flex-col justify-center items-center">
      <CreateActivity />
    </div>
  );
};

export default create;
