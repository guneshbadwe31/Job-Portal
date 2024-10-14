import { getJobs } from "@/api/apijobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/ui/job-card";
import { getCompanies } from "@/api/apicompanies";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { State } from "country-state-city";
// import { Pagination, PaginationContent, PaginationItem,  } from "lucide-react";
// import {

//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"
// import { Pagination } from "@/components/ui/pagination";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompanyId] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    loading: loadingJobs,
    data: jobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const {
    fn: fnCompanies,
    data: companies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      console.log("User is loaded, fetching companies...");
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      console.log("User is loaded, fetching jobs...");
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery(""); // Clear search query
    setCompanyId(""); // Clear company filter
    setLocation(""); // Clear location filter
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">Latest Jobs</h1>

      <form onSubmit={handleSearch} className="h-14 flex w-full gap-2 items-center mb-3">
        <input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          value={searchQuery} // Bind input value to searchQuery state
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
          className="h-full flex-1 px-4 text-md bg-[#0a0a23] text-gray-300 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return <SelectItem key={name} value={name}>{name}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompanyId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies && companies.map(({ name, id }) => {
                return <SelectItem key={id} value={id}>{name}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2">
          Clear Filters
        </Button>
      </div>

      {/* <div>
      <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
      </div> */}

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;







// import { getJobs } from "@/api/apijobs";
// import useFetch from "@/hooks/use-fetch";
// import { useUser } from "@clerk/clerk-react";
// import { useEffect, useState } from "react";
// import { BarLoader } from "react-spinners";
// import JobCard from "@/components/ui/job-card";
// import { getCompanies } from "@/api/apicompanies";
// import { Button } from "@/components/ui/button";
// // import {   } from "@radix-ui/react-select";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { State } from "country-state-city";


// const JobListing = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [location, setLocation] = useState("");
//   const [company_id, setCompanyId] = useState("");
//   const { isLoaded } = useUser();

//   const {
//     fn: fnJobs,
//     loading: loadingJobs,
//     data: jobs, // Assuming useFetch returns data as 'data'
//     error, // Assuming useFetch returns an error if the fetch fails
//   } = useFetch(getJobs, {
//     location,
//     company_id,
//     searchQuery
//   });


//   const {
//     fn: fnCompanies,
//     data: companies, // Assuming useFetch returns data as 'data'
//   } = useFetch(getCompanies);


//   useEffect(() => {
//     if (isLoaded) {
//       console.log("User is loaded, fetching jobs...");
//       fnCompanies();
//     }
//   }, [isLoaded]); 



//   // UseEffect to fetch jobs once user is loaded
//   useEffect(() => {
//     if (isLoaded) {
//       console.log("User is loaded, fetching jobs...");
//       fnJobs();
//     }
//   }, [isLoaded, location, company_id, searchQuery]); // Dependency array ensures refetch on filter changes

//   const handleSearch = (e) => {
//     e.preventDefault();
//     let formData = new FormData(e.target);

//     const query = formData.get("search-query");
//     if (query) setSearchQuery(query);
//   };

//   const clearFilters = () => {
//     setSearchQuery("");
//     setCompanyId("");
//     setLocation("");
//   };

//   if (!isLoaded) {
//     // Show loading spinner while Clerk user is being loaded
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   }

//   return <div>
//     <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
//         Latest Jobs
//       </h1>

      
//         {/* Add search and filter input fields */}
//       <form onSubmit={handleSearch} className=" h-14 flex w-full gap-2 items-center mb-3">
//         <input 
//         type="text"
//         placeholder="Search Jobs by Title..."
//         name="search-query"
//         onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change

//         className="h-full flex-1 px-4 text-md bg-[#0a0a23] text-gray-300 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//         />

//         <Button type="submit" className="h-full sm:w-28" variant="blue">
//           Search
//         </Button>
//       </form>

//       <div className="flex flex-col sm:flex-row gap-2">
//       <Select value={location} onValueChange={(value) => setLocation(value)}>
//       <SelectTrigger>
//         <SelectValue placeholder="Filter by Location" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           {State.getStatesOfCountry("IN").map(({name}) => {
//             return (
//               <SelectItem key={name} value={name}>{name}</SelectItem>
//             );
//           })}
//         </SelectGroup>
//       </SelectContent>
//     </Select>

//     <Select value={company_id} onValueChange={(value) => setCompanyId(value)}>
//       <SelectTrigger>
//         <SelectValue placeholder="Filter by Company" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           {companies && companies.map(({name, id}) => { 
//             return (
//               <SelectItem key={name} value={id}>
//                 {name}
//               </SelectItem>
//             );
//           })}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//     <Button onClick={clearFilters} variant="destructive" className = "sm:w-1/2">
//       Clear Filters
//     </Button>
//       </div>

      

      





//       {loadingJobs && (
//         <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
//       )}

//       {loadingJobs === false && (
//         <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {jobs?.length ?(
//             jobs.map((job)=>{
//               return (
//                 <JobCard
//                  key={job.id}
//                   job={job}
//                   savedInit={job.saved?.length > 0}
//                 />
//               );
//             })
//           ) : (
//             <div>No jobs Found</div>
//           )}
//         </div>
//       )}
//   </div>
// };

// export default JobListing





