import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { CardHeader, CardTitle, Card, CardContent, CardFooter } from './card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { deleteJob, savedJob as saveJobApi } from '@/api/apijobs'; // Renamed the API function to avoid conflict
import useFetch from '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);

  const {
    fn: fnSavedJobs,
    loading: loadingSavedJob,
    data: savedJobData, // Renamed the data variable from `savedJob` to `savedJobData`
    error,
  } = useFetch(saveJobApi, { // Using the renamed API function
    alreadySaved: saved,
  });

  const { user } = useUser();

  const handleSaveJob = async () => {
    await fnSavedJobs({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };


  const {
    loading: loadingDeleteJob ,
    fn: fnDeleteJob,
  } = useFetch(deleteJob, {
    job_id: job.id,
  });


  const handleDeleteJob = async () => {
    await fnDeleteJob()
    onJobSaved()

  }

  useEffect(() => {
    if (savedJobData !== undefined) {
      console.log('Saved Job Data:', savedJobData); // Log the data to inspect
      setSaved(!!savedJobData); // Adjust based on data structure
    }
  }, [savedJobData]); // Correct dependency: listen to `savedJobData`

  return (
    <Card className="flex flex-col">
      {loadingDeleteJob && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader className="flex">
        <CardTitle className="flex justify-between font-bold">
          {job.title}

          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf('.'))}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;










// /* eslint-disable react/prop-types */
// import React, { useEffect } from 'react'
// import { useUser } from '@clerk/clerk-react'
// import { CardHeader, CardTitle, Card, CardContent, CardFooter } from './card'
// import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { Button } from './button'
// import { savedJob } from '@/api/apijobs'
// import useFetch from '@/hooks/use-fetch'
// import { useState } from 'react'
// // import { savedJob } from '@/api/apijobs';
// // import { BarLoader } from 'react-spinners'



// const JobCard = ({
//   job,
//   isMyJob = false,
//   savedInit = false,
//   onJobSaved = () => {},
// }) => {

//   const [saved, setSaved] = useState(savedInit)

// //   const {
// //     fn: fnSavedJobs,
// //     loading: loadingSavedJobs,
// //     data: savedJob, // Assuming useFetch returns data as 'data'
// //     error, // Assuming useFetch returns an error if the fetch fails
// //   } = useFetch(savedJob,{
// //     alreadySaved: saved,
// //   });
// const {
//   fn: fnSavedJobs,
//   loading: loadingSavedJob,
//   data: savedJob, // Rename this to avoid conflict
//   error,
// } = useFetch(savedJob, { // No change here, keep the imported savedJob
//   alreadySaved: saved,
// });


//   const {user} = useUser();

//   // const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
//   //   job_id: job.id,
//   // });

//   const handleSaveJob= async () => {
//     await fnSavedJobs({
//       user_id: user.id,
//       job_id: job.id,
//     });
//     onJobSaved();
//   };

//   // const handleDeleteJob = async () => {
//   //   await fnDeleteJob();
//   //   onJobAction();
//   // };


//   useEffect(() => {
//     if(savedJob !== undefined) setSaved(savedJob?.length > 0);
//   }, [savedJob]);
// // useEffect(() => {
// //   if (savedJobData !== undefined) setSaved(savedJobData?.length > 0);
// // }, [savedJobData]);



//   return (
//     <Card className="flex flex-col">
//       {/* {loadingDeleteJob && (
//         <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
//       )} */}
//         <CardHeader className="flex">
//           <CardTitle className="flex justify-between font-bold">
//             {job.title}
//             {isMyJob && (
//             <Trash2Icon
//               fill="red"
//               size={18}
//               className="text-red-300 cursor-pointer"
//               // onClick={handleDeleteJob}

//             />
//           )}
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="flex flex-col gap-4 flex-1">
//           <div className='flex justify-between'>
//             {job.company && <img src={job.company.logo_url} className="h-6" />}
//             <div className='flex gap-2 items-center'>
//              <MapPinIcon size={15} /> {job.location}
//             </div>
//           </div>
//           <hr />
//           {job.description.substring(0, job.description.indexOf("."))}
//         </CardContent>
//         <CardFooter className="flex gap-2">
//         <Link to={`/job/${job.id}`} className="flex-1">
//           <Button variant="secondary" className="w-full">
//             More Details
//           </Button>
//         </Link>

//         {!isMyJob && (
//           <Button
//            variant='outline'
//             className='w-15'
//              onClick={handleSaveJob}
//               disabled={loadingSavedJob}
//           >
//             {saved ? (
//                 <Heart size={20} stroke="red" fill="red"/>
//                ) : (
//                 <Heart size={20} />
//                )} 
//               </Button>
//         )}
//         </CardFooter>
//     </Card>

//   )
   
// }

// export default JobCard















// import React, { useEffect, useState } from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { CardHeader, CardTitle, Card, CardContent, CardFooter } from './card';
// import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Button } from './button';
// import { savedJob as savedJobAPI } from '@/api/apijobs'; // Rename the import
// import useFetch from '@/hooks/use-fetch';
// import { savedJob } from '@/api/apijobs';

// const JobCard = ({
//   job,
//   isMyJob = false,
//   savedInit = false,
//   onJobSaved = () => {},
// }) => {

//   const [saved, setSaved] = useState(savedInit);

//   // const {
//   //   fn: fnSavedJobs,
//   //   loading: loadingSavedJobs,
//   //   data: fetchedSavedJob, // Renamed to avoid conflict
//   //   error,
//   // } = useFetch(savedJobAPI, {
//   //   alreadySaved: saved,
//   // });
//   const {
//     fn: fnSavedJobs,
//     loading: loadingSavedJobs,
//     data: savedJobData, // Rename this to avoid conflict
//     error,
//   } = useFetch(savedJob, { // No change here, keep the imported savedJob
//     alreadySaved: saved,
//   });
  

//   const { user } = useUser();

//   const handleSaveJob = async () => {
//     await fnSavedJobs({
//       user_id: user.id,
//       job_id: job.id,
//     });
//     onJobSaved();
//   };

//   // useEffect(() => {
//   //   if (fetchedSavedJob !== undefined) {
//   //     setSaved(fetchedSavedJob?.length > 0);
//   //   }
//   // }, [fetchedSavedJob]);
//   useEffect(() => {
//     if (savedJobData !== undefined) setSaved(savedJobData?.length > 0);
//   }, [savedJobData]);
  

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex justify-between font-bold">
//           {job.title}

//           {isMyJob && (
//             <Trash2Icon
//               fill="red"
//               size={18}
//               className="text-red-300 cursor-pointer"
//             />
//           )}
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="flex flex-col gap-4 flex-1">
//         <div className="flex justify-between">
//           {job.company && <img src={job.company.logo_url} className="h-6" />}
//           <div className="flex gap-2 items-center">
//             <MapPinIcon size={15} /> {job.location}
//           </div>
//         </div>
//         <hr />
//         {job.description.substring(0, job.description.indexOf('.'))}
//       </CardContent>
//       <CardFooter className="flex gap-2">
//         <Link to={`/job/${job.id}`} className="flex-1">
//           <Button variant="secondary" className="w-full">
//             More Details
//           </Button>
//         </Link>

//         {!isMyJob && (
//           <Button
//             variant="outline"
//             className="w-15"
//             onClick={handleSaveJob}
//             disabled={loadingSavedJobs}
//           >
//             {saved ? (
//               <Heart size={20} stroke="red" fill="red" />
//             ) : (
//               <Heart size={20} />
//             )}
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export default JobCard;

