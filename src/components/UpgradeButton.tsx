// "use client"

// import { ArrowRight, Link } from 'lucide-react'
// import { Button } from './ui/button'
// import { trpc } from '@/app/_trpc/client'
// import { redirect } from 'next/dist/server/api-utils'

// const UpgradeButton = () => {

// //   const {mutate: createStripeSession} = trpc.createStripeSession.useMutation({
// //     onSuccess: ({url}) => {
// //       window.location.href = url ?? "/dashboard/billing"
// //     }
// //   })

// //   return (
// //     <Button 
// //      className='w-full'>
// //       Upgrade now <ArrowRight className='h-5 w-5 ml-1.5' />
// //       {/* <Link href={'/dashboard'}/> */}
// //     </Button>
// //   )
// return(
// <Link
// href={
//   '/dashboard'
// }
// className={
// //     buttonVariants({
// //   className: 'w-full',
// //   variant: 'secondary',//comment out if needed
// // })
// "w-full"
// }>
// 'Upgrade now'
// <ArrowRight className='h-5 w-5 ml-1.5' />
// </Link>
// )
// }

// export default UpgradeButton