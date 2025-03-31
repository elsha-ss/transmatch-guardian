
import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  description?: string;
  colorClass?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  description,
  colorClass = "bg-white" 
}: StatCardProps) => {
  const isPositiveChange = change !== undefined && change >= 0;
  
  return (
    <div className={cn("rounded-lg p-5 shadow-sm", colorClass)}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "flex items-center text-xs font-medium",
                isPositiveChange ? "text-green-600" : "text-red-600"
              )}>
                {isPositiveChange ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">from last month</span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          )}
        </div>
        
        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-guardian-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
