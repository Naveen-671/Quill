import { AppRouter } from "@/trpc";
import { inferRouterOutputs } from "@trpc/server";
import React from "react";

type RouterOutput = inferRouterOutputs<AppRouter>

type Messages = RouterOutput["getFileMessages"]["messages"]

type OmitText = Omit<Messages[number],"text">

type ExtendedText = {
    // text:string | React.JSX.Element
     text:string | JSX.Element   //---original change to this if required
}

export type ExtendedMessage = OmitText & ExtendedText