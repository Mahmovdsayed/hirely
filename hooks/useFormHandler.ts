import { useState } from "react";
import {
  useForm,
  FieldValues,
  DefaultValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosRequestConfig } from "axios";
import { ZodTypeAny } from "zod";
import { toast } from "sonner";

interface UseFormHandlerOptions<T extends FieldValues> {
  schema: ZodTypeAny;
  endpoint?: string;
  method?: "post" | "patch" | "put" | "delete";
  service?: (data: T) => Promise<any>;
  defaultValues?: DefaultValues<T>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  payloadType?: "json" | "form-data";
}

export function useFormHandler<T extends FieldValues>({
  schema,
  endpoint,
  method = "post",
  service,
  defaultValues,
  onSuccess,
  onError,
  payloadType = "json",
}: UseFormHandlerOptions<T>) {
  const [loading, setLoading] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submitHandler: SubmitHandler<T> = async (data) => {
    try {
      setLoading(true);

      let payload: any = data;
      let headers: AxiosRequestConfig["headers"] = {};

      if (payloadType === "form-data") {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (value == null) return;

          if (value instanceof File) {
            formData.append(key, value);
          } else if (value instanceof FileList) {
            Array.from(value).forEach((file) => formData.append(key, file));
          } else {
            formData.append(key, String(value));
          }
        });

        payload = formData;
        headers = { "Content-Type": "multipart/form-data" };
      }

      const res = service
        ? await service(payload)
        : await axios({
            method,
            url: endpoint!,
            data: payload,
            headers,
          });

      const responseData = res?.data ?? res;

      toast.success(responseData?.message || "Success");
      form.reset();
      onSuccess?.(responseData);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error?.message || "Request failed",
      );
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = form.handleSubmit(submitHandler);

  return {
    ...form,
    onSubmit,
    loading,
  } as UseFormReturn<T> & {
    onSubmit: (e?: unknown) => Promise<void>;
    loading: boolean;
  };
}
