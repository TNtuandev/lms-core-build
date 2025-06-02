import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes/routes";
import { QRCodeSVG } from 'qrcode.react';
import { ICart, useCartStore } from "@/store/slices/cart.slice";
import {formatCurrency} from "@/lib/utils";

interface ICheckoutStep {
  cartData?: ICart[];
}

export default function CheckoutStepFinalDesktop({ cartData }: ICheckoutStep) {
  const { orderId, qrCodeUrl } = useCartStore();
  const router = useRouter();

  const handleNavigateToHome = () => {
    router.push(Routes.home);
  };

  const totalPrice = useMemo(() => {
    return cartData?.reduce((total, item) => {
      return total + item?.price;
    }, 0);
  }, [cartData]);

  return (
    <div className="flex gap-[40px] w-full px-[5%] mb-[100px] lg:flex-row flex-col">
      <div className="w-full lg:w-[75%] h-max">
        <div className="w-full h-max mb-5">
          <div className="text-2xl font-semibold mb-[12px]">
            Thông tin khách hàng
          </div>
          <div className="text-sm">
            <div className="flex gap-[20px] items-center mb-2">
              <div className="w-[100px] text-[#71717B]">Tên</div>
              <div className="font-semibold">Trần Lâm</div>
            </div>
            <div className="flex items-center gap-[20px] mb-2">
              <div className="w-[100px] text-[#71717B]">Điện thoại</div>
              <div className="font-semibold">03456222468</div>
            </div>
            <div className="flex items-center gap-[20px] mb-2">
              <div className="w-[100px] text-[#71717B]">Email</div>
              <div className="font-semibold">tranlam.designer@gmail.com</div>
            </div>
            <div className="flex items-center gap-[20px] mb-2">
              <div className="w-[100px] text-[#71717B]">
                Phương thức thanh toán
              </div>
              <div className="font-semibold text-[#00B8DB] bg-[#00B8DB14] p-2 rounded-lg">
                Quét QR CODE
              </div>
            </div>
            <div className="flex items-center gap-[20px] mb-2">
              <div className="w-[100px] text-[#71717B]">
                Trạng thái thanh toán
              </div>
              <div className="font-semibold text-[#EFB100] bg-[#EFB10029] p-2 rounded-lg">
                Chờ giải quyết
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-max bg-gray-100 rounded-lg p-[24px] mb-5">
          <div className="text-2xl font-semibold mb-[12px]">
            Mã đơn hàng: #RDF-00001
          </div>
          <div className="border-b pb-2 border-b-[#E4E4E7]">
            {cartData?.map((it, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex gap-2 items-center font-semibold">
                  <img
                    className="h-12 w-16 rounded-sm"
                    src={it.imageUrl}
                    alt=""/>
                  <div className="text-sm">{it?.name}</div>
                </div>
                <div className="py-3 px-4 font-semibold text-[#27272A] text-sm">
                  <div>
                    <div>{formatCurrency(it?.price)}</div>
                    <div className="font-normal text-[#71717B] line-through">
                      {formatCurrency(it?.originalPrice)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="text-sm font-medium">Tổng tiền</div>
            <div className="text-xl text-[#FF6900] font-semibold">
              {formatCurrency(totalPrice)}đ
            </div>
          </div>
        </div>
        <Button
          onClick={handleNavigateToHome}
          className="text-white px-4 py-2 rounded-lg"
        >
          Tiếp tục mua sắm
        </Button>
      </div>
      <div>
        <div className="bg-[#00B8DB14] p-[24px] flex justify-between rounded-xl">
          <div className={`mt-3 text-center`}>
            <span>
              Mở ứng dụng Internet banking và chọn{" "}
              <span className="font-bold">Quét mã</span>
            </span>
            <div className="flex gap-[32px] mt-4 justify-center items-center flex-col md:flex-row">
              {            qrCodeUrl && (
                <QRCodeSVG
                  value={qrCodeUrl}
                  size={128}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  minVersion={4}
                  imageSettings={{
                    src: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
                    height: 24,
                    width: 24,
                    opacity: 1,
                    excavate: true,
                  }}
                />
              )}
              {/*<div className="flex flex-col gap-2">*/}
              {/*  <span>*/}
              {/*    Tài khoản VP Bank:{" "}*/}
              {/*    <span className="font-semibold">03363826286</span>*/}
              {/*  </span>*/}
              {/*  <span>*/}
              {/*    Tên: <span className="font-semibold">Readify</span>*/}
              {/*  </span>*/}
              {/*  <span>*/}
              {/*    Số tiền: <span className="font-semibold">198.000đ</span>*/}
              {/*  </span>*/}
              {/*  <span>*/}
              {/*    Lời nhắn: <span className="font-semibold">YZ6GJ</span>*/}
              {/*  </span>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
