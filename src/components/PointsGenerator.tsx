"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import BulletpointsList from "./BulletpointsList";

type Props = { resumeId: number };

const PointsGenerator = ({ resumeId }: Props) => {
  //whenever we submit using the form, we will call the useChat hook which will
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      resumeId,
    },
  });
  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div
      className="relative max-h-screen overflow-scroll"
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-x1 font-bold">Bulletpoints Generator</h3>
      </div>

      {/* Bulletpoints list  */}
      <BulletpointsList messages={messages} />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom 0 inset-0 px-2 py-4 bg-white"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="What was your role? and describe it in one sentence"
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PointsGenerator;
