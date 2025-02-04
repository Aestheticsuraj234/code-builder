"use client"
import React from "react"
import { ChevronRight, File, Folder, FileCode, FileJson, FileText, Image } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// File icon mapping based on file extensions
const fileIcons: Record<string, React.ComponentType<any>> = {
  ts: FileCode,
  tsx: FileCode,
  js: FileCode,
  jsx: FileCode,
  json: FileJson,
  md: FileText,
  ico: Image,
  svg: Image,
}

// Mock file tree data
const data = {
  tree: [
    ["app", ["api", ["hello", ["route.ts"]], "page.tsx", "layout.tsx", ["blog", ["page.tsx"]]]],
    ["components", ["ui", "button.tsx", "card.tsx"], "header.tsx", "footer.tsx"],
    ["lib", ["util.ts"]],
    ["public", "favicon.ico", "vercel.svg"],
    ".eslintrc.json",
    ".gitignore",
    "next.config.js",
    "tailwind.config.js",
    "package.json",
    "README.md",
  ],
}

interface FileExplorerProps {
  searchTerm?: string
}

export function FileExplorer({ searchTerm = "" }: FileExplorerProps) {
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set(["app", "components"]))

  // Handle file selection
  const handleFileSelect = (file: string) => {
    setSelectedFile(file)
    console.log(`Selected file: ${file}`)
  }

  // Toggle folder expansion
  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder)
    } else {
      newExpanded.add(folder)
    }
    setExpandedFolders(newExpanded)
  }

  // Get the appropriate icon for a file
  const getFileIcon = (filename: string) => {
    const extension = filename.split(".").pop() || ""
    const IconComponent = fileIcons[extension] || File
    return <IconComponent className="mr-2 h-4 w-4" />
  }

  // Filter the tree based on the search term
  const filterTree = (item: any): boolean => {
    if (typeof item === "string") {
      return item.toLowerCase().includes(searchTerm.toLowerCase())
    }
    const [name, ...items] = item
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      items.some((subItem: any) => filterTree(subItem))
    )
  }

  const filteredTree = searchTerm ? data.tree.filter(filterTree) : data.tree

  return (
    <div className="space-y-1 text-sm">
      {filteredTree.map((item, index) => (
        <Tree
          key={index}
          item={item}
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          expandedFolders={expandedFolders}
          onToggleFolder={toggleFolder}
          level={0}
        />
      ))}
    </div>
  )
}

interface TreeProps {
  item: string | any[]
  onFileSelect: (file: string) => void
  selectedFile: string | null
  expandedFolders: Set<string>
  onToggleFolder: (folder: string) => void
  level: number
}

function Tree({ item, onFileSelect, selectedFile, expandedFolders, onToggleFolder, level }: TreeProps) {
  const [name, ...items] = Array.isArray(item) ? item : [item]
  const isExpanded = expandedFolders.has(name)

  if (!items.length) {
    return (
      <Button
        variant="ghost"
        className={cn(
          "h-8 w-full mx-4 justify-start rounded-none px-3 text-left transition-colors duration-200",
          selectedFile === name
            ? "bg-yellow-200 text-yellow-800" // Active file styles
            : "hover:bg-accent/80", // Hover styles
          level > 0 && "ml-2" // Add margin for nested items
        )}
        onClick={() => onFileSelect(name)}
      >
        <div className="flex items-center w-full">
          {getFileIcon(name)}
          <span className="flex-1 truncate">{name}</span>
          {isRecentlyModified(name) && (
            <Badge variant="secondary" className="ml-2 h-4 rounded-sm px-1 text-xs">
              Modified
            </Badge>
          )}
        </div>
      </Button>
    )
  }

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={() => onToggleFolder(name)}
      className={cn("space-y-1", level > 0 && "ml-3")}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-full justify-start rounded-none px-3 text-left hover:bg-accent/80"
        >
          <ChevronRight
            className={cn(
              "mr-2 h-4 w-4 shrink-0 transition-transform duration-200 ease-in-out",
              isExpanded && "rotate-90"
            )}
          />
          <Folder className="mr-2 h-4 w-4 shrink-0" />
          <span className="flex-1 truncate">{name}</span>
          {getItemCount(items) > 0 && (
            <Badge variant="secondary" className="ml-2 h-4 rounded-sm px-1 text-xs">
              {getItemCount(items)}
            </Badge>
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1">
        {items.map((subItem, index) => (
          <Tree
            key={index}
            item={subItem}
            onFileSelect={onFileSelect}
            selectedFile={selectedFile}
            expandedFolders={expandedFolders}
            onToggleFolder={onToggleFolder}
            level={level + 1}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

// Helper functions
function getFileIcon(filename: string) {
  const extension = filename.split(".").pop() || ""
  const IconComponent = fileIcons[extension] || File
  return <IconComponent className="mr-2 h-4 w-4" />
}

function getItemCount(items: any[]): number {
  return items.reduce((count, item) => {
    if (Array.isArray(item)) {
      return count + getItemCount(item.slice(1))
    }
    return count + 1
  }, 0)
}

function isRecentlyModified(filename: string): boolean {
  // Mock function - in a real app, this would check actual file modification times
  return ["page.tsx", "layout.tsx"].includes(filename)
}