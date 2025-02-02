"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex flex-row items-center justify-center gap-1 border bg-background rounded-xl p-1">
      <Button 
        size="icon" 
        variant={theme === 'light' ? 'default' : 'outline'}
        onClick={() => setTheme('light')}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button 
        size="icon" 
        variant={theme === 'dark' ? 'default' : 'outline'}
        onClick={() => setTheme('dark')}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Dark theme</span>
      </Button>
      <Button 
        size="icon" 
        variant={theme === 'system' ? 'default' : 'outline'}
        onClick={() => setTheme('system')}
      >
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">System theme</span>
      </Button>
    </div>
  )
}
