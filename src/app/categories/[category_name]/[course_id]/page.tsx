//Course page (what the user will get)
type Params = {
  category_name: string;
  course_id: string;
};
const Page = ({ params }: { params: Params }) => {
  const { category_name, course_id } = params;
  return (
    <div className="py-12 px-8 ">
      <p className="text-xl">Category: {category_name}</p>
      <p className="text-sm">CourseId: {course_id}</p>
    </div>
  );
};

export default Page;
