export default function InfoPanel() {
  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-xl mb-8 text-base-content space-y-6">
      <h2 className="font-bold text-2xl text-center">What is evidence?</h2>
      <p className="text-center text-lg text-base-content">
        Evidence consists of data that helps us understand and analyze various
        phenomena
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-wrap items-center space-x-2">
            <span className="w-4 h-4 bg-indigo-600 rounded-full"></span>
            <span className="font-semibold mr-2">Type A:</span>
            <span>Unquestionable Observations</span>
          </div>
          <div className="flex flex-wrap items-center space-x-2">
            <span className="w-4 h-4 bg-emerald-500 rounded-full"></span>
            <span className="font-semibold mr-2">Type B:</span>
            <span>Confirmed Observations</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-wrap items-center space-x-2">
            <span className="w-4 h-4 bg-amber-400 rounded-full"></span>
            <span className="font-semibold mr-2">Type C:</span>
            <span>Observations not universally accepted</span>
          </div>
          <div className="flex flex-wrap items-center space-x-2">
            <span className="w-4 h-4 bg-red-500 rounded-full"></span>
            <span className="font-semibold mr-2">Type D:</span>
            <span>Correspondences with the holy texts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
