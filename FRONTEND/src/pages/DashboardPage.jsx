import React from "react";
import { UrlForm } from "../components/UrlForm";
import UserUrl from "../components/UserUrl";

const DashboardPage = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Dashboard
        </h1>
        <UrlForm />
        <UserUrl />
      </div>
    </div>
  );
};

export default DashboardPage;
