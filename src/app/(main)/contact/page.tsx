"use client";

import React from "react";
import { Title } from "@/components/common/Title";
import { CONTACT } from "@/contants/contact";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email is invalid.",
  }),
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

function ContactPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data----", data);
  }

  return (
    <div className="mt-[72px]">
      <div className="bg-gradient-to-b from-primary-lighter  to-white h-[600px]">
        <div className="px-6 md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full flex flex-col items-center justify-center h-full">
          <Title
            label="Tầm nhìn của chúng tôi"
            title="Chúng tôi hình dung một thế giới mà bất kỳ ai, ở bất kỳ đâu cũng có khả năng thay đổi cuộc sống của mình thông qua việc học."
            subTitle=""
            containerClass="w-[100%]"
          />
          <div className="grid grid-cols-3 gap-8 mt-16">
            {CONTACT.map((item) => (
              <div
                key={item.title}
                className="p-10 rounded-2xl bg-white flex items-start gap-8"
              >
                <div className="flex-1">
                  <div className="font-bold text-2xl">{item.title}</div>
                  <div className="text-secondary mt-2">{item.subTitle}</div>
                </div>
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Form {...form}>
        <div className="pb-32 px-6 md:max-w-3xl max-w-sm lg:max-w-5xl xl:max-w-7xl mx-auto w-full flex gap-8 items-stretch">
          <div className="w-1/2">
            <Image
              src="/images/contact/img.png"
              alt="Girl"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 box-shadow-component rounded-2xl p-12 flex flex-col justify-between">
            <div>
              <div className="bg-gradient-to-r from-primary-main to-secondary-main bg-clip-text text-transparent w-fit text-lg font-semibold">
                Giáo dục cho mọi người
              </div>
              <div className="font-bold text-3xl leading-12 mt-2">
                Liên hệ với chúng tôi để nhận khóa học miễn phí
              </div>
            </div>
            <div
              className="grid grid-cols-1 gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Họ và tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Chủ đề" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Tin nhắn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="h-12" type="submit">
              <span className="font-bold text-white">
                Nhận ngay
              </span>
              <ArrowRight size={24} color="white"/>
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
}

export default ContactPage;
