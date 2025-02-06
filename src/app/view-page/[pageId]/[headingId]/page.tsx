import ViewPageComponent from "@/components/viewPages/ViewPageContent";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

const ViewPageContent = ({ params }: { params: { pageId: string, headingId: string } }) => {
    const { pageId, headingId } = params;
    return (
        <div>
            <DefaultLayout>
                <div className="mx-auto w-full">
                    <ViewPageComponent sectionId={pageId} headingId={headingId} />
                </div>
            </DefaultLayout>
        </div >
    )
}

export default ViewPageContent
