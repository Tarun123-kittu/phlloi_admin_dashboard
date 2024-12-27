"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  get_maximum_distance,
  clear_max_distance_state,
} from "@/redux/slices/settinsSlice/distanceSlice/getMaximumDistance";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import {
  update_max_distance,
  clearUpdateState,
} from "@/redux/slices/settinsSlice/distanceSlice/updateMaxDistance";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";
import "./MaxDistance.css";

const MaxDistanceRange = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [maxDistance, setMaxDistance] = useState<number>(300);
  const [rangeValue, setRangeValue] = useState<number>(0);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(get_maximum_distance());
  }, [dispatch]);

  const maxDistanceData = useSelector(
    (state: RootState) => state.MAXIMUN_DISTANCE,
  );
  const updateMaxDistance = useSelector(
    (state: RootState) => state.UPDATE_MAX_DISTANCE,
  );

  useEffect(() => {
    if (maxDistanceData?.isSuccess) {
      dispatch(clearUpdateState());
      dispatch(clear_max_distance_state());
      const max = maxDistanceData?.data?.maximum_distance || 0;
      setRangeValue(max);
    }
  }, [maxDistanceData]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRangeValue = Number(e.target.value);
    setRangeValue(newRangeValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      dispatch(update_max_distance({ maximum_distance: newRangeValue }));
    }, 100);
  };

  const rangeBackground = {
    background: `linear-gradient(
      to right,
      #FBB90D ${Math.min((rangeValue / maxDistance) * 50, 50)}%, 
      #22EBFF ${Math.min((rangeValue / maxDistance) * 100, 100)}%, 
      #d3d3d3 ${Math.min((rangeValue / maxDistance) * 100, 100)}%
    )`,
  };

  useEffect(() => {
    if (updateMaxDistance?.isSuccess) {
      dispatch(clearUpdateState());
      dispatch(get_maximum_distance());
    }
  }, [updateMaxDistance]);

  return (
    <div>
      <label
        htmlFor="max-distance-range"
        className=" mb-2 block flex justify-between text-sm font-medium text-white dark:text-white"
      >
        <p> Maximum Distance Range</p>
        <p className=" text-sm text-white dark:text-gray-300">
          Selected Distance: {rangeValue} / {maxDistance} km
        </p>
      </label>
      <div className="flex gap-2 items-center">
        <input
          id="max-distance-range"
          type="range"
          value={rangeValue}
          max={maxDistance}
          onChange={handleRangeChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg"
          style={rangeBackground}
        />
        {updateMaxDistance?.isLoading ||
          (maxDistanceData?.isLoading && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline h-4 w-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MaxDistanceRange;
