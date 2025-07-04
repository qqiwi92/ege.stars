import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { P } from "./ui/typography";

export default function What({
  children,
  buttonTitle = "Чё",
  title = "И что здесь делать?",
  okayButtonText = "Понятно",
}: {
  children: React.ReactNode;
  title?: string;
  okayButtonText?: string;
  buttonTitle?: string;
}) {
  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <Button variant="secondary" size={"sm"} className="h-7 px-4 py-0">
          <P className="p-0 text-secondary-foreground ">{buttonTitle}</P>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg pt-10">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <P>{children}</P>
        {okayButtonText && (
          <DialogFooter>
            <Button>
              <P className="text-primary-foreground">Понятно</P>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
