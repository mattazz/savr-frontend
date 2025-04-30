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
} from "@/components/ui/alert-dialog";
import { useUser } from "@/utils/hooks";

const LogoutButton = ({
  children,
  triggerClassName = "",
}: {
  children: React.ReactNode;
  triggerClassName?: string;
}) => {
  const { logout } = useUser();

  return (
    <AlertDialog>
      <AlertDialogTrigger className={triggerClassName}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do You Really Want To Logout?</AlertDialogTitle>
          <AlertDialogDescription>
            Your session will be cleared and you will be logged out.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
