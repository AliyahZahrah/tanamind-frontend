'use client';

import { useGoogleAuth } from '../../hooks/use-google-auth';

const AuthCallback = () => {
  const {} = useGoogleAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6db1934c]">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Completing sign-in...
        </h2>
        <p className="text-gray-600">
          Please wait while we finish setting up your account.
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
