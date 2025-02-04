"use client"
import { useState } from "react"
import { ChevronRight, File, Folder, FileCode, FileJson, FileText, Image } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { CodeEditor } from "./code-editor"
import { FileExplorer } from "./file-explorer"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WebContainerPreview from "./webcontainer-preview"
 // Assume this is your WebContainer API wrapper

// Enhanced steps with more metadata
const Steps = [
  {
    title: "Create /src/app.tsx",
    code: "touch src/app.tsx",
    status: "completed",
    timestamp: "2 mins ago",
    type: "file-creation"
  },
  {
    title: "Start Application",
    code: "npm run dev",
    status: "in-progress",
    timestamp: "Just now",
    type: "command"
  },
]

export function OutputContainer({ className, ...props }) {
  const [activeTab, setActiveTab] = useState("code") // "code" or "preview"
  const [searchTerm, setSearchTerm] = useState("")
  const { theme } = useTheme()

  const MOCK_CODE =  `// This is a sample file content
  import React from 'react';
  
  function Component() {
    return <div>Hello World</div>;
  }
  
  export default Component;`;
  return (
    <div className={cn("h-full flex flex-col", className)} {...props}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b bg-background">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">v0.1.0</span>
        </div>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-7 border-none bg-transparent"
        />
      </header>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Left Panel - LLM Response */}
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40} className="border-r">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>LLM Response</CardTitle>
              <CardDescription>
                I'll help you create a beautiful and functional application with React and TypeScript.
                Let's start by setting up the basic structure. I'll guide you through each step.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Steps */}
              {Steps.map((step, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant={step.status === "completed" ? "success" : "secondary"}>
                      {step.status}
                    </Badge>
                    <small className="text-xs text-muted-foreground">{step.timestamp}</small>
                  </div>
                  <p className="text-sm font-medium">{step.title}</p>
                  <pre className="bg-muted p-2 rounded-md text-sm">
                    <code>{step.code}</code>
                  </pre>
                </div>
              ))}
            </CardContent>
          </Card>
        </ResizablePanel>

        {/* Resizable Handle */}
        <ResizableHandle withHandle />

        {/* Right Panel - File Explorer and Editor/Preview */}
        <ResizablePanel defaultSize={70} minSize={60} maxSize={80}>
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Sub-Panel - File Explorer (Toggleable) */}
            {activeTab === "code" && (
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <FileExplorer searchTerm={searchTerm} />
              </ResizablePanel>
            )}

            {/* Resizable Handle */}
            {activeTab === "code" && <ResizableHandle withHandle />}

            {/* Right Sub-Panel - Editor or Preview */}
            <ResizablePanel defaultSize={activeTab === "code" ? 70 : 100}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="code" className="h-screen">
                  <CodeEditor defaultValue={MOCK_CODE} language="typescript" />
                </TabsContent>
                <TabsContent value="preview" className="h-full">
                  <WebContainerPreview />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}