import React from "react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";
import {
  saveHTMLasCanvas,
  saveHTMLasPDF,
} from "@/components/plate-ui/fixed-toolbar-buttons";
import { useEditorState } from "@udecode/plate-common";

export function DownloadDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorState();

  const items: any = {
    pdf: (
      <>
        <Icons.filetext className="mr-2 h-5 w-5" />
        <span className="hidden lg:inline">Download as PDF</span>
      </>
    ),
    image: (
      <>
        <Icons.image className="mr-2 h-5 w-5" />
        <span className="hidden lg:inline">Download as Image</span>
      </>
    ),
  };

  const handleOptionChange = (option: string) => {
    if (option === "pdf") {
      saveHTMLasPDF(editor); // Call the first function from htmltoPDF.ts
    } else if (option === "image") {
      saveHTMLasCanvas(editor); // Call the second function from htmltoPDF.ts
    }
  };

  return (
    <DropdownMenu modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltip="Download" isDropdown>
          <Icons.download />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[180px]">
        <DropdownMenuRadioGroup value="pdf" onValueChange={handleOptionChange}>
          <DropdownMenuRadioItem value="pdf">{items.pdf}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="image">
            {items.image}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DownloadDropdownMenu;
