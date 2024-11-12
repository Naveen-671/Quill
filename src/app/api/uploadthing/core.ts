import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
// import {PDFLoader} from '@langchain/document_loaders/fs/pdf';
// import { PDFLoader } from 'langchain/document_loaders/fs/text';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { getPineconeClient } from "@/lib/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { Index } from '@pinecone-database/pinecone/dist/data/index';

import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
// import { PineconeStore } from "langchain/vectorstores/pinecone";
const f = createUploadthing();


// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: "64MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) throw new Error("Unauthorized");
      // If you throw, the user will not be able to upload
      //   if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      //   console.log("Upload complete for userId:", metadata.userId);

      //   console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      //   return { uploadedBy: metadata.userId };
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING",
        },
      });

      try {
        const response = await fetch(
          `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
        );
        const blob = await response.blob();

        const loader = new PDFLoader(blob);

        const pageLevelDocs = await loader.load();

        const pageAmt = pageLevelDocs.length;

        //vectorize and index entire document
        const pinecone = await getPineconeClient();
        const pineconeIndex = pinecone.Index("quill");

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        await PineconeStore.fromDocuments
        (pageLevelDocs, embeddings, {
          
          pineconeIndex,
          namespace: createdFile.id,
        });

        await db.file.update({
          data: {
            uploadStatus: "SUCCESS",
          },
          where: {
            id: createdFile.id,
          },
        });
      } catch (err) {
        await db.file.update({
          data: {
            uploadStatus: "FAILED",
          },
          where: {
            id: createdFile.id,
          },
        });
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;


// import { db } from "@/db";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
// // import {PDFLoader} from '@langchain/document_loaders/fs/pdf';
// // import { PDFLoader } from 'langchain/document_loaders/fs/text';
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// // import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// // import { getPineconeClient } from "@/lib/pinecone";
// import { Pinecone } from "@pinecone-database/pinecone";
// import { Index } from '@pinecone-database/pinecone/dist/data/index';

// import { PineconeStore } from "@langchain/pinecone";
// import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
// // import { PineconeStore } from "langchain/vectorstores/pinecone";


// import { db } from '@/db'
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
// import {
//   createUploadthing,
//   type FileRouter,
// } from 'uploadthing/next'

// // import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
// // import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
// // import { PineconeStore } from 'langchain/vectorstores/pinecone'
// import { getPineconeClient } from '@/lib/pinecone'
// // import { getUserSubscriptionPlan } from '@/lib/stripe'
// // import { PLANS } from '@/config/stripe'

// const f = createUploadthing()

// const middleware = async () => {
//   const { getUser } = getKindeServerSession()
//   const user = await getUser()

//   if (!user || !user.id) throw new Error('Unauthorized')

//   // const subscriptionPlan = await getUserSubscriptionPlan()

//   return { //subscriptionPlan,
//      userId: user.id }
// }

// const onUploadComplete = async ({
//   metadata,
//   file,
// }: {
//   metadata: Awaited<ReturnType<typeof middleware>>
//   file: {
//     key: string
//     name: string
//     url: string
//   }
// }) => {
//   const isFileExist = await db.file.findFirst({
//     where: {
//       key: file.key,
//     },
//   })

//   if (isFileExist) return

//   const createdFile = await db.file.create({
//     data: {
//       key: file.key,
//       name: file.name,
//       userId: metadata.userId,
//       url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
//       uploadStatus: 'PROCESSING',
//     },
//   })

//   try {
//     const response = await fetch(
//       `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
//     )

//     const blob = await response.blob()

//     const loader = new PDFLoader(blob)

//     const pageLevelDocs = await loader.load()

//     const pagesAmt = pageLevelDocs.length

//     // const { subscriptionPlan } = metadata
//     // const { isSubscribed } = subscriptionPlan

//     // const isProExceeded =
//     //   pagesAmt >
//     //   PLANS.find((plan) => plan.name === 'Pro')!.pagesPerPdf
//     // const isFreeExceeded =
//     //   pagesAmt >
//     //   PLANS.find((plan) => plan.name === 'Free')!
//     //     .pagesPerPdf

//     // if (
//     //   (isSubscribed && isProExceeded) ||
//     //   (!isSubscribed && isFreeExceeded)
//     // ) {
//     //   await db.file.update({
//     //     data: {
//     //       uploadStatus: 'FAILED',
//     //     },
//     //     where: {
//     //       id: createdFile.id,
//     //     },
//     //   })
//     // }

//     // vectorize and index entire document
//     const pinecone = await getPineconeClient()
//     const pineconeIndex = pinecone.Index('quill')

//     const embeddings = new OpenAIEmbeddings({
//       openAIApiKey: process.env.OPENAI_API_KEY,
//     })

//     await PineconeStore.fromDocuments(
//       pageLevelDocs,
//       embeddings,
//       {
//         pineconeIndex,
//         namespace: createdFile.id,
//       }
//     )

//     await db.file.update({
//       data: {
//         uploadStatus: 'SUCCESS',
//       },
//       where: {
//         id: createdFile.id,
//       },
//     })
//   } catch (err) {
//     await db.file.update({
//       data: {
//         uploadStatus: 'FAILED',
//       },
//       where: {
//         id: createdFile.id,
//       },
//     })
//   }
// }

// export const ourFileRouter = {
//   freePlanUploader: f({ pdf: { maxFileSize: '4MB' } })
//     .middleware(middleware)
//     .onUploadComplete(onUploadComplete),
//   proPlanUploader: f({ pdf: { maxFileSize: '16MB' } })
//     .middleware(middleware)
//     .onUploadComplete(onUploadComplete),
// } satisfies FileRouter

// export type OurFileRouter = typeof ourFileRouter
