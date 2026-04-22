"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { createRoleAction } from "@/actions/admin/role.action";


const modules = [
  "Courses",
  "Lessons",
  "Quizzes",
  "Users",
  "Roles",
  "Enrollments",
  "Reports",
];

const schema = z.object({
  name: z.string().min(2, "Role name is required"),
  description: z.string().optional(),
  permissions: z.array(
    z.object({
      module: z.string(),
      canView: z.boolean(),
      canCreate: z.boolean(),
      canEdit: z.boolean(),
      canDelete: z.boolean(),
    })
  ),
});

type FormValues = z.infer<typeof schema>;

const CreateRoleForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      permissions: modules.map((module) => ({
        module,
        canView: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
      })),
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await createRoleAction(data);
      toast.success("Role created successfully");
      reset();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong while creating the role");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl py-6">
      <Card className="shadow-sm border-muted">
        <CardHeader>
          <CardTitle className="text-2xl">Create Role</CardTitle>
          <CardDescription>
            Define a new role and its permissions across various modules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel htmlFor="name">Role Name</FieldLabel>
                <Input id="name" placeholder="e.g. MODERATOR" {...register("name")} />
                <FieldError>{errors.name?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Describe the role's purpose..."
                  className="resize-none"
                  {...register("description")}
                />
                <FieldError>{errors.description?.message}</FieldError>
              </Field>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Permissions Matrix</h3>
                <p className="text-sm text-muted-foreground">
                  Assign granular permissions for each module.
                </p>
              </div>

              <div className="border rounded-md overflow-hidden bg-background">
                <div className="grid grid-cols-5 bg-muted p-4 text-sm font-medium text-center border-b">
                  <div className="text-left">Module</div>
                  <div>View</div>
                  <div>Create</div>
                  <div>Edit</div>
                  <div>Delete</div>
                </div>

                <div className="divide-y divide-border">
                  {modules.map((module, index) => (
                    <div
                      key={module}
                      className="grid grid-cols-5 items-center p-4 text-center hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-left font-medium text-sm">
                        {module}
                      </div>

                      <div className="flex justify-center">
                        <Controller
                          name={`permissions.${index}.canView`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Controller
                          name={`permissions.${index}.canCreate`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Controller
                          name={`permissions.${index}.canEdit`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Controller
                          name={`permissions.${index}.canDelete`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? "Creating Role..." : "Create Role"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRoleForm;
