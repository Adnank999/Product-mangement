'use client'
import Link from 'next/link';
import { Button } from "@/components/ui/button"; // assuming you have a Button component
import { usePathname } from 'next/navigation';

const AddProductLink = () => {
    const pathname = usePathname();

    return (
        <Link href={`${pathname}/create`}>
            <Button variant="default" className='rounded-full'>
                Add Product
            </Button>
        </Link>
    );
};

export default AddProductLink;
