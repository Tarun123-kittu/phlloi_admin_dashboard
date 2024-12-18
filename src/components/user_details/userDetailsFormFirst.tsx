import React from 'react';
import { UserProfile } from '../../types/UserProfile';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const UserDetailsFormFirst = ({ userData }: { userData: UserProfile }) => {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6  shadow-lg mx-auto  border border-gray-200 rounded-lg dark:border-gray-700">
      <form className="font-[sans-serif] mx-auto w-full ">
        <div className="grid sm:grid-cols-2 gap-8">
          {userData?.profile_verification_image && (
            <div className="relative bg-white dark:bg-gray-700 p-4 flex justify-center items-center">
              <div className="p-4">
                <img
                  width={400}
                  height={400}
                  src={userData.profile_verification_image}
                  alt="Profile Verification"
                  className="w-[400px] h-[400px] object-cover"
                />
              </div>
            </div>
          )}

          {userData?.images?.length > 0 && (
            <div className="relative ">
              <div className='bg-white dark:bg-gray-700 p-5 mb-6 rounded-lg' >
              <Carousel showThumbs={false} infiniteLoop autoPlay>
                {userData.images.map((image, i) => (
                  <div key={i}>
                    <img
                      className="w-full h-[420px] object-cover rounded-lg"
                      src={image?.url}
                      alt={`Slide ${i + 1}`}
                    />
                  </div>
                ))}
              </Carousel>
              </div>
              <div className="grid sm:grid-cols-1 gap-4">
                  {/* Username Field */}
                    <div className="relative mb-2">
                        <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-300">
                          Username
                        </label>
                        <input
                          id="username"
                          type="text"
                          value={userData?.username || ''}
                          readOnly
                          style={{ borderRadius: '10px' }}
                          className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
                          />

                    </div>

                    {/* Mobile Number Field */}
                    <div className="relative mb-2">
                        <label htmlFor="mobile" className="text-sm text-gray-700 dark:text-gray-300">
                          Mobile Number
                        </label>
                        <input
                          id="mobile"
                          type="text"
                          value={userData?.mobile_number || ''}
                          readOnly
                          style={{ borderRadius: '10px' }}
                          className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
                        />
                    </div>

              </div>
            </div>
            
          )}

          <div className="grid sm:grid-cols-1 gap-y-4">
             {/* Email Field */}
             <div className="relative mb-2">
              <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={userData?.email || ''}
                readOnly
                style={{ borderRadius: '10px' }}
                className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
              />
            </div>
           
            {/* Date of Birth */}
            <div className=" relative mb-2">
              <label htmlFor="dob" className="text-sm text-gray-700 dark:text-gray-300">
                Date of Birth
              </label>
              <input
                id="dob"
                type="text"
                value={userData?.dob || ''}
                readOnly
                style={{ borderRadius: '10px' }}
                className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
              />
            </div>

            {/* Interested To See */}
            <div className="relative mb-2">
              <label htmlFor="interested" className="text-sm text-gray-700 dark:text-gray-300">
                Interested To See
              </label>
              <input
                id="interested"
                type="text"
                value={userData?.intrested_to_see || ''}
                readOnly
                style={{ borderRadius: '10px' }}
                className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
              />
            </div>

            {/* Online Status */}
            <div className="relative mb-2">
              <label htmlFor="onlineStatus" className="text-sm text-gray-700 dark:text-gray-300">
                Online Status
              </label>
              <input
                id="onlineStatus"
                type="text"
                value={userData?.online_status ? 'True' : 'False'}
                readOnly
                style={{ borderRadius: '10px' }}
                className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
              />
            </div>

            {/* Distance Preference */}
            <div className="relative mb-2">
              <label htmlFor="distance" className="text-sm text-gray-700 dark:text-gray-300">
                Distance Preference
              </label>
              <input
                id="distance"
                type="text"
                value={userData?.distance_preference || ''}
                readOnly
                style={{ borderRadius: '10px' }}
                className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
              />
            </div>

            {/* Subscription Type */}
            <div className="relative mb-2">
              <label htmlFor="subscription" className="text-sm text-gray-700 dark:text-gray-300">
                Subscription Type
              </label>
              <input
                id="subscription"
                type="text"
                value={userData?.subscription_type || ''}
                readOnly
                style={{ borderRadius: '10px' }}
                className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
              />
            </div>

            {/* Gender */}
            <div className="relative mb-2">
              <label htmlFor="gender" className="text-sm text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <input
                id="gender"
                type="text"
                value={userData?.gender || ''}
                readOnly
                style={{ borderRadius: '10px' }}
                className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsFormFirst;
