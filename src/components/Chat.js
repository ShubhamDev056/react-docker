import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const errorMessage =
  "My apologies, I'm not available at the moment, however, feel free to contact our support team.";
const loader = (
  <span className="loader">
    <span className="loader__dot" />
    <span className="loader__dot" />
    <span className="loader__dot" />
  </span>
);

const ApibaseURL = "https://api.jugalbandi.ai/query-with-langchain-gpt3-5";
//const UDID = "5f0f570c-a949-11ee-89c9-42004e494300";

const Chatbot = () => {
  //const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const uuidNum = process.env.REACT_APP_UUID_NUMBER;
  const notify = () => toast.success("UUID successfully added!");

  const [open, setOpen] = useState(false);
  const [uuidNumber, setuuidNumber] = useState(uuidNum);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setuuidNumber(data.uuid);
    notify();
    setOpen(false);
    reset();
  };

  const [messages, setMessages] = useState([
    {
      type: "ai",
      content:
        "Hi there 🖐. I’m Harry, your virtual assistant. I'm here to help with your general enquiries.",
    },
  ]);
  const chatbotMessageWindowRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // 'messages' is a dependency that triggers
  const scrollToBottom = () => {
    if (chatbotMessageWindowRef.current) {
      chatbotMessageWindowRef.current.scrollTop =
        chatbotMessageWindowRef.current.scrollHeight;
    }
  };

  const userMessage = (content) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "user",
        content,
      },
    ]);
  };

  useEffect(() => {
    if (isLoading) {
      aiMessage(loader, isLoading);
    }
    if (isLoading === false) {
      //remove typing messages from list
      const removeLoader = () => {
        setMessages(messages.filter((message) => message.loading !== true));
      };

      removeLoader();
    }
  }, [isLoading]); //

  const send = (inputValue) => {
    setLoading(true);
    //call API here
    fetch(`${ApibaseURL}?query_string=${inputValue}&uuid_number=${uuidNumber}`)
      .then((response) => response.json())
      .then((response) => {
        // console.log("res", response);
        aiMessage(response?.answer, isLoading);
      })
      .catch((e) => {
        aiMessage(errorMessage, isLoading);
        //console.log(e.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // axios
    //   .get(ApibaseURL, {
    //     params: {
    //       query_string: encodeURI(inputValue),
    //       uuid_number: UDID,
    //     },
    //   })
    //   .then(function (response) {
    //     console.log("response!!!!", response?.data?.answer);
    //     aiMessage(response?.data?.answer, isLoading);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  //AI message function
  const aiMessage = (content, loading) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "ai",
        content,
        loading,
      },
    ]);
  };

  //send a message
  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      userMessage(inputValue);
      send(inputValue);
      setInputValue("");
    }
  };
  //toggle chatbot window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={onOpenModal}>UUID</button>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Add New UUID (Jal Jeevan Mission)</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="uuid"
              {...register("uuid", {
                required: true,
              })}
              placeholder="Enter your UUID Number"
            />
            {errors.uuid && errors.uuid.type === "required" && (
              <p className="errorMsg" style={{ color: "red" }}>
                UUID Number is required.
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-default">
            Submit
          </button>
        </form>
      </Modal>

      <div className={`chatbot ${!isOpen ? "chatbot--closed" : ""}`}>
        <div className="chatbot__header" onClick={toggleChat}>
          <p>
            <strong>How can i assist you?</strong>
            <span className="u-text-highlight"> Ask Questions</span>
          </p>
          <svg
            className="chatbot__close-button icon-speech"
            viewBox="0 0 32 32"
          >
            <use xlinkHref="#icon-speech" />
          </svg>
          <svg className="chatbot__close-button icon-close" viewBox="0 0 32 32">
            <use xlinkHref="#icon-close" />
          </svg>
        </div>
        <div className="chatbot__message-window" ref={chatbotMessageWindowRef}>
          <ul className="chatbot__messages">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`is-${message.type} animation ${
                  message.loading ? "is-loading" : ""
                }`}
              >
                {message.type === "ai" && (
                  <div className="is-ai__profile-picture">
                    <img
                      src="https://22579069.fs1.hubspotusercontent-na1.net/hub/22579069/hubfs/chatbot-lady_smal-2.webp?width=108&height=108"
                      alt="assistant-avatar"
                      style={{ width: 30 }}
                    />
                    {/* <svg className="icon-avatar" viewBox="0 0 32 32">
                      <use xlinkHref="#avatar" />
                    </svg> */}
                  </div>
                )}
                <p className="chatbot__message">{message.content}</p>

                <span
                  className={`chatbot__arrow chatbot__arrow--${
                    message.type === "ai" ? "left" : "right"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="chatbot__entry chatbot--closed">
          <input
            type="text"
            className="chatbot__input"
            placeholder="Write a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") sendMessage();
            }}
          />
          <svg
            className="chatbot__submit"
            viewBox="0 0 32 32"
            onClick={sendMessage}
          >
            <use xlinkHref="#icon-send" />
          </svg>
        </div>
      </div>
      <svg>
        <symbol id="icon-close" viewBox="0 0 32 32">
          <title>Close</title>
          <path d="M2.624 8.297l2.963-2.963 23.704 23.704-2.963 2.963-23.704-23.704z" />
          <path d="M2.624 29.037l23.704-23.704 2.963 2.963-23.704 23.704-2.963-2.963z" />
        </symbol>

        <symbol id="icon-speech" viewBox="0 0 32 32">
          <title>Speech</title>
          <path d="M21.795 5.333h-11.413c-0.038 0-0.077 0-0.114 0l-0.134 0.011v2.796c0.143-0.006 0.273-0.009 0.385-0.009h11.277c0.070 0 7.074 0.213 7.074 7.695 0 5.179-2.956 7.695-9.036 7.695h-3.792c-0.691 0-1.12 0.526-1.38 1.159l-1.387 3.093-1.625 3.77 0.245 0.453h2.56l2.538-5.678h2.837c7.633 0 11.84-3.727 11.84-10.494 0.001-8.564-7.313-10.492-9.875-10.492z" />
          <path d="M10.912 24.259c-0.242-0.442-0.703-0.737-1.234-0.737-0 0-0 0-0 0h-0.56c-0.599-0.011-1.171-0.108-1.71-0.28l0.042 0.012c-1.82-0.559-4.427-2.26-4.427-7.424 0-6.683 5.024-7.597 7.109-7.686v-2.8c-2.042 0.095-9.91 1.067-9.91 10.483 0 4.832 1.961 7.367 3.606 8.64 1.38 1.067 3.109 1.744 4.991 1.843l0.033 0.019 2.805 5.211 1.41-3.273z" />
        </symbol>
        <symbol id="icon-send" viewBox="0 0 23.97 21.9">
          <title>Send</title>
          <path d="M0.31,9.43a0.5,0.5,0,0,0,0,.93l8.3,3.23L23.15,0Z" />
          <path d="M9,14.6H9V21.4a0.5,0.5,0,0,0,.93.25L13.22,16l6,3.32A0.5,0.5,0,0,0,20,19l4-18.4Z" />
        </symbol>
      </svg>
    </>
  );
};

export default Chatbot;
