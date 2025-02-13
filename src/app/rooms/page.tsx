
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProfileBox from "@/components/ProfileBox";
import UserTable from "@/components/Tables/UserTable";
import AllRooms from "@/components/settings/AllRooms";

export const metadata: Metadata = {
  title: "Rooms List",
  description: "Rooms List",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full">
        <AllRooms />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
