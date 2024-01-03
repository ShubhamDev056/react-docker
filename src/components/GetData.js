import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

 const GetData = () => {
  const [data, setData] = useState([]);
 const ApibaseURL = "https://api.jugalbandi.ai/query-with-langchain-gpt3-5"
 const UDID= "5f0f570c-a949-11ee-89c9-42004e494300"
 let userInput= "What is jjm";
  useEffect(() => {
    axios
      .get(ApibaseURL, 
      {params: 
      {
        "query_string":encodeURI(userInput),
        "uuid_number":UDID
    },})
      .then(function (response) {
        console.log("response!!!!",response?.data?.answer);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return <div>GetData</div>;
};

export default GetData
