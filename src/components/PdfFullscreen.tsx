// import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
// import { Button } from "./ui/button"
import { Expand, Loader2 } from "lucide-react"
// import SimpleBar from "simplebar-react"
import error from "next/error"
// import { toast } from "@/hooks/use-toast"
// import { Page } from "react-pdf"
import React from 'react';
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import SimpleBar from 'simplebar-react'
import 'react-pdf/dist/Page/TextLayer.css';
import { useResizeDetector } from 'react-resize-detector';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast, useToast } from '@/hooks/use-toast';
import {useForm} from 'react-hook-form'
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

interface PdfFullscreenProps {
    publicUrl:string
}
const PdfFullscreen = ({publicUrl}:PdfFullscreenProps) => {
    const [isOpen,setIsOpen]= useState(false)
    const [numPages, setNumPages] = useState<number | null>(null);
    const [currPage,setCurrPage] = useState<number>(1);
    const { width, ref } = useResizeDetector()
    const {toast} = useToast()
    return (
        <Dialog
        open={isOpen}
        onOpenChange={(v)=>{
            if(!v) {
                setIsOpen(v)
            }
        }}>
            <DialogTrigger
            onClick={() => setIsOpen(true)} 
            asChild>
                <Button
                
                className="gap-1.5"
                aria-label="fullscreen">
                    <Expand className="h-4 w-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-full">
                <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
                <div ref={ref}>
     
     {/* {error ? (
       <p className="text-red-500">error</p>
     ) : ( */}
       {/* <Document
         file={publicUrl} // Dynamic public URL
         onLoadSuccess={({numPages})=>setNumPages(numPages)}
         onLoadError={() => {
           toast({
             title:'Error loading PDF',
             description:'please try again later',
             variant:'destructive',
           })
         }}
         className="max-h-screen"
       >
        {new Array(numPages).fill(0).map((_,i)=>(
            <Page width={width ? width : 1}
            //  key={`page_${index + 1}`} 
            pageNumber={i+1} 
            
            />
        ))}
         {/* {Array.from(new Array(numPages), (el, index) => ( */}
           
         {/* ))} */}
       {/* </Document> */} 
     {/* )} */}
   
     <Document
              loading={
                <div className='flex justify-center'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                })
              }}
              onLoadSuccess={({ numPages }) =>
                setNumPages(numPages)
              }
              file={publicUrl}
              className='max-h-full'>
              {new Array(numPages).fill(0).map((_, i) => (
                <Page
                  key={i}
                  width={width ? width : 1}
                  pageNumber={i + 1}
                />
              ))}
            </Document>
   </div>
                </SimpleBar>
            </DialogContent>
        </Dialog>
    )
}

export default PdfFullscreen