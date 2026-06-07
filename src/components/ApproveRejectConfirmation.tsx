import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface IProps {
  children: ReactNode;
  onApprove: () => void;
  onReject: () => void;
}

export default function ApproveRejectConfirmation({
  children,
  onApprove,
  onReject,
}: IProps) {
  const approveCompany = () => {
    console.log("Approved!");
    onApprove();
  };

  const rejectCompany = () => {
    console.log("Rejected!");
    onReject();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Review Company</AlertDialogTitle>
          <AlertDialogDescription>
            Choose whether to approve or reject this company.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={rejectCompany}>Reject</AlertDialogCancel>
          <AlertDialogAction onClick={approveCompany}>
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
