'use client';

import React, { useState, useEffect, useRef } from 'react';
import { get_maximum_distance, clear_max_distance_state } from '@/redux/slices/settinsSlice/distanceSlice/getMaximumDistance';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { update_max_distance, clearUpdateState } from '@/redux/slices/settinsSlice/distanceSlice/updateMaxDistance';
import toast from 'react-hot-toast';
import Loader from '../loader/Loader';

const MaxDistanceRange = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [maxDistance, setMaxDistance] = useState<number>(300);
  const [rangeValue, setRangeValue] = useState<number>(0);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); 

  useEffect(() => {
    dispatch(get_maximum_distance());
  }, [dispatch]);

  const maxDistanceData = useSelector((state: RootState) => state.MAXIMUN_DISTANCE);
  const updateMaxDistance = useSelector((state: RootState) => state.UPDATE_MAX_DISTANCE);

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
    }, 300);
  };

  const rangeBackground = {
    background: `linear-gradient(to right, #4caf50 ${Math.min(
      (rangeValue / maxDistance) * 100,
      100
    )}%, #d3d3d3 ${Math.min((rangeValue / maxDistance) * 100, 100)}%)`,
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
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Maximum Distance Range
      </label>
      {maxDistanceData?.isLoading || updateMaxDistance?.isLoading ? (
        <h1 className="font-bold text-center">Please wait...</h1>
      ) : (
        <input
          id="max-distance-range"
          type="range"
          value={rangeValue}
          max={maxDistance}
          onChange={handleRangeChange}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={rangeBackground}
        />
      )}
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        Selected Distance: {rangeValue} / {maxDistance} km
      </p>
    </div>
  );
};

export default MaxDistanceRange;
