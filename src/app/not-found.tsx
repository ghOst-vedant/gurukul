import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-red text-3xl font-semibold">404 Page not found</h1>
      <p className="text-2xl font-semibold text-black">
        Return to{" "}
        <Link href="/" className="text-green hover:underline">
          Homepage
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
