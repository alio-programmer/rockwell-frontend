import axios from "axios";
import React, { useState } from "react";

const Review = () => {
  const [data, setData] = useState({
    year: "",
    month: "",
    timeframe: "",
  });
  const [summary, setsummary] = useState(() => {
    return localStorage.getItem("summary")
      ? localStorage.getItem("summary")
      : "No summary available";
  });
  const [loading, setloading] = useState(true);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("data:", data);
    let response;
    try {
      setloading(false);
      response = await axios.post(
        "http://localhost:8000/summary/summarize",
        data,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const newdata = await response.data.newSummary;
        setsummary(newdata.Summary);
        if (localStorage.getItem("summary")) {
          localStorage.removeItem("summary");
          localStorage.setItem("summary", newdata.Summary);
        } else {
          localStorage.setItem("summary", newdata.Summary);
        }
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setsummary("Sorry, something went wrong.");
    } finally {
      setData({
        year: "",
        month: "",
        timeframe: "",
      });
      setloading(true);
    }
  };
  return (
    <div className="container">
      <div className=" flex items-center justify-center">
        <form
          className="w-[40%] justify-center items-center p-4 rounded-xl border-2"
          onSubmit={handlesubmit}
        >
          <input
            type="number"
            id="number-input"
            name="year"
            value={data.year}
            onChange={handlechange}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Year"
            required
          />
          <div className=" flex justify-center items-center">
            <label
              htmlFor="month"
              className="my-2 text-lg font-medium text-gray-700 p-1 mx-3  bg-slate-200 rounded-lg"
            >
              Choose month:
            </label>
            <select
              id="month"
              name="month"
              value={data.month}
              onChange={handlechange}
              className="p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={0}>Select Month</option>
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
          </div>
          <input
            type="number"
            id="number-input"
            name="timeframe"
            value={data.timeframe}
            onChange={handlechange}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter timeframe"
            required
          />
          <button
            type="submit"
            onClick={handlesubmit}
            className="m-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Summarize Query
          </button>
        </form>
      </div>
      <div className=" flex flex-col my-3">
        <h1 className=" text-3xl font-extrabold border-b-2 border-black ">
          SUMMARY
        </h1>
        <div className=" mt-4 px-2">
          {" "}
          <h2 className=" text-xl font-extrabold">Last Generated Summary:</h2>
          {loading ? (
            <div>
              <p className=" bg-slate-200 p-2 rounded-lg">{summary}</p>
            </div>
          ) : (
            <div role="status" className="max-w-sm animate-pulse mt-5">
              <div className="h-2.5 bg-slate-200 rounded-full dark:bg-slate-500 w-48 mb-4"></div>
              <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-500 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-500 mb-2.5"></div>
              <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-500 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-500 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-slate-200 rounded-full dark:bg-slate-500 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
