import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { State } from "country-state-city";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { getCompanies } from "@/api/apicompanies";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import { addNewJob } from "@/api/apijobs";
import AddCompanyDrawer from "@/components/ui/add-company-drawer";
// import "@uiw/react-md-editor/dist/markdown-editor.css";
// import "@uiw/react-markdown-preview/dist/markdown.css";



const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});


const PostJob = () => {
  const {isLoaded, user} = useUser();
  const navigate = useNavigate();

  const {register, handleSubmit, control, formState: { errors }} = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  })


  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies 
  } = useFetch(getCompanies)

  useEffect(() => {
    if (isLoaded) {
      // console.log("User is loaded, fetching companies..."); 
      fnCompanies();
    }
  }, [isLoaded]);


  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/job");
  }, [loadingCreateJob]);


  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
  <div className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
    <h1>Post a Job</h1>

    <form onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-4 p-4 pb-0"
    >
        <Input placeholder="Job Title"
        className="text-white"
        {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
    

        <Textarea placeholder="Job Description"
        className="text-white"
        {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}


      <div className="flex gap-4 items-center">
          <Controller
           name="location"
           control={control}
           render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} >
             <SelectTrigger className="text-white placeholder-gray-400">
              <SelectValue placeholder="Filter by Location" className="text-white"/>
             </SelectTrigger>
             <SelectContent>
              <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return <SelectItem key={name} value={name}>{name}</SelectItem>;
              })}
              </SelectGroup>
             </SelectContent>
            </Select>

           )}
          />
          
    <Controller
           name="company_id"
           control={control}
           render={({ field }) => (
           <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="text-white placeholder-gray-400">
            <SelectValue placeholder="Filter by Company">
            {field.value
                      ? companies?.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies && companies.map(({ name, id }) => {
                return <SelectItem key={id} value={id}>{name}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

            )}
    />


        {/* add company drawer */}
        <AddCompanyDrawer fetchCompanies={fnCompanies} />




      </div>
      {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors.company_id.message}</p>
        )}

        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />

        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}
        {errorCreateJob?.message && (
          <p className="text-red-500">{errorCreateJob?.message}</p>
        )}

        {loadingCreateJob && <BarLoader width={"100%"} color="#36d7b7" />}
        <Button type="submit" variant="blue" size="lg" className="mt-2 text-white">
          Submit
        </Button>
    </form>
  </div>
 );
};

export default PostJob;
