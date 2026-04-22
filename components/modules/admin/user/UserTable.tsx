"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Check, X, UserCog, Ban, RefreshCw, Edit } from "lucide-react";
import { toast } from "sonner";
import { approveUserAction } from "@/actions/admin/user.action";
import RejectModal from "./RejectModal";
import EditUserModal from "./EditUserModal";
import ChangeRoleModal from "@/components/modules/userTable/ChangeRoleModal";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: { id: string; name: string };
  roleId?: string;
  status: "ACTIVE" | "PENDING" | "REJECTED" | "SUSPENDED";
  isSuperAdmin?: boolean;
  createdAt: string;
}

interface UserTableProps {
  data: {
    data: User[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  roles: { id: string; name: string }[];
}

const UserTable = ({ data, roles }: UserTableProps) => {
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [roleUser, setRoleUser] = useState<User | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleApprove = async (id: string) => {
    setLoading(id);
    try {
      await approveUserAction(id);
      toast.success("User approved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to approve user");
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      case "SUSPENDED":
        return <Badge variant="secondary">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.length > 0 ? (
            data.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role?.name}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {user.status === "PENDING" && (
                        <>
                          <DropdownMenuItem
                            onClick={() => handleApprove(user.id)}
                            disabled={loading === user.id}
                          >
                            <Check className="mr-2 h-4 w-4 text-green-600" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser({ id: user.id, name: user.name });
                              setIsRejectModalOpen(true);
                            }}
                          >
                            <X className="mr-2 h-4 w-4 text-red-600" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setEditUser(user);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setRoleUser(user);
                        }}
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        Change Role
                      </DropdownMenuItem>
                      {/* {user.status === "ACTIVE" ? (
                        <DropdownMenuItem onClick={() => toast.info("Suspend UI Placeholder")}>
                          <Ban className="mr-2 h-4 w-4 text-gray-600" />
                          Suspend
                        </DropdownMenuItem>
                      ) : user.status === "SUSPENDED" ? (
                        <DropdownMenuItem onClick={() => toast.info("Reactivate UI Placeholder")}>
                          <RefreshCw className="mr-2 h-4 w-4 text-blue-600" />
                          Reactivate
                        </DropdownMenuItem>
                      ) : null} */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="text-sm text-gray-500">
          Page {data?.meta?.page} of {data?.meta?.totalPages} ({data?.meta?.total} total users)
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(data.meta.page - 1)}
            disabled={data?.meta?.page <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(data.meta.page + 1)}
            disabled={data?.meta?.page >= data?.meta?.totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <EditUserModal
        open={isEditModalOpen}
        setOpen={setIsEditModalOpen}
        user={editUser ? {
          ...editUser,
          roleId: editUser.roleId || editUser.role?.id
        } : null}
        roles={roles}
      />

      <ChangeRoleModal
        user={roleUser ? {
          ...roleUser,
          roleId: roleUser.roleId || roleUser.role?.id
        } : null}
        roles={roles}
        open={!!roleUser}
        onClose={() => setRoleUser(null)}
      />

      <RejectModal
        user={selectedUser}
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
};

export default UserTable;
