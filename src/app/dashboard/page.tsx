import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
// import { redirect } from "next/navigation";

// const Page =  () => {
//     const {getUser} = getKindeServerSession();
//     const user = getUser()

// if(!user || !user.id) redirect("/auth-callback?origin=dashboard")

//     return <div>{ user.email}</div>

// }

// export default Page;

// import Dashboard from "@/components/Dashboard";
// import { db } from "@/db";
//import { getUserSubscriptionPlan } from '@/lib/stripe'
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  // added await for user.id and user.email
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = db.user.findFirst({
    //add await if need gives an error before db in this line
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  //const subscriptionPlan = await getUserSubscriptionPlan()
  // only for now

  return <Dashboard />;
};

export default Page;