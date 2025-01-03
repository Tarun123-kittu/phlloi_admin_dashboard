import ViewPages from "@/components/viewPages/ViewPages";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

const ViewPage = ({ params }: { params: { pageId: string } }) => {
    const { pageId } = params;
    return (
        <div>
            <DefaultLayout>
                <div className="mx-auto w-full">
                    <ViewPages sectionId={pageId} />
                </div>
            </DefaultLayout>
        </div >
    )
}

export default ViewPage
