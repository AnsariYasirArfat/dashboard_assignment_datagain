"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/store/hook";
import {
  addAppealLetter,
  updateAppealLetter,
} from "@/store/reducers/appealLetterSlice";
import { useRouter } from "next/navigation";
import {
  AppealData,
  stateCodes,
  statusOptions,
  formatDateForInput,
  parseDisplayDate,
  StateCode,
} from "@/data/appeal-letter";

// Validation schema
const schema = yup.object({
  taxYear: yup.string().required("Tax Year is required"),
  company: yup
    .string()
    .required("Company is required")
    .min(2, "Company must be at least 2 characters")
    .max(100, "Company must not exceed 100 characters"),
  state: yup
    .string()
    .required("State is required")
    .oneOf(stateCodes, "Please select a valid state"),
  assessor: yup
    .string()
    .required("Assessor is required")
    .min(2, "Assessor must be at least 2 characters")
    .max(100, "Assessor must not exceed 100 characters"),
  accountNumber: yup
    .string()
    .required("Account Number is required")
    .min(1, "Account Number must be at least 1 character")
    .max(50, "Account Number must not exceed 50 characters"),
  appealedDate: yup.string().required("Appealed Date is required"),
  status: yup
    .string<"NOTSENT" | "SENT">()
    .required("Status is required")
    .oneOf(["NOTSENT", "SENT"], "Please select a valid status"),
  appealedBy: yup
    .string()
    .required("Appealed By is required")
    .min(2, "Appealed By must be at least 2 characters")
    .max(50, "Appealed By must not exceed 50 characters"),
});

interface AppealLetterFormProps {
  mode: "add" | "edit";
  initialData?: AppealData;
}

export function AppealLetterForm({ mode, initialData }: AppealLetterFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  console.log("initial data: ", initialData);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      taxYear: initialData?.taxYear ?? "",
      company: initialData?.company ?? "",
      state: initialData?.state ?? ("" as StateCode),
      assessor: initialData?.assessor ?? "",
      accountNumber: initialData?.accountNumber ?? "",
      appealedDate: initialData
        ? formatDateForInput(initialData.appealedDate)
        : "",
      status: initialData?.status ?? ("NOTSENT" as const),
      appealedBy: initialData?.appealedBy ?? "",
    },
  });

  const onSubmit = async (data: Omit<AppealData, "id">) => {
    try {
      const formData = {
        ...data,
        appealedDate: parseDisplayDate(data.appealedDate),
      };

      if (mode === "add") {
        dispatch(addAppealLetter(formData));
        router.push("/");
      } else if (mode === "edit" && initialData) {
        dispatch(updateAppealLetter({ ...formData, id: initialData.id }));
        router.push("/");
      }
    } catch (error) {
      console.error("Error saving appeal letter:", error);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  // Generate tax year options
  const currentYear = new Date().getFullYear();
  const taxYearOptions = Array.from({ length: currentYear - 1899 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tax Year */}
        <div className="space-y-2">
          <Label htmlFor="taxYear">Tax Year *</Label>
          <Controller
            name="taxYear"
            control={control}
            // defaultValue={
            //   mode === "edit" && initialData ? initialData.taxYear : ""
            // }
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={errors.taxYear ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select tax year" />
                </SelectTrigger>
                <SelectContent>
                  {taxYearOptions.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.taxYear && (
            <p className="text-red-500 text-sm">{errors.taxYear.message}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            {...register("company")}
            placeholder="Enter company name"
            maxLength={100}
            className={errors.company ? "border-red-500" : ""}
            defaultValue={
              mode === "edit" && initialData ? initialData.company : ""
            }
          />
          {errors.company && (
            <p className="text-red-500 text-sm">{errors.company.message}</p>
          )}
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Controller
            name="state"
            control={control}
            defaultValue={
              mode === "edit" && initialData
                ? initialData.state
                : ("" as StateCode)
            }
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {stateCodes.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>

        {/* Assessor */}
        <div className="space-y-2">
          <Label htmlFor="assessor">Assessor *</Label>
          <Input
            id="assessor"
            {...register("assessor")}
            placeholder="Enter assessor name"
            maxLength={100}
            className={errors.assessor ? "border-red-500" : ""}
            defaultValue={
              mode === "edit" && initialData ? initialData.assessor : ""
            }
          />
          {errors.assessor && (
            <p className="text-red-500 text-sm">{errors.assessor.message}</p>
          )}
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number *</Label>
          <Input
            id="accountNumber"
            {...register("accountNumber")}
            placeholder="Enter account number"
            maxLength={50}
            className={errors.accountNumber ? "border-red-500" : ""}
            defaultValue={
              mode === "edit" && initialData ? initialData.accountNumber : ""
            }
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-sm">
              {errors.accountNumber.message}
            </p>
          )}
        </div>

        {/* Appealed Date */}
        <div className="space-y-2">
          <Label htmlFor="appealedDate">Appealed Date *</Label>
          <Input
            id="appealedDate"
            type="date"
            {...register("appealedDate")}
            className={errors.appealedDate ? "border-red-500" : ""}
            defaultValue={
              mode === "edit" && initialData
                ? formatDateForInput(initialData.appealedDate)
                : ""
            }
          />
          {errors.appealedDate && (
            <p className="text-red-500 text-sm">
              {errors.appealedDate.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Controller
            name="status"
            control={control}
            defaultValue={
              mode === "edit" && initialData ? initialData.status : "NOTSENT"
            }
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={errors.status ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Appealed By */}
        <div className="space-y-2">
          <Label htmlFor="appealedBy">Appealed By *</Label>
          <Input
            id="appealedBy"
            {...register("appealedBy")}
            placeholder="Enter name"
            maxLength={50}
            className={errors.appealedBy ? "border-red-500" : ""}
            defaultValue={
              mode === "edit" && initialData ? initialData.appealedBy : ""
            }
          />
          {errors.appealedBy && (
            <p className="text-red-500 text-sm">{errors.appealedBy.message}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-custom-teal hover:bg-custom-teal/90"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "add"
            ? "Add Appeal Letter"
            : "Update Appeal Letter"}
        </Button>
      </div>
    </form>
  );
}
