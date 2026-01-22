import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 p-6">
          <div className="bg-primary/30 rounded-full p-4">
            <ZapIcon className="size-10 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Rate Limit Reached</h3>
            <p className="text-base-content mb-1">
              You've made too many requests in a short period. Please try again
              later!
            </p>
            <p className="text-base-content/70 text-sm">
              Try again in a few seconds for the best experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
