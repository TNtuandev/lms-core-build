import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChapter: (title: string, summary: string) => void;
}

export default function AddChapterModal({
  isOpen,
  onClose,
  onAddChapter,
}: AddChapterModalProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = () => {
    if (title.trim() !== "") {
      onAddChapter(title, summary);
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setSummary("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[580px] bg-white p-0 rounded-lg">
        <DialogHeader className="p-6 pb-4 border-b border-[#919EAB52] text-left">
          <DialogTitle className="text-lg text-left font-medium text-gray-900">
            Thêm chủ đề
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-5">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700 block mb-1.5">
              Tiêu đề
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tiêu đề"
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="summary" className="text-sm font-medium text-gray-700 block mb-1.5">
              Tóm tắt
            </Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Tóm tắt"
              className="w-full"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter className="px-6 py-4 flex justify-end space-x-3 rounded-b-lg border-t border-[#919EAB52]">
          <Button
            type="button"
            size="sm"
            onClick={handleClose}
            className="bg-[#FFF1F1] hover:bg-[#FEE2E2] text-[#E53935]"
          >
            Hủy bỏ
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Thêm chủ đề
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 