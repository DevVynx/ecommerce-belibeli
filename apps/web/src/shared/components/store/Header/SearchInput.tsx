import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/shadcn-ui/input-group";

export const SearchInput = () => {
  return (
    <div className="flex-1">
      <InputGroup className="border-primary rounded-lg">
        <InputGroupInput placeholder="Busque os seus produtos." className="sm:hidden" />
        <InputGroupInput
          placeholder="Ache os seus produtos de forma rápida."
          className="hidden sm:flex"
        />
        <InputGroupAddon className="pr-2" align="inline-end">
          <InputGroupButton
            className="bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground w-15"
            aria-label="Search"
            title="Search"
            size="icon-sm"
            onClick={() => {}}
          >
            <Search />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
