import { Title } from "@/components/common/Title";
import { EXPLORE } from "@/contants/home";

export function Explore() {
  return (
    <div className="flex flex-col items-center pt-20">
      <Title
        title="Học cùng chúng tôi ở bất cứ đâu"
        subTitle={
          <div className="text-[#637381] mt-2">
            Môi trường sáng tạo, tương tác giúp bạn yêu môn hóa, <br /> tự tin
            chinh phục kiến thức và phát triển tư duy.
          </div>
        }
      />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:gap-8 mt-8 w-full">
        {EXPLORE.map((item) => (
          <div
            key={item.id}
            style={{ backgroundColor: item.color }}
            className="box-shadow-hover cursor-pointer py-8 px-12 rounded-4xl flex flex-col items-center"
          >
            <div>{item.icon}</div>
            <div className="text-3xl font-bold mt-4">{item.title}</div>
            <div className="text-center text-[#637381] text-sm mt-6 ">
              {item.subTitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
