import Image from "next/image";
import userProfile from "@/assets/images/user.png";

export function TestimonialCard() {
  return (
    <div className="border-2 rounded-2xl p-3 flex flex-col gap-5 min-w-[80vw] sm:min-w-[35vw] sm:max-w-[35vw] lg:min-w-[20vw] lg:max-w-[20vw]  custom-shadow cursor-pointer">
      <span className="flex gap-3 items-center">
        <Image src={userProfile} alt="user profile" className="h-12 w-fit" />
        <span className="flex flex-col">
          <h3 className="font-semibold">Theresa Webb</h3>
          <p className="text-sm">Web development bootcamp</p>
        </span>
      </span>
      <p className="text-sm sm:text-base lg:leading-5">
        With Gurukul Business employees were able to marry the two together,
        technology and consultant soft skills... to help drive their careers
        forward.
      </p>
    </div>
  );
}
