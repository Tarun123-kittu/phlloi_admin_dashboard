import React from "react";
import SlugDetails from "@/components/slugs/SlugDetails";
import { Metadata } from "next";


async function fetchSlugData(slugName: string) {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}get_page_by_slug?slug=${slugName}`
  );

  if (!response.ok) {
    return null; 
  }

  const data = await response.json();
  if (data.type === "success") {
    return data.data; 
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: { slugName: string };
}): Promise<Metadata> {
  const slugData = await fetchSlugData(params.slugName);

  if (!slugData) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  return {
    title: slugData.title,
    description: slugData.content.substring(0, 160), // Example: first 160 chars
  };
}

const Page = ({ params }: { params: { slugName: string } }) => {
  const { slugName } = params;
  return <SlugDetails slugName={slugName} />;
};

export default Page;
