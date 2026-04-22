"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { assignRoleAction } from "@/actions/admin/user.action";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const schema = z.object({
  roleId: z.string().min(1, "Role is required"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    roleId: string;
  } | null;
  roles: {
    id: string;
    name: string;
  }[];
  open: boolean;
  onClose: () => void;
};

export default function ChangeRoleModal({ user, roles, open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      roleId: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        roleId: user.roleId,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: FormValues) => {
    if (!user) return;
    setLoading(true);
    try {
      await assignRoleAction(user.id, data.roleId);
      toast.success("User role updated successfully");
      onClose();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm font-medium text-gray-700">User: {user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Role
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
