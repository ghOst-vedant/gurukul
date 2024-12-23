import { Student } from "./Student";
import { Teacher } from "./Teacher";

//Profile page of user (include teacher as well as student). Use conditions to render thing. For eg: is teacher or student, is own profile or someone else to give access to edit things.
type Params = {
  profile_id: string;
};
const Page = ({ params }: { params: Params }) => {
  const { profile_id } = params;
  // const isA = "Student";
  return (
    <div className="p-5 pb-16 pt-28 sm:p-12 sm:pt-28 lg:p-[3vw] lg:pb-24 lg:pt-32">
      {profile_id === "teacher" ? <Teacher /> : <Student />}
    </div>
  );
};

export default Page;
