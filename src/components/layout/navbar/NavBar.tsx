"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Routes } from "@/lib/routes/routes";
import { useAuthContext } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ArrowDown2,
  BagHappy,
  CloseCircle,
  HambergerMenu,
  SearchNormal,
} from "iconsax-react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DropdownMenuItem } from "@/components/ui/menu";
import { NotificationBadge } from "@/components/ui/notification-badge";
import SearchPopup from "@/components/layout/navbar/SearchPopup";
import Link from "next/link";
import {useCartStore} from "@/store/slices/cart.slice";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const { pushToCart } = useCartStore();
  const [timeLeft, setTimeLeft] = useState(3300);
  const [isFlashSale, setIsFlashSale] = useState(pathname === Routes.home);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    // Hàm xử lý bắt phím
    const handleKeyDown = (event: any) => {
      // Kiểm tra xem phím được bấm có phải là Command + K không
      // metaKey đại diện cho phím Command trên MacBook
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        // Ngăn chặn hành vi mặc định của trình duyệt
        event.preventDefault();

        // Mở hoặc đóng command palette
        setOpenSearch((prevState) => !prevState);
      }
    };

    // Thêm event listener khi component được mount
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener khi component bị unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     refetch().then((res) => {
  //       if (res.data) {
  //         setListCart(res.data);
  //       }
  //     });
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    setIsFlashSale(pathname === Routes.home);
  }, [pathname]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🔹 Lấy số giờ, phút, giây từ timeLeft
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const navigateToFlashSale = () => {};

  const navigateToCheckout = () => {
    pushToCart({
      id: "1",
      name: "Sản phẩm mẫu",
      price: 100000,
      salesPrice: 80000,
      originalPrice: 120000,
      imageUrl: "/images/banner-sign-in.png", // Thay bằng đường dẫn hình ảnh thực tế
    })
    router.push(Routes.checkout);
  };

  const navigateToProfile = () => {};

  const handleNavigateToHome = () => {
    router.push(Routes.home);
  };

  const handleNavigateToProduct = (slug: string) => {
    console.log("----slug", slug);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderHeightHeader = useCallback(() => {
    return 0;
  }, []);

  return (
    <div className="">
      {isFlashSale && (
        <motion.div className="bg-gray-900 relative">
          <div
            onClick={() => setIsFlashSale(false)}
            className="cursor-pointer p-2 absolute right-2 lg:top-[50%] lg:translate-y-[-50%] top-2"
          >
            <CloseCircle size="20" color="#FFFFFF" />
          </div>
          <div className="md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto lg:flex-row flex-col flex items-center justify-center px-6 py-2">
            <div
              onClick={navigateToFlashSale}
              className="cursor-pointer flex-row flex gap-1 items-center"
            >
              <span className="text-white lg:text-lg text-base font-semibold py-1 px-2.5 bg-tertiary-main rounded-[10px]">
                Hot
              </span>
              <span className="lg:text-base text-white text-xs pl-4">
                Nhanh tay nhận ưu đãi đến{" "}
                <span className="text-secondary-main"> 20%</span>
              </span>
            </div>
            <div className="flex gap-2 items-center pl-6">
              <span className="text-sm font-semibold text-white">
                KẾT THÚC TRONG
              </span>
              <div className="h-8 w-10 flex items-center justify-center bg-zinc-800 rounded-lg p-1.5 text-xl text-tertiary-light font-semibold">
                {String(hours).padStart(2, "0")}
              </div>
              <div className="h-8 w-10 flex items-center justify-center bg-zinc-800 rounded-lg p-1.5 text-xl text-tertiary-light font-semibold">
                {String(minutes).padStart(2, "0")}
              </div>
              <div className="h-8 w-10 flex items-center justify-center bg-zinc-800 rounded-lg p-1.5 text-xl text-tertiary-light font-semibold">
                {String(seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: scrolled || !isFlashSale ? 0 : renderHeightHeader(),
          opacity: 1,
        }}
        transition={{ duration: 0.2 }}
        className={`fixed left-0 w-full z-50 transition-all bg-primary-main duration-100 ease-in-out ${
          scrolled ? "bg-white/85 backdrop-blur-sm top-0" : "bg-transparent"
        }`}
      >
        <div className="w-full py-2 lg:px-10 px-4">
          <div className="flex justify-between items-center">
            {/* Nav Routes */}
            <div className="flex items-center space-x-4 md:space-x-8">
              <HambergerMenu
                className="block lg:hidden"
                size={24}
                color="#637381"
              />

              <Image
                src="/images/home/img_17.png"
                alt="Logo"
                width={40}
                height={40}
                onClick={handleNavigateToHome}
                className="cursor-pointer block lg:hidden"
              />

              <Image
                src="/images/logo.png"
                alt="Logo"
                width={182}
                height={48}
                onClick={handleNavigateToHome}
                className="cursor-pointer hidden lg:block"
              />

              <DropdownMenu>
                <DropdownMenuTrigger className="hidden lg:block focus-visible:outline-none">
                  <div className="flex gap-2 items-center cursor-pointer">
                    <div>Khám phá</div>
                    <ArrowDown2 size={16} color="#27272A" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={20}
                  alignOffset={-10}
                  className="grid grid-cols-3 grid-rows-3 bg-white border-none"
                >
                  {[1, 2, 4, 3].map((_) => (
                    <DropdownMenuItem key={_} className="block">
                      <Button
                        variant="ghost"
                        className="block w-full text-left text-normal text-text-primary font-normal hover:text-text-primary"
                        onClick={() => handleNavigateToProduct("Khám phá")}
                      >
                        Khám phá
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Buttons */}
            <div className="flex space-x-6 items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div
                    onClick={() => setOpenSearch(true)}
                    className="cursor-pointer hidden lg:flex  bg-zinc-600/4 items-center h-10 px-2 rounded-md space-x-2"
                  >
                    <div>
                      <SearchNormal size={16} color="#71717B" />
                    </div>
                    <span className="p-1 bg-white text-sm rounded shadow">
                      ⌘K
                    </span>
                  </div>
                  {/*<Button size="lg" type="button" variant="ghost">*/}
                  {/*  <Heart size="24" color="#71717B" />*/}
                  {/*</Button>*/}
                  <NotificationBadge label={"1"}>
                    <Button
                      size="lg"
                      type="button"
                      variant="ghost"
                      onClick={navigateToCheckout}
                    >
                      <BagHappy size="24" color="#71717B" />
                    </Button>
                  </NotificationBadge>

                  {/*<NotificationBadge label="0">*/}
                  {/*  <Button size="lg" type="button" variant="ghost">*/}
                  {/*    <Notification size="24" color="#71717B" />*/}
                  {/*  </Button>*/}
                  {/*</NotificationBadge>*/}
                  <Image
                    onClick={navigateToProfile}
                    src={"/images/banner-sign-in.png"} // Đường dẫn đến avatar
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="cursor-pointer rounded-full h-[40px] w-[40px]"
                  />
                </div>
              ) : (
                <>
                  <div
                    onClick={() => setOpenSearch(true)}
                    className="hidden lg:flex cursor-pointer  bg-zinc-600/4 items-center h-10 px-2 rounded-md space-x-2"
                  >
                    <div>
                      <SearchNormal size={16} color="#71717B" />
                    </div>
                    <span className="p-1 bg-white text-sm rounded shadow">
                      ⌘K
                    </span>
                  </div>
                  <Button variant="ghost" className="h-10">
                    <Link href={Routes.login}>Đăng nhập</Link>
                  </Button>
                  <Button
                    variant="default"
                    className="bg-primary-main h-10  shadow-md hover:shadow-xl hover:shadow-primary-main/20 transition-shadow duration-300 text-white px-4 py-1.5 rounded-[10px]"
                  >
                    <Link href={Routes.login}>Bắt đầu miễn phí</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <SearchPopup open={openSearch} setOpen={setOpenSearch} />
      </motion.nav>
    </div>
  );
}

export default Navbar;
