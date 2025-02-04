"use client"
import * as React from "react"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

interface CodeEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  language?: string
}

// Dynamically import the Monaco Editor to avoid reinitialization issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

export function CodeEditor({ defaultValue = "", language = "typescript", className, ...props }: CodeEditorProps) {
  const { resolvedTheme } = useTheme()
  const [value, setValue] = React.useState(defaultValue)
  const [loading, setLoading] = React.useState(true)

  // Initialize Monaco Editor configuration
  React.useEffect(() => {
    import("@monaco-editor/react").then((monaco) => {
      monaco.loader.config({
        paths: {
          vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs",
        },
      })
      setLoading(false)
    })
  }, [])

  // Handle loading state
  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className={cn("relative h-full", className)} {...props}>
      <MonacoEditor
        height="100%"
        theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
        defaultLanguage={language}
        defaultValue={value}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          wordWrap: "on",
          tabSize: 2,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
        }}
        onChange={(value) => setValue(value || "")}
      />
    </div>
  )
}