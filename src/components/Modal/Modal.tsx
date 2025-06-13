import clsx from "clsx";
import Button from "~/components/Button";
import ModalWrapper from "./ModalWrapper";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

interface IModal {
  children: ReactNode;
  className: string;
  setMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  children,
  className = "",
  setMessageModal,
}: IModal) {

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModalHandle = useCallback(() => {
    setMessageModal(false);
  }, [setMessageModal]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModalHandle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [closeModalHandle]);

  return (
    <ModalWrapper>
      <div
        ref={modalRef}
        className={clsx(
          "font-VNPro w-full overflow-hidden overflow-y-auto rounded-lg px-2 py-3",
          className
        )}
      >
        <Button
          className="text text-sm font-medium"
          leftIcon={<ChevronLeft className="h-4 w-4" />}
          onClick={closeModalHandle}
        >
          Quay lại
        </Button>
        {children}
      </div>
    </ModalWrapper>
  );
}
