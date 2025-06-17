interface ItemResultProps {
  status?: "overview" | "submit" | "submit-active" | "submit-not-active";
}

export default function ItemResult(props: ItemResultProps) {
  const { status = "overview" } = props;

  const renderClassName = () => {
    switch (status) {
      case "overview":
        return "w-full p-6 bg-white rounded-2xl border border-dashed border-gray-100 mt-4";
      case "submit":
        return "w-full p-6 bg-white rounded-2xl border border-dashed border-gray-100 mt-4";
      case "submit-active":
        return "w-full p-6 bg-[#4CAF5014] rounded-2xl border border-dashed border-success mt-4";
      case "submit-not-active":
        return "w-full p-6 bg-[#F4433614] rounded-2xl border border-dashed border-error-main mt-4";
      default:
        return "";
    }
  };

  return (
    <div className={renderClassName()}>
      <div className="flex justify-between">
        <div>
          <div className="text-lg font-semibold">Điểm của bạn</div>
          <div className="text-sm font-normal text-secondary">
            {status === "submit-active" || status === "submit-not-active"
              ? "Chúng tôi sẽ lưu lại điểm cao nhất của bạn."
              : "Bạn chưa nộp bài này"}
          </div>
          <div className="flex items-center gap-8 mt-4">
            <div
              className={`text-3xl font-bold ${status === "submit-active" && "text-success"} ${status === "submit-not-active" && "text-error-main"}`}
            >
              --
            </div>
          </div>
        </div>
        {status !== "overview" && (
          <div
            role="presentation"
            className="cursor-pointer border border-gray-200 h-max px-4 py-2 rounded-xl font-semibold text-sm"
          >
            Xem lại bài
          </div>
        )}
      </div>
    </div>
  );
}
