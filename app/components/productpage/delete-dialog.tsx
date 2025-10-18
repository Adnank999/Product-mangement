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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface Props {
    handleDelete: (id: string) => Promise<void>;
    deleteLoading: boolean;
    productId: string;
}

export function DeleteDialog({ productId, handleDelete, deleteLoading }: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="rounded-full bg-red-500/70 text-foreground hover:bg-red-500 transition-colors">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the selected Product
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>

                    <AlertDialogAction className="bg-red-500/70 text-foreground" onClick={() => handleDelete(productId)} disabled={deleteLoading} > {deleteLoading ? "Deleting..." : "Yes, Delete"}</AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
