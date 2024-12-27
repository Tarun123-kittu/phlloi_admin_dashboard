"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/poppins.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../redux/AppStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/images/black.svg"
          type="image/svg+xml"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <Toaster position="top-right" reverseOrder={false} toastOptions={{duration:500}} />
          {loading ? <Loader /> : children}
        </Provider>
      </body>
    </html>
  );
}
