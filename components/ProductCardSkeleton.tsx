export default function ProductCardSkeleton() {
  return (
    <div className="card-tech rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-slate-800/50"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 bg-slate-700/50 rounded w-1/3"></div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
        </div>
        
        {/* SKU */}
        <div className="h-3 bg-slate-700/50 rounded w-1/4"></div>
        
        {/* Price and Stock */}
        <div className="flex justify-between items-center">
          <div className="h-6 bg-slate-700/50 rounded w-1/3"></div>
          <div className="h-4 bg-slate-700/50 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  )
}