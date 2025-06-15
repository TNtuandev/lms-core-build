import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {Rating, RoundedStar} from "@smastrom/react-rating";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rating: number, comment: string) => void;
}

export const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9',
  size: 20,
}

export const ReviewDialog: React.FC<ReviewDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[440px] lg:w-[600px]">
        <DialogHeader className="items-start">
          <DialogTitle className="text-lg">Đánh giá</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 items-center">
          <div className="">Đánh giá của bạn về sản phẩm này</div>
        </div>
        <Rating
          className=""
          style={{maxWidth: 100}}
          value={5}
          readOnly
          itemStyles={myStyles}/>
        <div className="mb-4">
          <textarea
            className="w-full p-3 border-zinc-300 border rounded-xl resize-none focus:outline-none"
            rows={4}
            maxLength={300}
            placeholder="Viết nhận xét"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="text-right text-gray-400 text-sm">{comment.length}/300</div>
        </div>
        <DialogFooter className="flex">
          <DialogClose asChild className="w-fit">
            <Button variant="outline" className="h-9 border-zinc-300 hover:border-zinc-300 text-primary font-semibold round-[10px]">
              Hủy bỏ
            </Button>
          </DialogClose>
          <Button
            className="bg-primary font-semibold w-fit h-9  round-[10px] bg-[#212B36] text-white hover:bg-[#2F57EF] transition-colors duration-300"
            onClick={() => {
              onSubmit(rating, comment);
              setComment("");
              setRating(5);
            }}
            disabled={!comment}
          >
            Đăng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};