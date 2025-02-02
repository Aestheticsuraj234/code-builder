import Logo from "@/components/shared/logo"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
  } from "@/components/ui/sidebar"
import NewChatButton from "./new-chat"
import { BookOpenText, CircleHelp, FolderClosed, MousePointer2 } from "lucide-react"
import Link from "next/link"
  
  export function CustomSidebar() {
    const items = [
        {
          title: "Community",
          url: "#",
          icon: MousePointer2,
        },
        {
          title: "Library",
          url: "#",
          icon: BookOpenText,
        },
        {
          title: "Projects",
          url: "#",
          icon: FolderClosed ,
        },

        {
          title: "Feedback",
          url: "#",
          icon: CircleHelp,
        },
      
      ]
       
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex flex-col justify-center items-center gap-y-2 w-full">
            <div className="flex flex-row justify-between items-center w-full">
            <Logo/>
            <SidebarTrigger />
            </div>
            <NewChatButton/>
           
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup  >
          <SidebarMenu>
          {items.map((item) => (
                <SidebarMenuItem key={item.title}  >
                  <SidebarMenuButton asChild  size={"lg"}>
                    <Link href={item.url} passHref>
                      <item.icon size={30}/>
                      <span className=" text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <hr className="mt-2 bg-zinc-700 border-dashed" />

          </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  