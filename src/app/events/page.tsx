import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Events from "@/components/Events/events";

export const metadata: Metadata = {
  title: "Events List",
  description: "Events List",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <Events />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
