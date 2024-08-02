import cron from "node-cron";
import { Job } from "../models/Job.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";


export const newsLetterCron=()=>{
cron.schedule("*/1 * * * *",async()=>{
    console.log("Running cron job")
    const jobs=await Job.find({newsLetterSent:false});
    for(const job of jobs){
        try {
            const filteredUsers=await User.find({
                $or:[
                    {"niches.firstNiche":job.jobNiche},
                    {"niches.secondNiche":job.jobNiche},
                    {"niches.thirdNiche":job.jobNiche}                
                ]
            })

            for (const user of filteredUsers){
                const subject=`Job Alert :${job.title} `;
                const message=`Hi ${user.name} , \n\n company : ${job.companyName} salary:${job.salary} `  ;
                await sendEmail(
                    {receiverEmail:user.email,subject,message}
                );
            }

            job.newsLetterSent=true;
            await job.save();
            
        } catch (error) {
            console.log("Error in node cron catch block")
            return next(console.error(error || "Some error in cron"))
        }
    }
})
}