"use client"

import type React from "react"

import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="luxury-shop-theme">
        {children}
        <Toaster />
      </ThemeProvider>
    </ReduxProvider>
  )
}
