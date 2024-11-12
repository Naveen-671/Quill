// import {Pinecone} from '@pinecone-database/pinecone';

// export const pinecone = new Pinecone({
//     apiKey:process.env.PINECONE_API_KEY!,
//     // environment:"us-east-1"
// });

//code from documentatin use this if needed
// import { Pinecone } from '@pinecone-database/pinecone';

// const pc = new Pinecone({
//   apiKey: 'c6b6fedf-d042-449b-8d15-dc1caff784ae'
// });
// const index = pc.index('quickstart');
// import PineconeClient from '@pinecone-database/pinecone';

// import { PineconeClient } from '@pinecone-database/pinecone'
// import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

// export const getPineconeClient = async () => {
//   const client = new PineconeClient()

//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY!,
//     // environment: 'us-east1-gcp',
//   })

//   return client
// }

// import { PineconeClient } from '@pinecone-database/pinecone';

// export const getPineconeClient = async () => {
//   const client = new PineconeClient();

//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY!,
//     // environment: 'us-east1-gcp',
//   });

//   return client;
// };

import { Pinecone } from "@pinecone-database/pinecone";

export const getPineconeClient = async () => {
  const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    // environment: 'us-east1-gcp', // Specify your environment here if needed
  });
  // const indexName = 'quill';
  const index = client.index('quill');
// await client.createIndex({
//   name: index,
//   dimension: 1536, // Replace with your model dimensions
//   metric: 'cosine', // Replace with your model metric
//   spec: { 
//     serverless: { 
//       cloud: 'aws', 
//       region: 'us-east-1' 
//     }
//   } 
// });//take this out if needed
  return client;
};

// import { Pinecone } from '@pinecone-database/pinecone';

// export const client = new Pinecone({
//   apiKey: 'pcsk_5zMnoQ_4ymmy3sULMo9kdNuRYxbk8oVg5AoCF9Q66ZVNRZk8NhDyAWhXqYcnJk8g1tnZ5u'
// });
// const index = client.index('quickstart');