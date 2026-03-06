"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { Button } from "@/shared/components/shadcn-ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/shadcn-ui/empty";

type EmptyMediaProps = HTMLAttributes<HTMLDivElement>;

type LoadAlertAction = {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline";
};

type LoadAlertProps = {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions: [LoadAlertAction] | [LoadAlertAction, LoadAlertAction];
  iconWrapperClassName?: string;
  iconWrapperProps?: EmptyMediaProps;
};

export const LoadAlert = ({
  icon,
  title,
  description,
  actions,
  iconWrapperClassName,
  iconWrapperProps,
}: LoadAlertProps) => {
  return (
    <Empty className="mt-14 px-4">
      <EmptyHeader className="mx-auto max-w-md text-center">
        <EmptyMedia
          variant="default"
          {...iconWrapperProps}
          className={`rounded-full border border-gray-200 bg-white p-6 ${iconWrapperClassName}`}
        >
          {icon}
        </EmptyMedia>

        <EmptyTitle className="text-xl font-bold sm:text-2xl lg:text-3xl">{title}</EmptyTitle>

        <EmptyDescription className="mx-auto max-w-sm text-sm sm:text-base">
          {description}
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {actions.map((action, index) => (
          <Button
            key={index}
            size="lg"
            variant={action.variant ?? "default"}
            onClick={action.onClick}
            className="w-full font-bold sm:w-auto"
          >
            {action.label}
          </Button>
        ))}
      </EmptyContent>
    </Empty>
  );
};
