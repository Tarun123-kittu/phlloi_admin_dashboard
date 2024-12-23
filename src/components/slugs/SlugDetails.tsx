"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AppDispatch, RootState } from "@/redux";
import { useDispatch } from "react-redux";
import { UseSelector } from "react-redux";
import { get_slug_details } from "@/redux/slices/pagesSlice/getSlugDetails";
import { useSelector } from "react-redux";

const SlugDetails = ({ slugName }: { slugName: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [slug_data, setSlug_data] = useState<any>();
  const slug_details = useSelector((store: RootState) => store.SLUG_DETAILS);
  console.log(slug_details, "this is the slug details");
  useEffect(() => {
    dispatch(get_slug_details({ slugName }));
  }, []);

  useEffect(() => {
    if (slug_details?.isSuccess) {
      setSlug_data(slug_details?.data);
    }
  }, [slug_details]);
  return (
    <div>
      <div className="bg-cardBg p-2  text-center">
        <Image
          src="/images/phloii_logo.png"
          className="m-auto"
          alt="logo"
          width={100}
          height={100}
        />
      </div>
      <div className="min-h-screen bg-black  pt-10 pb-10">
        <div
          className="container mx-auto text-white"
          dangerouslySetInnerHTML={{ __html: slug_data?.content || "" }}
        ></div>
      </div>
    </div>
  );
};

export default SlugDetails;
