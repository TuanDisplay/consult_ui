import { Dispatch, SetStateAction } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '~/components/Button';
import clsx from 'clsx';

interface IPaginationBar {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function PaginationBar({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: IPaginationBar) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mx-auto mt-3 flex w-fit gap-2">
      <Button
        leftIcon={<ChevronLeft />}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disable={currentPage === 1}
        primary
        className="h-10 w-24 font-bold"
      >
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={clsx('h-10 w-10', {
            'opacity-30': currentPage === i + 1,
          })}
          primary
        >
          {i + 1}
        </Button>
      ))}
      <Button
        rightIcon={<ChevronRight />}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disable={currentPage === totalPages}
        primary
        className="h-10 w-24 font-bold"
      >
        Next
      </Button>
    </div>
  );
}
