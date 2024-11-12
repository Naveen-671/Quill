// // "use client"

// // import { useRouter, useSearchParams } from 'next/navigation'
// // import { trpc } from '../_trpc/client'
// // import { Loader2 } from 'lucide-react'

// // const Page = () => {
// //   const router = useRouter()
  
// //   const searchParams = useSearchParams()
// //   const origin = searchParams.get('origin')



// //   const {data,isLoading} = trpc.authCallback.useQuery(undefined, {
// //     onSuccess : ({ success }) => {
// //       if (success) {
// //         // user is synced to db
// //         router.push(origin ? `/${origin}` : '/dashboard')
// //       }
// //     },
// //     onError: (err) => {
// //       if (err.data?.code === 'UNAUTHORIZED') {
// //         router.push('/sign-in')
// //       }
// //     },
// //     retry: true,
// //     retryDelay: 500,
// //   })

// //   return (
// //     <div className='w-full mt-24 flex justify-center'>
// //       <div className='flex flex-col items-center gap-2'>
// //         <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
// //         <h3 className='font-semibold text-xl'>
// //           Setting up your account...
// //         </h3>
// //         <p>You will be redirected automatically.</p>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Page

// "use client"

// import { useRouter, useSearchParams } from 'next/navigation'
// import { trpc } from '../_trpc/client'
// import { Loader2 } from 'lucide-react'

// const Page = () => {
//   const router = useRouter()

//   const searchParams = useSearchParams()
//   const origin = searchParams.get('origin')

//   trpc.authCallback.useQuery(undefined, {
//     onSuccess: ({ success }) => {
//       if (success) {
//         // user is synced to db
//         router.push(origin ? `/${origin}` : '/dashboard')
//       }
//     },
//     onError: (err) => {
//       if (err.data?.code === 'UNAUTHORIZED') {
//         router.push('/sign-in')
//       }
//     },
//     retry: true,
//     retryDelay: 500,
//   })

//   return (
//     <div className='w-full mt-24 flex justify-center'>
//       <div className='flex flex-col items-center gap-2'>
//         <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
//         <h3 className='font-semibold text-xl'>
//           Setting up your account...
//         </h3>
//         <p>You will be redirected automatically.</p>
//       </div>
//     </div>
//   )
// }

// export default Page  

// "use client"

// import { useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { trpc } from '../_trpc/client'
// import { Loader2 } from 'lucide-react'

// const Page = () => {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const origin = searchParams.get('origin')

//   // Call the TRPC query (this runs automatically)
//   const { data, error, isLoading } = trpc.authCallback.useQuery()

//   // Use useEffect to handle success and error cases
//   useEffect(() => {
//     if (data && data.success) {
//       // If the auth is successful, redirect the user
//       router.push(origin ? `/${origin}` : '/dashboard')
//     }

//     if (error && error.data?.code === 'UNAUTHORIZED') {
//       // If there is an unauthorized error, redirect to sign-in page
//       router.push('/sign-in')
//     }
//   }, [data, error, router, origin])

//   // Show loading spinner while waiting for the TRPC query to finish
//   if (isLoading) {
//     return (
//       <div className='w-full mt-24 flex justify-center'>
//         <div className='flex flex-col items-center gap-2'>
//           <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
//           <h3 className='font-semibold text-xl'>
//             Setting up your account...
//           </h3>
//           <p>You will be redirected automatically.</p>
//         </div>
//       </div>
//     )
//   }

//   return null
// }

// export default Page

"use client"

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  const { data, isLoading, isError } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  });

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.success) {
        // User is synced to db
        router.push(origin ? `/${origin}` : '/dashboard');
      } else {
        setIsComplete(true); // Mark as complete if success is false
      }
    }
    if (isError) {
      router.push('/sign-in');
    }
  }, [data, isError, router, origin]);

  useEffect(() => {
    if (!isLoading) {
      setIsComplete(true); // Only set to complete when loading is done
    }
  }, [isLoading]);

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        {isLoading ? (
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        ) : (
          isComplete && (
            <>
              <h3 className='font-semibold text-xl'>
                Setting up your account...
              </h3>
              <p>You will be redirected automatically.</p>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Page;

// "use client"

// import { useRouter, useSearchParams } from 'next/navigation'
// import { trpc } from '../_trpc/client'
// import { Loader2 } from 'lucide-react'

// const Page = () => {
//   const router = useRouter()

//   const searchParams = useSearchParams()
//   const origin = searchParams.get('origin')

//   trpc.authCallback.useQuery(undefined, {
//     onSuccess: ({ success }) => {
//       if (success) {
//         // user is synced to db
//         router.push(origin ? `/${origin}` : '/dashboard')
//       }
//     },
//     onError: (err) => {
//       if (err.data?.code === 'UNAUTHORIZED') {
//         router.push('/sign-in')
//       }
//     },
//     retry: true,
//     retryDelay: 500,
//   })

//   return (
//     <div className='w-full mt-24 flex justify-center'>
//       <div className='flex flex-col items-center gap-2'>
//         <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
//         <h3 className='font-semibold text-xl'>
//           Setting up your account...
//         </h3>
//         <p>You will be redirected automatically.</p>
//       </div>
//     </div>
//   )
// }

// export default Page