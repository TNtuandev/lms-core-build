"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

interface CoursePricingFormValues {
  isFree: boolean;
  originalPrice: string;
  salePrice: string;
}

interface CoursePricingSectionProps {
  form: UseFormReturn<CoursePricingFormValues>;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CoursePricingSection({
  form,
  isExpanded,
  onToggle,
}: CoursePricingSectionProps) {
  return (
    <Card className="bg-white py-4 shadow-sm border border-gray-200">
      <div
        className="flex items-center justify-between p-4 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-base font-medium text-gray-900">Giá khóa học</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-t-gray-300 space-y-4">
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between p-3 border rounded-lg">
                <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                  Khóa học miễn phí
                </FormLabel>
                <FormControl>
                  <ToggleSwitch
                    value={field.value || false}
                    onChange={field.onChange}
                    color="gray"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="originalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Giá gốc
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        đ
                      </span>
                      <Input
                        placeholder="0,00"
                        className="h-10 pl-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Giá bán
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        đ
                      </span>
                      <Input
                        placeholder="0,00"
                        className="h-10 pl-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
