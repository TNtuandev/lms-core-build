import { Title } from "@/components/common/Title";
import { ArrowRight, Designtools } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { EXPLORE } from "@/contants/home";

export function Explore() {
  return (
    <div className="flex flex-col items-center">
      <Title
        label="Khám Phá"
        title="Học cùng chúng tôi ở bất cứ đâu"
        subTitle="Giáo dục trực tuyến đã giúp giáo dục chất lượng dễ tiếp cận hơn với nhiều đối tượng học viên hơn. Nó xóa bỏ các rào cản như giới hạn địa lý."
      />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 lg:gap-8 mt-8 w-full">
        {
          EXPLORE.map((item) => (
            <div key={item.id}
                 style={{borderColor: `${item.color}1F`}}
                 className="box-shadow-hover cursor-pointer py-8 px-12 border-[1px] rounded-2xl flex flex-col items-center">
              <div
                style={{backgroundColor: `${item.color}1F`,}}
                className={clsx("rounded-2xl p-4 flex items-center justify-center")}>
                <Designtools
                  size="32"
                  color={item.color}
                />
              </div>
              <div className="text-2xl font-bold mt-4">
                {item.title}
              </div>
              <div className="text-center text-sm mt-6 ">
                {item.subTitle}
              </div>
              <div className="flex-grow"/>
              <Button
                style={{color: item.color}}
                variant="ghost" className={clsx("mt-4 font-bold justify-self-end")}>
                {item.buttonLabel} <ArrowRight size={20} color={item.color}/>
              </Button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
