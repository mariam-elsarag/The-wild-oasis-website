"use client";
import { updateProfile } from "@/app/_lib/actions";
import { profileSchema } from "@/app/_utils/zodSchemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import SpinnerMini from "../../feedback/SpinnerMini";
import { useState } from "react";

const UpdateProfileForm = ({ guest, countries }) => {
  const { fullName, email, nationalId, nationality } = guest;
  const [flag, setFlage] = useState(
    countries.find((country) => country.name === nationality)?.flag ?? ""
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nationalId: nationalId,
      nationality: nationality,
    },
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    const result = await updateProfile({ ...data, countryFlag: flag });
    if (result?.status === "error") {
      toast.error(result?.message);
    } else {
      toast.success(result?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-primary-900 py-8 px-6 md:px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <Input name="fullName" disabled defaultValue={fullName} />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <Input name="email" disabled defaultValue={email} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <Image
            src={flag}
            alt="Country flag"
            height={20}
            width={25}
            className="h-5 rounded-sm"
          />
        </div>
        <Controller
          name="nationality"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
                const country = countries.find((c) => c.name === val);
                setFlage(country?.flag ?? "");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {countries.map((c) => (
                    <SelectItem key={c.name} value={c?.name}>
                      <Image src={c.flag} alt={c.name} width={20} height={15} />
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors?.nationality && (
          <p className="text-destructive text-xs">
            {errors?.nationality?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalId">National ID number</label>
        <Controller
          name="nationalId"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.nationalId && (
          <p className="text-destructive text-xs">
            {errors.nationalId.message}
          </p>
        )}
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <SpinnerMini />}
          Update profile
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
