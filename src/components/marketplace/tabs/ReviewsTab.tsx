import React from "react";
import { Star } from "lucide-react";
import { Review, ReviewStats } from "@/types/supplier";

interface ReviewsTabProps {
  reviews: Review[];
  stats: ReviewStats;
}

export const ReviewsTab = ({ reviews, stats }: ReviewsTabProps) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Stats Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Star className="text-amber-400 fill-amber-400" size={24} />
          <h3 className="text-xl font-bold text-gray-900">
            {stats.average} out of 5{" "}
            <span className="text-gray-500 text-base font-normal">
              ({stats.total} reviews)
            </span>
          </h3>
        </div>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-4">
              <span className="text-sm font-medium w-8 text-gray-600">
                {star} star
              </span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${stats.distribution[star] || 0}%` }}
                />
              </div>
              <span className="text-sm text-gray-400 w-8 text-right">
                {stats.distribution[star] || 0}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                {review.user.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900">{review.user}</h4>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
