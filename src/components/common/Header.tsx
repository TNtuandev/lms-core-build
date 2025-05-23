import clsx from "clsx";

interface ITitleProps {
  label: string;
  title: string;
  subTitle: string;
  containerClass?: string;
}

export function Header({ label, title, subTitle, containerClass }: ITitleProps) {
  return (
    <div className={clsx('flex flex-col gap-2 items-center w-[60%]', containerClass)}>
      <div className="bg-gradient-to-r from-primary-main to-secondary-main bg-clip-text text-transparent w-fit text-lg font-semibold">
        {label}
      </div>
      <div className="font-bold text-3xl text-center leading-12">{title}</div>
      <div className="text-secondary text-center text-base">{subTitle}</div>
    </div>
  );
}
