
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProfileBox from "@/components/ProfileBox";
import UserTable from "@/components/Tables/UserTable";

export const metadata: Metadata = {
  title: "Users List",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full w-full">
        {/* <Breadcrumb pageName="Users" /> */}

        <UserTable />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
